---
name: o2-rich-editor
description: O2RichEditor 富文本编辑组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2RichEditor } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { content: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="内容" field="content">
        <O2RichEditor v-model={state.formData.content} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合富文本编辑场景。
