---
name: o2-checkbox
description: O2Checkbox 复选组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Checkbox, O2CheckboxGroup } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { flags: [] } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="选项" field="flags">
        <O2CheckboxGroup v-model={state.formData.flags}>
          <O2Checkbox value="A">A</O2Checkbox>
          <O2Checkbox value="B">B</O2Checkbox>
        </O2CheckboxGroup>
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 需要单个布尔值时可直接用 `O2Switch`。
