---
name: o2-lov-view
description: O2LovView 值集视图组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2LovView } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { catalogRowCode: '' } });
  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="目录" field="catalogRowCode">
        {/* 值集视图选择 */}
        <O2LovView
          lovCode="O2MD.CATALOG"
          row={state.formData}
          showKey="catalogRowName"
          map={{
            catalogRowCode: 'catalogCode',
            catalogRowName: 'catalogName',
          }}
        />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 通过 `map` 将返回字段映射到当前行。
- 表格中使用列组件 `O2ColumnLovView`。
- 表单中推荐使用 `O2FormLovView` 变体。
