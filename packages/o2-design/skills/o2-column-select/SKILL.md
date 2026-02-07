---
name: o2-column-select
description: O2ColumnSelect 下拉列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnSelect } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnSelect
        title="类型"
        field="type"
        searchable
        options={() => [
          { value: 'A', meaning: 'A' },
          { value: 'B', meaning: 'B' },
        ]}
      />
    </O2Table>
  );
});
```

# 要点

- `options` 支持函数/Promise，用于异步选项。
- `searchable`/`searchMatcher` 控制搜索行为。
