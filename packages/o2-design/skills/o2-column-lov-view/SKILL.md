---
name: o2-column-lov-view
description: O2ColumnLovView 值集视图列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnLovView } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnLovView
        title="目录"
        field="catalogRowCode"
        showKey="catalogRowName"
        lovCode="O2MD.CATALOG"
        map={{
          catalogRowCode: 'catalogCode',
          catalogRowName: 'catalogName',
        }}
        lovPara={(row) => ({ catalogCode: row.catalogRowCode })}
        afterSelect={(row) => {
          // 选择后联动清空子字段
          row.catalogVersionRowCode = null;
          row.catalogVersionRowName = null;
        }}
      />
    </O2Table>
  );
});
```

# 要点

- `showKey` 控制显示字段，`map` 负责字段映射。
- `lovPara` 支持动态查询参数。
- `normalMode="lovView"` 可用于多选时展示 LovView。
