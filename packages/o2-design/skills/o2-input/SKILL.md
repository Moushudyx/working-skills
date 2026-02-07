---
name: o2-input
description: O2Input 文本输入组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Input } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { name: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="名称" field="name" required>
        {/* 基础输入 */}
        <O2Input v-model={state.formData.name} placeholder="请输入" />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 支持 `v-model` 语法糖进行双向绑定。
- 表格中使用列组件 `O2ColumnInput`。
- 表单中推荐使用 `O2FormInput` 变体。
