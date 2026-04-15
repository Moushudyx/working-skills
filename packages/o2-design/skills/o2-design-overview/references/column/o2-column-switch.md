# O2ColumnSwitch

O2ColumnSwitch 是开关列，基于 O2Switch，normal 态默认显示 Badge。

关联基础组件：`../o2-switch.md`(编辑态) 与 `../o2-lov.md`(查询表单)。

## 示例代码

```tsx
import { O2ColumnSwitch, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnSwitch title="启用" field="enabledFlag" trueValue={1} falseValue={0} formFilter />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| trueValue | any | 1 | 打开值 |
| falseValue | any | 0 | 关闭值 |
| trueLabel | any | 启用 | 打开文案 |
| falseLabel | any | 禁用 | 关闭文案 |
| yesNoMode | boolean | false | normal 态改为“是/否”纯文本 |
| lovCode | string | HPFM.FLAG | 查询表单筛选项的值集编码 |

## 默认配置

- `paddingWhenEditing=true`
- `align='center'`
- `filterName='lov'`
- `filterHandler='精确查询'`

## 参数关系

- `trueLabel/falseLabel` 只影响 normal 态的 Badge 文案。
- `yesNoMode=true` 时，normal 态固定输出“是/否”，会覆盖 `trueLabel/falseLabel` 的展示效果。
- `lovCode` 不参与 normal/edit 的开关判定，主要用于 `formFilter` 场景下默认筛选组件配置（`defaultFilterConfig`）。
- 开关真实判定始终基于 `value === trueValue / falseValue`。
