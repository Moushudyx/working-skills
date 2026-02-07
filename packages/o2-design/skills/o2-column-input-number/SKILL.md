---
name: o2-column-input-number
description: O2ColumnInputNumber 数字列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnInputNumber } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnInputNumber
        title="数量"
        field="count"
        type="number"
        min={0}
        max={100}
        step={1}
        precision={0}
        formFilter
        filterConfig={{ start: 'countStart', end: 'countEnd' }}
      />
    </O2Table>
  );
});
```

# 要点

- `type` 为 `number/integer/float` 时，`min/max` 才会生成校验规则。
- `min/max` 可以是数值、字段名或数组。
