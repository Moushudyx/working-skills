---
name: o2-json-editor
description: O2JsonEditor JSON 编辑组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2JsonEditor } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { jsonValue: {} } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="配置" field="jsonValue">
        {/* JSON 编辑 */}
        <O2JsonEditor v-model={state.formData.jsonValue} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 适合编辑结构化配置。
- 表格中使用列组件 `O2ColumnJsonEditor`。
- 表单中推荐使用 `O2FormJsonEditor` 变体。
