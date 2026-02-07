---
name: o2-column-intl-field
description: O2ColumnIntlField 多语言列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnIntlField } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      {/* 自动使用 row._token 与 field 进行多语言绑定 */}
      <O2ColumnIntlField title="多语言" field="multi" />
    </O2Table>
  );
});
```

# 要点

- 常与全局配置 `adjustIntlFieldMaxLengthMap` 配合。
