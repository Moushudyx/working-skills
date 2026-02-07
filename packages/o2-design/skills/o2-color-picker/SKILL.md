---
name: o2-color-picker
description: O2ColorPicker 颜色选择组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2ColorPicker } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { color: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="颜色" field="color">
        <O2ColorPicker v-model={state.formData.color} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 表格中使用列组件 `O2ColumnColorPicker`。
