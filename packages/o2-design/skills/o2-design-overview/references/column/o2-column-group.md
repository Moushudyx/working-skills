# O2ColumnGroup

O2ColumnGroup 用于分组表头，可嵌套 O2Column 或其他 O2ColumnGroup。

类型：结构容器列（用于表头结构组织）。

关联文档：`../o2-column.md`

## 示例代码

```tsx
import { O2ColumnGroup, O2ColumnInput, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return (
    <O2Table option={option}>
      <O2ColumnGroup title="基础信息">
        <O2ColumnInput title="编码" field="code" />
        <O2ColumnInput title="名称" field="name" />
      </O2ColumnGroup>
    </O2Table>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | - | 分组标题 |
| fixed | left/right | - | 分组固定 |
| autoFixedLeft/autoFixedRight | boolean | false | 自动固定 |
| order | number | - | 分组排序 |
| hide | boolean | false | 隐藏分组 |

## 行为说明

- 组件内部通过 `O2ColumnCollectHelper` 收集子列定义。
- `head` 插槽可自定义分组标题渲染。
