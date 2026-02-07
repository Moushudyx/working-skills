---
name: o2-currency
description: O2Currency 货币输入组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Currency } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { amount: 0 } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="金额" field="amount">
        <O2Currency v-model={state.formData.amount} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合金额输入与展示。
- 表格中使用列组件 `O2ColumnCurrency`。
