---
name: o2-select
description: O2Select 下拉选择组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Select, O2SelectOption } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { type: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="类型" field="type">
        {/* 下拉选项 */}
        <O2Select v-model={state.formData.type}>
          <O2SelectOption value="A">A</O2SelectOption>
          <O2SelectOption value="B">B</O2SelectOption>
        </O2Select>
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 复杂选项可以通过异步加载后渲染 `O2SelectOption`。
- 表格中使用列组件 `O2ColumnSelect`。
- 表单中推荐使用 `O2FormSelect` 变体。
