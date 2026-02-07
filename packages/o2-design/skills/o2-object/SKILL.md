---
name: o2-object
description: O2Object 对象选择组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Object } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { obj: null } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="对象" field="obj">
        <O2Object v-model={state.formData.obj} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合选择复杂对象或弹框选择场景。
