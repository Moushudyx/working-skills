# O2ColumnDatePicker

O2ColumnDatePicker 是日期时间列，基于 O2DatePicker，支持显示格式化与范围查询。

关联基础组件：`../o2-datepicker.md`

## 示例代码

```tsx
import { O2ColumnDatePicker, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnDatePicker title="生效时间" field="effectiveTime" formFilter datetime />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| format | string | 自动推导 | 显示格式 |
| datetime | boolean | false | 是否日期时间 |
| panel | DatePicker/MonthPicker/WeekPicker | DatePicker | 面板类型 |

## 默认配置

- `width=135`
- `filterName='date'`
- `filterHandler='范围查询'`
- `type='date'`

## 注意事项

- normal 态会使用 `moment` 按 format 渲染。
- 非法日期字符串会回退展示原值。
