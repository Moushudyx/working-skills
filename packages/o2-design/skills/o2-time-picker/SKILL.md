---
name: o2-time-picker
description: O2TimePicker 时间选择组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2TimePicker } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { time: null } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="时间" field="time">
        <O2TimePicker v-model={state.formData.time} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合纯时间字段。
