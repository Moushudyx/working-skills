---
name: o2-lov
description: O2Lov 下拉值集组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Lov } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { value: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="参数类型" field="value">
        {/* 值集选择 */}
        <O2Lov v-model={state.formData.value} lovCode="O2MD.PARAM_TYPE" />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 值集显示转换使用技能 `util-$$lov`。
- 表格中使用列组件 `O2ColumnLov`。
- 表单中推荐使用 `O2FormLov` 变体。
