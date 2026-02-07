---
name: o2-input-number
description: O2InputNumber 数字输入组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2InputNumber } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { count: 0 } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="数量" field="count">
        {/* 数值输入 */}
        <O2InputNumber v-model={state.formData.count} min={0} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 支持 `min`/`max`/`step`/`precision` 等数值限制。
- 表格中使用列组件 `O2ColumnInputNumber`。
- 表单中推荐使用 `O2FormInputNumber` 变体。
