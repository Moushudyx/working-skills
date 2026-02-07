---
name: o2-icon-picker
description: O2IconPicker 图标选择组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2IconPicker } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { icon: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="图标" field="icon">
        <O2IconPicker v-model={state.formData.icon} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 表格中使用列组件 `O2ColumnIconPicker`。
