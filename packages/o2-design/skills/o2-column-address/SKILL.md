---
name: o2-column-address
description: O2ColumnAddress 地址列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnAddress } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnAddress
        title="省份"
        field="regionName"
        region
        valueField="regionCode"
        parentValue="CN"
        required
      />
      <O2ColumnAddress
        title="城市"
        field="cityName"
        city
        valueField="cityCode"
        parentValueField="regionCode"
      />
    </O2Table>
  );
});
```

# 要点

- `valueField` 为必填，用于绑定 code/id。
- `parentValueField` 用于父级联动。
