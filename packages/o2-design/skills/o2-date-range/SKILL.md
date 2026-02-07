---
name: o2-date-range
description: O2DateRange 日期区间组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2DateRange } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { range: [] } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="区间" field="range">
        <O2DateRange v-model={state.formData.range} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适用于查询条件或表单区间选择。
