---
name: o2-table
description: O2Table 与 useTableOption 的基础用法
---

# O2Table 概览

O2Table 是列表页的核心组件，`useTableOption` 提供增删改查、查询表单、按钮、权限等能力。

开发前需要阅读 `o2-column` 技能

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnInput, O2ColumnSwitch } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({
    url: '/api/v1/items',
    keyField: 'id',
  });

  return () => (
    <O2Table option={option}>
      {/* 行内编辑列 */}
      <O2ColumnInput title="名称" field="name" />
      <O2ColumnSwitch title="启用" field="enabled" trueValue={1} falseValue={0} />
    </O2Table>
  );
});
```

# 常用配置

- `url` 与 `keyField` 是最小配置集合。
- `defaultNewRow` 用于默认行值，适合列表新建。
- `editType` 控制行内编辑/表单编辑，字段多时建议 `form`。
- `hooks` 用于在增删改查各阶段注入逻辑。

# 进阶要点

- `deepField` 支持链式字段（如 `a.b.c`），开启后列组件会按路径读写。
- `cascadeFields` 用于列间联动，见技能 `o2-columns`。

# 常见模式

- 列表页结构见技能 `o2-page-list`。
- 列组件统一能力见技能 `o2-columns`。
