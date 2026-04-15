# O2Column

O2Column 是所有 O2ColumnXxx 列组件的基础能力集合

## 最小可用示例

```tsx
import { O2Column, O2Table, designO2Page, useTableOption } from 'o2-design';

export default designO2Page(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id', enable: false });
  return () => (
    <O2Table option={option}>
      <O2Column title="名称" field="name" />
    </O2Table>
  );
});
```

## 关键参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | - | 列标题 |
| field | string | - | 字段名 |
| width | number | 150 | 列宽 |
| fixed | left/right | - | 固定列 |
| order | number | - | 列排序权重 |
| editable | boolean/function | null | 是否可编辑 |
| formFilter | boolean | false | 是否作为查询项 |
| filterName | string | input | 查询组件类型 |
| filterHandler | string | 模糊查询 | 查询处理方式 |
| rules | object/array | - | 校验规则 |
| required | boolean/function | - | 必填规则 |
| hide | boolean | false | 隐藏列 |
| disappearInFormEditor | boolean/function | false | 在表单编辑中隐藏 |
| tooltip | none/always/overflow | none | 单元格 tooltip 策略 |

## 常见关系

- editable 仅决定列是否可进入编辑态, 不等于校验自动生效
- required 可以是函数, 常用于按行动态必填
- form 插槽未设置时会回退到 edit 插槽
- edit 插槽未设置时会回退到 normal 插槽

## 推荐实践

- 常规类型优先使用 O2ColumnInput/O2ColumnLov/O2ColumnDatePicker 等专用列
- 仅在需要高度自定义时直接使用 O2Column + 作用域插槽, 作用域插槽见 references/o2-column-scope-slots.md
- 动态 required 与联动字段建议配合 cascadeFields 与规则函数
