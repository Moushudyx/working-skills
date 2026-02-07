---
name: o2-auto-complete
description: O2AutoComplete 自动完成组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2AutoComplete } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { keyword: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="关键字" field="keyword">
        <O2AutoComplete v-model={state.formData.keyword} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 表格中使用列组件 `O2ColumnAutoComplete`。
