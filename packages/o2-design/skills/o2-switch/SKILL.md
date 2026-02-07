---
name: o2-switch
description: O2Switch 开关组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Switch } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { enabled: 1 } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="启用" field="enabled">
        {/* 开关 */}
        <O2Switch v-model={state.formData.enabled} trueValue={1} falseValue={0} />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- `trueValue/falseValue` 用于适配后端字段。
- 表格中使用列组件 `O2ColumnSwitch`。
- 表单中推荐使用 `O2FormSwitch` 变体。
