---
name: o2-image-uploader
description: O2ImageUploader 图片上传组件（另一实现）
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2ImageUploader } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { image: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="图片" field="image">
        <O2ImageUploader v-model={state.formData.image} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 具体上传行为取决于内部实现，按项目约定选择。
