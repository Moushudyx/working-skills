---
name: o2-design-overview
description: o2-design 组件库开发必读
---

o2-design 组件库底层是一个极其特殊的库，它内部使用了 Vue2 的响应式相关代码，结合形成了特殊的响应式编程体验

## 重要概念

### designComponent 与 setup

不要与 Vue 中的同名概念混淆，o2-design 中的 setup 是一个特殊的函数

onMounted 等生命周期函数、useTableOption 等特殊功能函数仅能在 setup 中调用

```tsx
// designComponent 是 o2-design 定义组件的核心函数, 接受一个包含 props、slots、emits 和 setup 的对象
// 实际开发中我们更常用 designPage 来定义页面组件, designPage 是 designComponent 的简化版本, 没有 props 定义, 所有传入参数都在 setup 的 props 中
const MyComponent = designComponent({
  // inheritAttrs: false, // 类似 Vue 的参数透传, 默认为 true
  props: {
    // 组件 props 定义
  },
  slots: ['default'],
  emits: {
    onClick: (e: React.MouseEvent) => true,
  },
  // 没有定义在 props 中的参数会被放在 attrs 中, 包括组件标签上未声明的属性和事件
  setup({ props, slots, event: { emit }, attrs }) {
    // 这里是 setup 函数，这里可以调用 onMounted、useTableOption 等特殊功能函数
    return () => <div onClick={(e) => emit.onClick(e)}>My Component</div>; // 这里是 render 函数，返回组件的 JSX 结构
  },
});
// designPage 是 designComponent 的简化, 只接受一个 setup 函数
const MyComponent2 = designPage((props) => {
  // 这里是 setup 函数，这里可以调用 onMounted、useTableOption 等特殊功能函数
  return () => <div onClick={props.onClick}>My Component</div>; // 这里是 render 函数，返回组件的 JSX 结构
});
```

### 响应式

o2-design 内部使用了 Vue2 的响应式相关代码，组件开发者可以直接使用 reactive、computed、watch 等函数创建响应式数据，组件会自动追踪这些数据的变化并触发更新

```tsx
import { reactive, computed, watch, onMounted, designPage } from 'o2-design';

const globalState = reactive({ global: 0 });

const MyComponent = designPage(() => {
  const state = reactive({ count: 0 });
  const doubleCount = computed(() => state.count * 2);
  onMounted(() => {
    console.log('Component mounted');
  });

  return () => (
    <div>
      <p>Count: {state.count}</p>
      <p>Double Count: {doubleCount.value}</p>
      <!-- globalState.global 变更时, 所有的 MyComponent 组件都会自动更新 -->
      <p>Global: {globalState.global}</p>
      <button onClick={() => state.count++}>Increment</button>
    </div>
  );
});

const Page = designPage(() => {
  watch(() => globalState.global, (newVal) => {
    console.log('Global state changed:', newVal);
  });
  return () => (
    <div>
      <MyComponent />
      <button onClick={() => globalState.global++}>Increment Global</button>
    </div>
  );
});
```

如上面示例所示, 由于 o2-design 的响应式功能可以自动追踪依赖, 所以不再需要复杂的状态管理功能, 组件内部直接使用 reactive 定义状态即可, 组件之间共享状态可以通过导出 reactive 对象的方式实现, 组件会自动追踪这些状态的变化并更新视图, 这也是 o2-design 组件开发的核心体验之一

### v-model

v-model 由项目 Babel 插件提供语法糖，组件开发时只需要按约定提供 `props + emits` 即可。

更多实现细节、`useModel`、多字段 v-model 见 `references/v-model.md`。

```tsx
// 使用时 <MyInput v-model={state.value} />
const MyInput = designComponent({
  props: {
    modelValue: String,
  },
  emits: {
    onUpdateModelValue: (value: string) => true,
  },
  setup({ props, event: { emit } }) {
    return () => (
      <input value={props.modelValue} onChange={(e) => emit.onUpdateModelValue(e.target.value)} />
    );
  },
});
```

编译后可理解为普通的 `prop + update 事件` 绑定:

```tsx
// 编译前
<MyInput v-model={state.value} />

// 编译后（等价语义）
<MyInput modelValue={state.value} onUpdateModelValue={(v) => (state.value = v)} />
```

### slots 插槽

slots 是“父组件传内容，子组件决定放置位置”的机制。

更多模式（具名插槽、动态插槽、fallback）见 `references/slots.md`。

```tsx
const MyCard = designComponent({
  slots: ['default', 'footer'],
  setup({ slots }) {
    return () => (
      <div>
        <div>{slots.default?.()}</div>
        <div>{slots.footer?.()}</div>
      </div>
    );
  },
});
```

### scope-slots 作用域插槽

scope-slots 是“子组件在渲染插槽时给父组件传参数”的机制。

更多模式（表格列 `normal/edit/form/filter`、回退顺序）见 `references/scope-slots.md` 与 `references/column/o2-column-scope-slots.md`。

```tsx
const MyList = designComponent({
  scopeSlots: {
    item: (scope) => true,
  },
  setup({ scopeSlots }) {
    const rows = [{ id: 1, name: 'A' }];
    return () => <div>{rows.map((row) => scopeSlots.item?.({ row }))}</div>;
  },
});
```

### lov 值集

也称值集、值列表, 用于将存在后端的英文数据转换成人类阅读的文本(如后端存"NEW"、"SUBMITTED"前端展示"新建"、"已提交", 其中后端存的部分叫“值”或者“编码”, 展示的值叫“含义”或“名称”, lov 的编码叫“lov 编码”或者“值集编码”或其他什么名称), 在 PC 端的“值集配置”页面配置, 使用时需要用到 O2Lov 组件或其变体, 组件会根据传入的 lovCode 自动请求后端接口, 获取“值-含义”的配置

### lovView 值集视图

类似 Object/Picklist, 打开一个弹框里面是一个列表, 用户可以选择其中的数据(实际工程中往往会配置一个“值字段”和“显示字段”), 与值集类似可以在 PC 端“值集视图配置”页面配置, 可以配置值集视图查询的接口、弹框标题、有哪些列等, 使用时需要用到 O2LovView 组件或其变体, 组件会根据传入的 lovCode 自动请求后端接口, 获取弹框中的列表配置, 并在用户点击后打开弹框

### Object/Picklist

类似值集视图, 但是这里的弹框中的列表不是事先配置好的, 而是前端手动配置的, 使用时需要用到 O2Object 组件或其变体, 组件使用前端传入的列表配置, 适用于一些特殊的选择场景, 若无特殊需求建议优先使用 lovView 来实现选择功能

### 列表页、详情页、头行结构

最常见的页面结构是头行结构:
```
List/
  - index.tsx (列表页)
Detail/
  - index.tsx (详情页)
  - XXInfo.tsx (详情页的某个信息块, 对应头数据, 一般是页面表单拆出来的一小块, 常见的有 BaseInfo 这种)
  - tabs/
    - XXTab.tsx (详情页的某个 Tab 页, 对应行数据, 如订单数据关联的物流明细、客户数据关联的积分明细等)
    - YYTab.tsx
```

实际工程中可能 .tsx 文件用的比较少, 常见的是 .js 文件(虽然内容是 jsx), 项目使用 WebPack 打包所以 .tsx 和 .js 都可以, 但不建议使用 .jsx 后缀

## 参考目录

若无特殊说明, 所有文档都在 `references` 目录下

组件

- 按钮 `references/o2-button.md`
- 输入框 `references/o2-input.md`
- 数字输入 `references/o2-input-number.md`
- 货币输入 `references/o2-currency.md`
- 下拉选择 `references/o2-select.md`
- 值集下拉 `references/o2-lov.md`
- 值集视图 `references/o2-lov-view.md`
- 对象选择 `references/o2-object.md`
- 开关 `references/o2-switch.md`
- 日期选择 `references/o2-datepicker.md`
- 单选框 `references/o2-radio.md`
- 复选框 `references/o2-checkbox.md`
- 地址选择 `references/o2-address.md`
- 文本域 `references/o2-textarea.md`
- 弹框文本域 `references/o2-textarea-input.md`
- 多语言输入 `references/o2-intl-field.md`
- Json 编辑器 `references/o2-json-editor.md`
- 富文本编辑器 `references/o2-rich-editor.md`（包含多语言富文本衍生能力说明）
- 文件上传 `references/o2-upload.md`（包含图片上传衍生能力说明）
- 表单容器 `references/o2-form.md`
  - 自动表单组件族 `references/form/o2-form-components.md`
  - 布局与渲染 `references/form/o2-form-layout-and-render.md`
- 表单字段容器 `references/o2-form-item.md`
- 表单 option `references/o2-form-option.md`
  - hooks `references/form/o2-form-option-hooks.md`
  - buttons `references/form/o2-form-option-buttons.md`
  - 多表单协作 `references/form/o2-form-option-multi-form.md`
- 表格 `references/o2-table.md`
  - 表格 option(整合了表格的各种操作) `references/o2-table-option.md`
- 表格列总览 `references/o2-column.md`
  - 列作用域插槽详解 `references/column/o2-column-scope-slots.md`
  - O2Column 变体文档放在 `references/column/` 目录中（例如 `references/column/o2-column-input.md`）
  - 变体索引与“常用列/内部列”关系在 `references/o2-column.md` 中维护

工具与问题

- `$$lov` 与 `useGlobalConfig` 等常用工具 `references/common-tools.md`
- 响应式丢失、性能优化等常见问题 `references/common-pitfalls.md`
- 表单/表格统一校验规则 `references/validation.md`
- v-model 语法糖详解 `references/v-model.md`
- slots 使用说明 `references/slots.md`
- scope-slots 使用说明 `references/scope-slots.md`

页面模板

- 列表页 `references/page-list.md`
- 详情页 `references/page-detail.md`

## 开发流程

1. 必须先理解需求
2. 查阅现有代码和文档, 确认如何实现需求
3. 输出一份开发规划
4. 执行开发规划
5. 开发完成后审查代码, 并使用 lint 工具等保证代码质量
