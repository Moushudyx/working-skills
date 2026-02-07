---
name: o2-date-picker
description: O2DatePicker 日期选择组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2DatePicker } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { date: null } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="日期" field="date">
        {/* 日期选择 */}
        <O2DatePicker v-model={state.formData.date} format="YYYY-MM-DD" />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- `datetime` 可切换日期时间模式。
- 表格中使用列组件 `O2ColumnDatePicker`。
- 表单中推荐使用 `O2FormDatePicker` 变体。
