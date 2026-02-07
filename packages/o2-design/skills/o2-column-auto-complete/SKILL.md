---
name: o2-column-auto-complete
description: O2ColumnAutoComplete 自动完成列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnAutoComplete } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnAutoComplete
        title="关键字"
        field="keyword"
        dataSource={[{ value: 'A' }, { value: 'B' }]}
        onSearch={(value) => console.log('search', value)}
      />
    </O2Table>
  );
});
```

# 要点

- `dataSource` 支持下拉候选项。
- `onSearch` 可接入远程搜索。
