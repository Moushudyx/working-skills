# O2Form 自动组件族

覆盖 `O2FormInput/O2FormInputNumber/O2FormSelect/O2FormLov/O2FormLovView/O2FormObject/...` 等自动表单组件。

这些组件都由 `createFormComponent` 生成，核心价值是统一参数分发与默认行为。

## 自动行为

### 1. 自动 v-model

默认行为：

- 当存在 `field` 且不是数组时，自动注入 `modelValue` 与 `onUpdateModelValue`。
- 如果 O2Form 开启 `deepField`，会按深层路径回写。

可关闭场景：

- `autoVModel=false`（例如 O2FormObject/O2FormLovView/O2FormAddress/O2FormUpload）。
- `noVModelWhen(props)` 命中（例如 O2FormDatePicker 的 `range=true`）。

### 2. 自动 row 透传

部分组件默认需要 `row`：

- `O2FormObject`、`O2FormLovView`、`O2FormIntlField` 会自动把 `formData` 传入组件。

### 3. 参数分发

组件接收的参数会按规则分发到 O2FormItem 与真实组件：

- `formProps`：只给 O2FormItem。
- `nativeAttrs`：只给真实组件。
- `passThroughProps`：同时透传给两侧（如 `required`、数字/日期边界）。
- `exposeProps`：给 O2FormItem（如 `label/field/rules/type/min/max/allowEquals/tooltip` 等）。
- 其他参数：默认给真实组件。

## 公共属性合并

支持三层来源，按覆盖顺序生效：

1. O2Form.props.commonItemProps/commonNativeProps
2. option.config.commonItemProps/commonNativeProps
3. 全局配置 useGlobalConfig 的 formCommonItemProps/formCommonNativeProps

并且支持函数型动态属性，函数参数包含：

- `formData`
- `row`
- `field`
- `props`
- `form`
- `value`
- `component`

## 常用组件差异

| 组件 | 特殊行为 |
| --- | --- |
| O2FormDatePicker | `range=true` 时不自动 v-model；required 时自动补 `type='date'` |
| O2FormDateRange | 默认不自动 v-model |
| O2FormInputNumber/O2FormCurrency | required 时自动补 `type='number'` |
| O2FormObject | 自动 `row`，不自动 v-model |
| O2FormLovView | 自动 `row`，不自动 v-model |
| O2FormIntlField | 自动 `row`，并自动把 `fieldName` 设为 `field` |
| O2FormImageUpload/O2FormUpload | 不自动 v-model |

## 常见问题

### 组件拿不到 field 对应值

- 检查是否命中了“关闭自动 v-model”的组件或场景。
- 关闭自动 v-model 的组件需要按其组件协议显式传参。

### commonItemProps/commonNativeProps 不生效

- 仅对 O2FormXXX 自动组件生效，对手写 O2FormItem + 原生组件不生效。

关联主文档：`../o2-form.md`、`../o2-form-item.md`。
