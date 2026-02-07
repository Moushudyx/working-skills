---
name: o2-column-switch
description: O2ColumnSwitch 开关列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnSwitch } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      {/* trueValue/falseValue 适配后端字段 */}
      <O2ColumnSwitch title="启用" field="enabled" trueValue={1} falseValue={0} />
    </O2Table>
  );
});
```
