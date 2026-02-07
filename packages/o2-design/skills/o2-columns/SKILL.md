---
name: o2-columns
description: O2Column 基础列与列组件通用能力
---

# O2Column 概览

`O2Column` 是所有列组件的基础，其他列组件均继承其属性与行为。

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2Column } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2Column title="名称" field="name" />
    </O2Table>
  );
});
```

# 通用列属性（高频）

- `title` 列标题
- `field` 字段名
- `required` 必填校验
- `editable` 是否可编辑
- `formFilter` 是否启用查询表单
- `rules` 额外校验规则
- `cascadeFields` 字段联动配置
- `disableWhenParentClear` 级联字段被清空时是否禁用

# 常用列组件

- 输入类：`O2ColumnInput`、`O2ColumnTextarea`、`O2ColumnInputNumber`
- 选择类：`O2ColumnSelect`、`O2ColumnLov`、`O2ColumnLovView`、`O2ColumnSwitch`、`O2ColumnCheckbox`
- 日期类：`O2ColumnDatePicker`
- 复杂类：`O2ColumnAddress`、`O2ColumnIntlField`、`O2ColumnJsonEditor`、`O2ColumnPicture`

# 进阶要点

- `deepField` 用于链式字段（如 `a.b.c`），在表格 option 中开启后，列组件会自动按路径读写。
- 级联字段联动优先使用 `cascadeFields`，避免手动处理依赖。
