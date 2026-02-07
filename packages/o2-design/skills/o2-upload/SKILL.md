---
name: o2-upload
description: O2Upload 文件上传组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Upload } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { files: [] } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="附件" field="files">
        <O2Upload v-model={state.formData.files} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合通用文件上传。
