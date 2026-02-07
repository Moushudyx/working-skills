---
name: o2-intl-rich-editor
description: O2IntlRichEditor 多语言富文本组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2IntlRichEditor } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { content: {} } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="多语言内容" field="content">
        <O2IntlRichEditor v-model={state.formData.content} fieldName="content" row={state.formData} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合富文本多语言场景。
