# O2ColumnCheck

O2ColumnCheck 是勾选列（行勾选/全选/跨页全选），由表格 check 状态驱动。

类型：内部/框架列（与 table check 状态机绑定，不作为业务字段列）。

关联基础组件：

- `../o2-table.md`
- `../o2-checkbox.md`

## 示例代码

```tsx
import { O2ColumnCheck, O2ColumnInput, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({
    url: '/api/demo/v1/items',
    keyField: 'id',
    multipleCheck: true,
  });

  return (
    <O2Table option={option}>
      <O2ColumnCheck />
      <O2ColumnInput title="编码" field="code" />
    </O2Table>
  );
});
```

## 默认配置

- `width=50`
- `align='center'`
- `autoFixedLeft=true`
- `disappearInFormEditor=true`
- `stopPropagationClick=true`

## 行为说明

- 头部 checkbox 控制当页全选/取消。
- 开启 `showAllPageCheck` 时支持“跨页全选”。
- 在 `checkOnClickRow=true` 且行不可编辑时，点击行可触发勾选。
- 依赖 `useTableOption` 的 `singleCheck/multipleCheck/check` 相关配置。
