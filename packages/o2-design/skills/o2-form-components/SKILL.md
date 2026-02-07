---
name: o2-form-components
description: 常用 O2Form 表单组件速览与选型
---

# 组件速览

以下组件通常在 `O2FormItem` 内使用，均支持 `v-model` 语法糖与响应式数据。

- 文本类：`O2Input`、`O2Textarea`、`O2TextareaInput`
- 数值类：`O2InputNumber`、`O2Currency`
- 选择类：`O2Select`、`O2Lov`、`O2LovView`、`O2Radio`、`O2Checkbox`、`O2Switch`
- 日期类：`O2DatePicker`、`O2DateRange`、`O2TimePicker`
- 复杂组件：`O2Address`、`O2Object`、`O2IntlField`、`O2JsonEditor`、`O2ImageUpload`、`O2Upload`

# 推荐使用 O2FormX 变体

实际工作中推荐优先使用 `O2FormInput`/`O2FormSelect` 等变体，它们由 `designFormComponent` 生成，自动处理 `FormItem` + `v-model` 绑定、公共属性透传与校验。

常见变体（非完整清单）：

- `O2FormInput`、`O2FormInputNumber`、`O2FormTextArea`、`O2FormTextAreaInput`
- `O2FormSelect`、`O2FormLov`、`O2FormLovView`、`O2FormSwitch`
- `O2FormDatePicker`、`O2FormDateRange`、`O2FormCurrency`
- `O2FormIntlField`、`O2FormJsonEditor`、`O2FormAddress`
- `O2FormImageUpload`、`O2FormUpload`、`O2FormRichEditor`

# 选型建议

- 表单中需要联动显示/隐藏时，优先在 `setup` 内用响应式数据控制。
- 值集优先使用 `O2Lov`/`O2LovView`，并搭配技能 `util-$$lov` 做值集显示转换。
- 多语言输入使用 `O2IntlField`，并可结合技能 `o2-global-config` 统一控制 `maxLengthMap`。

# 通用表单写法

```jsx
import { designPage, reactive, O2Form, O2FormInput, O2FormSelect, O2SelectOption } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { name: '', type: '' } });

  return () => (
    <O2Form formData={state.formData} column={2}>
      {/* 推荐：直接使用 O2FormX 变体 */}
      <O2FormInput label="名称" field="name" required />
      <O2FormSelect label="类型" field="type">
        <O2SelectOption value="A">A</O2SelectOption>
        <O2SelectOption value="B">B</O2SelectOption>
      </O2FormSelect>
    </O2Form>
  );
});
```

# 何时用 O2FormItem

- 只有在需要自定义渲染内容、组合多个字段、或需要特殊布局时，才使用 `O2FormItem` 包裹自定义组件。
