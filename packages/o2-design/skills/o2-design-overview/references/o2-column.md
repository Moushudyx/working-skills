# O2Column 列体系总览

O2Column 是所有 O2ColumnXxx 列组件的基础能力集合。

在源码中，基础列与大部分变体都复用 `O2ColumnPropOption + O2ColumnScopeSlotOption + useO2Column`。

## 示例代码

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

## 公共参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | - | 列标题 |
| field | string | - | 字段名 |
| width | number | 150 | 列宽 |
| fixed | left/right | - | 固定列 |
| autoFixedLeft/autoFixedRight | boolean | false | 自动左右固定 |
| order | number | - | 列排序权重 |
| editable | boolean/function | null | 是否可编辑 |
| formFilter | boolean | false | 是否作为查询项 |
| filterName | string | input | 查询组件类型 |
| filterHandler | string | 模糊查询 | 查询处理方式 |
| filterConfig/defaultFilterConfig | object/function | - | 查询配置 |
| rules | object/array | - | 校验规则 |
| required | boolean/function | - | 必填规则 |
| type/min/max/allowEquals | string/any | - | 常见校验扩展 |
| hide | boolean | false | 隐藏列（常用于“仅查询字段”） |
| disappearInFormEditor | boolean/function | false | 在表单编辑中隐藏 |
| disappearInTable | boolean | false | 在表格区隐藏 |
| tooltip/cellTooltip | string/function | none | 单元格提示策略 |
| cascadeFields | string/string[] | - | 级联字段 |
| disableWhenParentClear | boolean | true | 父字段清空后禁用 |
| editProps | object/function | - | 透传编辑态组件额外属性 |

## 公共作用域插槽

| 插槽名 | 用途 |
| --- | --- |
| head | 标题单元格渲染 |
| normal | 普通显示态渲染 |
| edit | 行内编辑态渲染 |
| form | 表单编辑态渲染 |
| filter | 查询表单渲染 |

回退顺序：

- `form` 未提供时回退 `edit`
- `edit` 未提供时回退 `normal`
- `normal` 未提供时回退默认字段展示

作用域插槽详解见 `./column/o2-column-scope-slots.md`。

## 特殊写法

### deepField 场景

当 `tableOption.deepField=true` 时，编辑态不应直接使用 `row[field]`，建议配合 `processDeepFieldVModel`。

```tsx
edit: (scope) => (
  <O2Input
    v-model={scope.row[scope.col.props.field!]}
    {...processDeepFieldVModel(scope)}
  />
)
```

### 动态必填/可编辑

`required` 与 `editable` 支持函数，按行动态控制：

```tsx
required={({ row }) => row.type === 'REQUIRED'}
editable={({ row }) => row.manual === 'Y'}
```

## 变体组件关系

如无特殊说明, 相关文档放在 `references/column/` 目录中

### 常用业务列

| 组件 | 文档 | 对应基础组件 |
| --- | --- | --- |
| O2ColumnInput | `o2-column-input.md` | O2Input |
| O2ColumnInputNumber | `o2-column-input-number.md` | O2InputNumber |
| O2ColumnCurrency | `o2-column-currency.md` | O2Currency |
| O2ColumnDatePicker | `o2-column-datepicker.md` | O2DatePicker |
| O2ColumnSelect | `o2-column-select.md` | O2Select |
| O2ColumnLov | `o2-column-lov.md` | O2Lov |
| O2ColumnLovView | `o2-column-lov-view.md` | O2LovView |
| O2ColumnSwitch | `o2-column-switch.md` | O2Switch, O2Lov |
| O2ColumnCheckbox | `o2-column-checkbox.md` | O2Checkbox |
| O2ColumnTextarea | `o2-column-textarea.md` | O2Textarea |
| O2ColumnIntlField | `o2-column-intl-field.md` | O2IntlField |
| O2ColumnJsonEditor | `o2-column-json-editor.md` | O2JsonEditor |
| O2ColumnImage | `o2-column-image.md` | O2Picture, O2ImageUpload |
| O2ColumnPicture | `o2-column-picture.md` | O2Picture |
| O2ColumnAddress | `o2-column-address.md` | O2Address |

### 内部/框架列

| 组件 | 文档 | 说明 |
| --- | --- | --- |
| O2ColumnOperator | `o2-column-operator.md` | 行内操作位布局列，封装按钮组渲染策略 |
| O2ColumnCheck | `o2-column-check.md` | 勾选状态列，依赖 table option 的 check 状态机 |
| O2ColumnGroup | `o2-column-group.md` | 分组表头容器，负责收集子列结构 |

## 常见选型建议

- 常规字段优先使用对应变体，少写重复插槽。
- 复杂展示用 `O2Column + normal/head`。
- 复杂编辑用 `O2Column + edit/form`。
- 动态查询项优先用 `filter` 插槽。
