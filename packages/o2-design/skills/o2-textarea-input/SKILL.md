---
name: o2-textarea-input
description: O2TextareaInput 弹框文本域组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2TextareaInput } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { detail: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="详情" field="detail">
        <O2TextareaInput v-model={state.formData.detail} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合超长文本录入。
