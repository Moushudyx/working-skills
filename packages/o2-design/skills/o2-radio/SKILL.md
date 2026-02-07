---
name: o2-radio
description: O2Radio 单选组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Radio, O2RadioGroup } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { status: 'A' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="状态" field="status">
        <O2RadioGroup v-model={state.formData.status}>
          <O2Radio value="A">A</O2Radio>
          <O2Radio value="B">B</O2Radio>
        </O2RadioGroup>
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 选项数量较少时优先使用。
