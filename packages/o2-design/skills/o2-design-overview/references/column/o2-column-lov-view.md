# O2ColumnLovView

O2ColumnLovView 是值集视图列，基于 O2LovView，适合弹窗表格选值。

关联基础组件：`../o2-lov-view.md`

## 示例代码

```tsx
import { O2ColumnLovView, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnLovView
        title="客户"
        field="customerName"
        showKey="customerName"
        lovCode="MDM.CUSTOMER"
        map={{ customerId: 'customerId', customerName: 'customerName' }}
        formFilter
      />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| lovCode | string | - | 值集视图编码 |
| showKey | string | field | 显示字段 |
| map | object/function | - | 回写映射 |
| lovPara | object/function | - | 查询参数 |
| multipleConfig | object | - | 多选配置 |
| normalMode | string/lovView | string | normal 态显示策略 |

## 默认配置

- `filterName='lovView'`
- `filterHandler='精确查询'`

## 注意事项

- `normalMode='lovView'` 且多选时，normal 态会渲染只读 O2LovView。
- 更细的 multipleConfig 行为见 `../o2-lov-view.md`。
