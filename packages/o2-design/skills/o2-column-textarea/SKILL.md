---
name: o2-column-textarea
description: O2ColumnTextarea 文本域列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnTextarea } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      {/* 默认点击单元格可打开只读弹窗 */}
      <O2ColumnTextarea title="备注" field="remark" />
    </O2Table>
  );
});
```

# 要点

- 编辑态使用 `O2TextareaInput`，展示态可弹窗查看全文。
