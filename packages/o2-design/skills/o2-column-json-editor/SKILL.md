---
name: o2-column-json-editor
description: O2ColumnJsonEditor JSON 编辑列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnJsonEditor } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      {/* 展示态点击可查看详情，编辑态为 JSON 编辑器 */}
      <O2ColumnJsonEditor title="配置" field="jsonValue" />
    </O2Table>
  );
});
```
