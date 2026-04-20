# useFormOption

useFormOption 是 O2Form 的状态与请求编排核心，负责：

- 查询、保存、刷新
- 编辑态切换与取消回滚
- 多个 O2Form 聚合校验
- 默认按钮与权限控制
- 钩子扩展

## 最小示例

```tsx
import { O2Form, O2FormInput, designPage, useFormOption } from 'o2-design';

export default designPage(() => {
  const option = useFormOption({
    url: '/api/demo/v1/items',
    keyField: 'id',
    state: { formData: { id: 1 }, status: 'update' },
    buttons: [
      {
        type: 'other',
        code: 'publish',
        label: '发布',
        handler: async () => {
          await option.methods.validateAll();
        },
      },
    ],
  });

  return () => (
    <O2Form option={option}>
      <O2FormInput label="名称" field="name" required />
    </O2Form>
  );
});
```

## 配置

| 配置 | 类型 | 说明 |
| --- | --- | --- |
| url | string/object/function | 请求地址配置 |
| state | object | 初始状态（formData/status/editing/disabled/readonly） |
| keyField | string | 主键字段（用于 detail/update 请求） |
| defaultNewRow | object/function | 新建默认值 |
| loadOnStart | boolean | update 状态下是否自动加载（false 才关闭） |
| defaultEditing | boolean | update 状态初始化时是否默认编辑 |
| queryParams | object/function | 查询附加参数 |
| deepField | boolean | 深层字段模式 |
| formatFormData | boolean | 是否自动补齐字段响应式 |
| refreshAfterSave/refreshAfterInsert/refreshAfterUpdate | boolean | 保存后是否重新 detail |
| cancelEditAfterLoad | boolean | 加载后是否退出编辑态 |
| notification | boolean/object | 保存成功是否提示 |
| buttons | array | 额外按钮配置 |
| hideButton | object | 隐藏指定按钮 |
| permission | string | 按钮权限前缀 |
| enable | boolean/object | insert/update 能力开关 |
| hooks | object | hooks 扩展 |
| notPlaceButtonInPageOperator | boolean | 是否不放到页面头部操作区 |
| commonItemProps/commonNativeProps | object | O2FormXXX 公共属性 |

## 运行时状态

| 字段 | 说明 |
| --- | --- |
| formData | 当前表单数据 |
| formDataBackUp | 编辑前快照 |
| status | insert/update |
| editing | 是否编辑中 |
| disabled | 是否禁用 |
| readonly | 是否只读 |
| loading | 当前是否有异步方法执行中 |
| freezeState.forms | 已注册的 O2Form 引用数组 |
| isInsert/isUpdate | 状态快捷判断 |

## methods

调用方式 `option.methods.方法名`

| 方法 | 说明 |
| --- | --- |
| refresh | 重新加载数据 |
| saveInsert | (内部方法)新建保存(不校验) |
| saveUpdate | (内部方法)更新保存(不校验) |
| save | 通用保存方法, 先 validateAll, 再按 status 调用 saveInsert/saveUpdate |
| validateAll | 校验所有已注册 O2Form |
| clearValidate | 清空所有已注册 O2Form 校验错误 |
| openEdit | 进入编辑态(自动备份 formData) |
| cancelEdit(stayEdit?) | 恢复备份并清理校验，可选择保留编辑态 |

## hooks

加载与保存：

- onBeforeLoad/onAfterLoad
- onBeforeInsert/onAfterInsert/onFinishInsert
- onBeforeUpdate/onAfterUpdate/onFinishUpdate
- onBeforeSubmit/onAfterSubmit/onFinishSubmit

校验与编辑态：

- onValidateError/onAfterValidate
- onBeforeOpenEdit/onAfterOpenEdit
- onBeforeCancelEdit/onAfterCancelEdit

渲染与组件注册：

- onRenderContent
- onLoading
- onButtons
- onO2FormSetup/onO2FormRef/onO2FormUnRef

## 按钮机制

- 内置标准按钮：编辑、取消、保存（按 status/editing 自动切换）
- 可通过 buttons 扩展 other 类型按钮
- 可通过 hideButton 隐藏按钮，通过 permission 走权限控制
- 默认优先放入 page operator；若 notPlaceButtonInPageOperator=true，则渲染在表单内部额外内容区

## 多表单协作

- 同一个 option 可被多个 O2Form 复用。
- O2Form 挂载时会自动注册到 freezeState.forms。
- validateAll/clearValidate 会对所有已注册表单生效。

统一校验规则见 `validation.md`。

延伸阅读：

- hooks：`form/o2-form-option-hooks.md`
- buttons：`form/o2-form-option-buttons.md`
- 多表单协作：`form/o2-form-option-multi-form.md`

## 常见问题

### 更新态没有自动加载

- 检查 loadOnStart 是否设为 false。
- 检查 state.status 是否为 update。

### 点击保存没有走校验

- saveInsert/saveUpdate 本身不触发 validateAll。
- 需要统一校验时使用 methods.save 或手动先调 methods.validateAll。

### 多个 O2Form 校验只报一个错误

- validateAll 设计为优先抛首个错误。
- 失败对象里会附带 errorFormIndexes，可定位报错表单。
