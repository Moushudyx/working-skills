# O2ColumnAddress

O2ColumnAddress 是地址列，基于 O2Address，适用于国家/省/市/区级联选择。

关联基础组件：`../o2-address.md`

## 示例代码

```tsx
import { O2ColumnAddress, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return (
    <O2Table option={option}>
      <O2ColumnAddress
        title="省份"
        field="provinceName"
        valueField="provinceCode"
        parentValueField="countryCode"
        region
      />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| valueField | string | - | 地址值字段（必填） |
| parentValueField | string | - | 父级值字段 |
| country/region/city/district | boolean | false | 地址级别 |
| bindId | boolean | false | 值是否绑定 id |
| parentValue | string/number | - | 显式父值 |
| queryUrl | string | - | 自定义查询路径 |

## 注意事项

- 该列同时维护 `name` 与 `value` 两套字段。
- deepField 场景下会对 `name/value/parentValue` 分别做安全回写。
