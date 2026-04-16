# O2Form

O2Form 是表单容器组件，负责：

- 表单布局渲染（列数、标签宽度、纵横布局）
- 校验规则收集与触发
- 与 useFormOption 的编辑态、加载态联动
- 字段级联触发（cascade）

O2FormItem 见 `o2-form-item.md`，option 编排见 `o2-form-option.md`。

## 最小示例

```tsx
import { O2Form, O2FormInput, designPage, reactive, useFormOption } from 'o2-design';

export default designPage(() => {
  const option = useFormOption({
    url: '/api/demo/v1/items',
    keyField: 'id',
    state: { formData: { id: 1 }, status: 'update' },
  });

  return () => (
    <O2Form option={option} column={2}>
      <O2FormInput label="编码" field="code" required />
      <O2FormInput label="名称" field="name" required />
    </O2Form>
  );
});
```

## 关键参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| option | object | - | useFormOption 返回对象，存在时优先使用 option.formData |
| formData | object | - | 直接传入表单数据对象（不使用 option 时） |
| column | number | 3 | 表单列数 |
| width | string/number | 100% | 表单区域宽度 |
| labelWidth | number | 110 | 统一标签宽度 |
| labelMinWidth | number | 依据列数推导 | 标签最小宽度 |
| labelAlign | left/center/right | 依据列数推导 | 标签对齐方式 |
| bodyAlign | left/center/right | center | 内容对齐方式 |
| verticalLayout | boolean | 跟随主题 | 是否纵向布局 |
| colon | boolean | true | 标签后是否显示冒号 |
| rules | object | - | 表单级规则（会与 item 规则合并） |
| validateMode | form/table | form | 校验模式 |
| validateOnChange | boolean | true | 值变更时是否触发字段校验 |
| deepField | boolean | option.config.deepField | 开启深层字段路径模式 |
| formatFormData | boolean | option.config.formatFormData | 初始化时是否补齐字段响应式 |
| commonItemProps | object | - | 透传给 O2FormXXX 的 O2FormItem 公共属性 |
| commonNativeProps | object | - | 透传给 O2FormXXX 实际组件公共属性 |
| loading | boolean | false | 手动加载遮罩 |
| extraContent | boolean | true | 是否渲染 option.hooks.onRenderContent 内容 |

Edit 相关参数（disabled/readonly 等）由 EditProps 提供；当 option.editing=false 或 option.disabled=true 时会强制禁用。

## 事件

| 事件 | 说明 |
| --- | --- |
| onFieldValueChange(field, newVal, oldVal) | 字段值变化事件 |
| onValidateError(error) | 校验失败事件 |

## 对外方法（ref）

| 方法 | 说明 |
| --- | --- |
| validate(autoAlertErrorMessage?) | 校验当前表单 |
| clearValidate() | 清空当前表单校验错误 |

## 行为关系

- 有 option 时，实际数据源优先取 option.formData。
- O2Form 会把自身引用注册到 option.hooks.onO2FormRef，用于 option.methods.validateAll 聚合校验。
- option.loading 或 O2Form.loading 任一为 true 时，显示加载遮罩。
- deepField 场景下，字段路径会按链式路径解析并参与规则生成与校验。

统一校验规则见 `validation.md`。

延伸阅读：

- 自动组件族：`form/o2-form-components.md`
- 布局与渲染：`form/o2-form-layout-and-render.md`

## 常见问题

### formData 更新了但界面不刷新

- 确认 formData 为响应式对象。
- 确认没有把响应式值解构到非响应式临时变量中。

### useFormOption 下编辑态不生效

- 检查 option.state.editing 是否被业务逻辑重置。
- 检查 option.disabled/readonly 是否开启。

### deepField 开启后校验异常

- 检查 field 路径与真实数据结构是否一致。
- 检查编辑组件是否使用 deepField 兼容写法。

## 版本支持

- `deepField` 深层字段模式在 `1.5.2` 新增
- `formatFormData` 初始化补齐字段响应式在 `1.6.40` 新增
- `commonItemProps` / `commonNativeProps` 在 `1.6.45` 新增
- `onValidateError` 事件在 `1.6.46` 新增
- `validateOnChange` 可单独设置在 `1.6.25` 起支持
- `hideLabel` 在 `1.5.4` 起支持
