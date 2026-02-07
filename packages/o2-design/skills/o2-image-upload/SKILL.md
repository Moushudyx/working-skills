---
name: o2-image-upload
description: O2ImageUpload 图片上传组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2ImageUpload } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { image: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="图片" field="image">
        <O2ImageUpload v-model={state.formData.image} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合单图上传场景。
