---
name: o2-cascader
description: O2Cascader 级联选择组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Cascader } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { path: [] } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="级联" field="path">
        <O2Cascader v-model={state.formData.path} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 用于层级选择场景。
