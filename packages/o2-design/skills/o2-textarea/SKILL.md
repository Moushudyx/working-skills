---
name: o2-textarea
description: O2Textarea 多行文本组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Textarea } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { desc: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="描述" field="desc">
        {/* 多行文本 */}
        <O2Textarea v-model={state.formData.desc} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 表格中使用列组件 `O2ColumnTextarea`。
- 表单中推荐使用 `O2FormTextArea` 变体。
