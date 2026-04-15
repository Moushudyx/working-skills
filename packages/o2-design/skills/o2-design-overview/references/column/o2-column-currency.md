# O2ColumnCurrency

O2ColumnCurrency 是金额列，基于 O2Currency，适用于金额展示与编辑场景。

关联基础组件：`../o2-currency.md`

## 示例代码

```tsx
import { O2ColumnCurrency, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnCurrency title="金额" field="amount" precision={2} currency="CNY" formFilter />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| step | number | - | 步进值 |
| precision | number | - | 小数精度 |
| currency | string | - | 币种 |

## 默认配置

- `filterName='number'`
- `filterHandler='精确查询'`
- `align='right'`
- `width=120`
- `type='number'`

## 注意事项

- normal 态默认使用 `textOnly`，只渲染格式化文本。
- `min/max` 支持结合行数据动态计算（内部使用 `getValidMinMaxNum`）。
- deepField 场景建议配合 `processDeepFieldVModel`。

## 版本支持

- `1.6.63` 起：默认补充 `type='number'`。
- `1.6.60`：normal 渲染改为文本模式，修复 overflow 展示问题。
