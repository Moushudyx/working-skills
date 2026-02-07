---
name: o2-column-checkbox
description: O2ColumnCheckbox 复选列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnCheckbox } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnCheckbox
        title="启用"
        field="enabled"
        trueValue="Y"
        falseValue="N"
        trueLabel="是"
        falseLabel="否"
      />
    </O2Table>
  );
});
```

# 要点

- 默认 `trueValue/falseValue` 为 `Y/N`。
- 普通布尔值可改为 `true/false`。
