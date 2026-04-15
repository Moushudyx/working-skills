# O2ColumnInputNumber

O2ColumnInputNumber 是数字输入列，基于 O2InputNumber，默认带数字型筛选配置。

关联基础组件：`../o2-input-number.md`

## 示例代码

```tsx
import { O2ColumnInputNumber, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnInputNumber title="数量" field="qty" formFilter min={0} precision={2} />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| step | number | - | 步进值 |
| precision | number | - | 小数精度 |

## 默认配置

- `filterName='number'`
- `filterHandler='模糊查询'`
- `align='right'`
- `width=120`
- `type='number'`

## 注意事项

- `min/max` 可结合行数据动态计算（源码使用 `getValidMinMaxNum`）。
- 建议与 `required/type/min/max` 规则一起使用。
