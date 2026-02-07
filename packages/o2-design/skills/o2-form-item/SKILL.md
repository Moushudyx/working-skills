---
name: o2-form-item
description: O2FormItem 表单项容器
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Input } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { name: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="名称" field="name" required>
        <O2Input v-model={state.formData.name} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- `label/field/required/rules` 为高频参数。
- 与 `useFormOption` 组合时会自动管理校验与编辑状态。
