---
name: o2-intl-field
description: O2IntlField 多语言输入组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2IntlField } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { multi: {} } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="多语言" field="multi">
        {/* 多语言输入 */}
        <O2IntlField v-model={state.formData.multi} fieldName="multi" row={state.formData} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 常与全局配置 `adjustIntlFieldMaxLengthMap` 搭配。
- 表格中使用列组件 `O2ColumnIntlField`。
- 表单中推荐使用 `O2FormIntlField` 变体。
