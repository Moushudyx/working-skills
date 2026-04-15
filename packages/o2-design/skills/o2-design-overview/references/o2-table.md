# O2Table

O2Table 是 o2-design 列表主组件, 负责承接 useTableOption 并驱动查询、编辑、校验、分页等行为

## 最小可用示例

```tsx
import { O2ColumnInput, O2ColumnLov, O2Table, designO2Page, useTableOption } from 'o2-design';

export default designO2Page(() => {
  const option = useTableOption({
    url: '/api/demo/v1/items',
    keyField: 'id',
  });

  return () => (
    <O2Table option={option}>
      <O2ColumnLov title="状态" field="status" lovCode="HPFM.YES_NO" formFilter />
      <O2ColumnInput title="编码" field="code" />
    </O2Table>
  );
});
```

## 高频配置

| 配置 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| url | string/object | - | 请求地址配置 |
| keyField | string | id | 行唯一键字段 |
| editType | inline/form | inline | 编辑模式 |
| enable | boolean/object | - | 控制增删改可用性 |
| hideButton | object | - | 控制默认按钮显示 |
| paging | boolean | true | 是否分页 |
| autoFill | boolean | false | 自动高度填充 |
| commonColumnProps | object/function | - | 全列公共属性 |
| hooks | object | - | 生命周期与行为钩子 |

## 行为关系

- O2Table 必须接收 option, option 通常来自 useTableOption
- 当 option.config.loadOnStart 为 true 且 O2Table.loadOnStart 也为 true 时, 组件挂载后自动查询
- 列的校验规则会在编辑变更时由 table 统一触发

## 常见问题

### 列表没有自动加载

- 检查 option.config.loadOnStart 与 O2Table.loadOnStart 是否都为 true
- 检查 option 初始化是否完成

### 编辑后校验不生效

- 检查列组件是否绑定了 field
- 检查 rules/required/type/min/max 是否配置在列上

### 动态列场景渲染异常

- 动态列较多时建议关闭 tableRenderSeparate
- 列定义建议稳定化, 避免每次 render 重建新数组
