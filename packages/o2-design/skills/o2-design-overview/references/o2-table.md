# O2Table

O2Table 是 o2-design 列表主组件, 负责承接 useTableOption 并驱动查询、编辑、校验、分页等行为

关于 useTableOption 的说明请见 `./o2-table-option.md`

关于列组件的说明请见 `./o2-column.md`

## 示例代码

```tsx
import { O2ColumnInput, O2ColumnLov, O2Table, designO2Page, useTableOption } from 'o2-design';

export default designO2Page(() => {
  const option = useTableOption({
    url: '/api/demo/v1/items',
    keyField: 'id',
  });

  return () => (
    <O2Table option={option} commonColumnProps={{ fit: true }}>
      <O2ColumnLov title="状态" field="status" lovCode="HPFM.FLAG" formFilter />
      <O2ColumnInput title="编码" field="code" />
    </O2Table>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| option | object | - | useTableOption 返回的配置对象 |
| commonColumnProps | object | - | 可以给所有列统一设置属性 |
| otherTableProps | object | - | 其他表格属性, O2Table 基于 C7N 的 Table 组件 |

## 行为关系

- O2Table 必须接收 option, option 通常来自 useTableOption
- 当 option.config.loadOnStart 为 true 时(默认为 true), 组件挂载后自动查询
- 列的校验规则会在编辑变更时自动触发

## 常见问题

### 列表没有自动加载

- 检查 option.config.loadOnStart 是否设为 false
- 检查 option 初始化是否完成

### 编辑后校验不生效

- 检查列组件是否绑定了 field
- 检查 rules/required/type/min/max 是否配置在列上

### 动态列场景渲染异常

- 动态列较多时建议关闭 tableRenderSeparate
- 列定义除非有需求否则不建议动态生成, 避免每次 render 重建新数组
