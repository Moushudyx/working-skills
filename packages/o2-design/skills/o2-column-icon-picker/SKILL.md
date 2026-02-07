---
name: o2-column-icon-picker
description: O2ColumnIconPicker 图标列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnIconPicker } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      {/* 展示态会渲染图标 + 文本 */}
      <O2ColumnIconPicker title="图标" field="icon" />
    </O2Table>
  );
});
```
