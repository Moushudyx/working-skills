# O2ColumnLov

O2ColumnLov 是值集列，基于 O2Lov，适用于平台值集编码映射场景。

关联基础组件：`../o2-lov.md`

## 示例代码

```tsx
import { O2ColumnLov, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnLov title="启用状态" field="enabledFlag" lovCode="HPFM.FLAG" formFilter adjustToString />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| lovCode | string | - | 值集编码 |
| multiple | boolean | false | 多选 |
| disabledOptions | any[] | - | 禁选项 |
| processLovOptions | function | - | 二次处理值集选项 |
| adjustToString | boolean | false | 回写值转字符串 |

## 默认配置

- `filterName='lov'`
- `filterHandler='精确查询'`
- `width=120`

## 注意事项

- normal 态通过 `$$lov` 做值到含义映射。
- multiple 模式下建议统一字段值类型，避免回显不一致。
