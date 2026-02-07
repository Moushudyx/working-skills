---
name: o2-column-lov
description: O2ColumnLov 下拉值集列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnLov } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnLov
        title="参数类型"
        field="type"
        lovCode="O2MD.PARAM_TYPE"
        formFilter
        multiple
        adjustToString
      />
    </O2Table>
  );
});
```

# 要点

- `multiple` 支持多选值集。
- `adjustToString` 适配后端数值字段。
- `processLovOptions` 可用于过滤或排序值集选项。
