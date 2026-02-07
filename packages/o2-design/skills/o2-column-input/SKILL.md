---
name: o2-column-input
description: O2ColumnInput 输入列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnInput } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      {/* 启用 formFilter 后会出现在查询表单 */}
      <O2ColumnInput title="名称" field="name" formFilter filterHandler="模糊查询" />
    </O2Table>
  );
});
```

# 要点

- 继承 `O2Column` 属性。
