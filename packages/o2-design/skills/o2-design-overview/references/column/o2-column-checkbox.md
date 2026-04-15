# O2ColumnCheckbox

O2ColumnCheckbox 是复选列，基于 O2Checkbox，常用于 Y/N 或布尔态字段。

关联基础组件：`../o2-checkbox.md`

## 示例代码

```tsx
import { O2ColumnCheckbox, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return (
    <O2Table option={option}>
      <O2ColumnCheckbox title="是否有效" field="enabledFlag" trueValue="Y" falseValue="N" />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| trueValue | any | Y | 勾选值 |
| falseValue | any | N | 未勾选值 |
| trueLabel | any | 是 | 勾选文案 |
| falseLabel | any | 否 | 未勾选文案 |

## 默认配置

- `paddingWhenEditing=true`
- `align='center'`

## 行为说明

- normal 态显示成功/失败 Badge。
- edit 态显示 O2Checkbox 并同步文案。
