---
name: o2-column-date-picker
description: O2ColumnDatePicker 日期列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnDatePicker } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnDatePicker
        title="日期"
        field="date"
        type="date"
        format="YYYY-MM-DD"
        datetime
        min="2024-01-01"
        max="2025-12-31"
        formFilter
        filterConfig={{ start: 'dateStart', end: 'dateEnd' }}
      />
    </O2Table>
  );
});
```

# 要点

- `type="date"` 时 `min/max` 才会生成校验规则。
- `min/max` 可以是字段名或数组。
