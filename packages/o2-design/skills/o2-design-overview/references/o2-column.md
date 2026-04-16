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
| fit | boolean | false | 自动填充剩余宽度 |
| align | left/center/right | - | 对齐方式 |
| tooltip | none/always/overflow | 'none' | 气泡提示信息, 设为 overflow 时仅在内容溢出时显示 |
| autoFixedLeft/autoFixedRight | boolean | false | 自动左右固定(跟随已有的固定列, 如果没有对应的固定列则不固定) |
| order | number | - | 列排序权重 |
| editable | boolean/function | null | 是否可编辑 |
| formFilter | boolean | false | 是否作为查询项 |
| filterName | string | input | 查询组件类型 |
| filterHandler | string | 模糊查询 | 查询处理方式 |
| filterConfig/defaultFilterConfig | object/function | - | 查询配置 |
| rules | object/array | - | 校验规则 |
| required | boolean/function | - | 必填规则 |
| type/min/max/allowEquals | string/any | - | 常见校验扩展, 其中 type 表示类型, min/max 表示最小/最大值, allowEquals 表示是否允许等于边界值 |
| hide | boolean | false | 隐藏列（常用于“仅查询而不在列表中展示的字段”） |
| disappearInFormEditor | boolean/function | false | 在表单编辑中隐藏 |
| disappearInTable | boolean | false | 在表格区隐藏 |
| tooltip/cellTooltip | string/function | none | 单元格提示策略 |
| cascadeFields | string/string[] | - | 级联字段 |
| disableWhenParentClear | boolean | true | 父字段清空后禁用 |
| editProps | object/function | - | 透传编辑态组件额外属性 |
| formEditorOrder | number | - | 表单编辑顺序 |
| formEditorProps | object/function | - | 表单编辑组件额外属性(注意与 editProps 区分, 这里的属性作用于表单编辑时的 O2FormItem 组件上) |

校验规则见 `./validation.md`。

## 公共作用域插槽

| 插槽名 | 用途 | 参数 |
| --- | --- | --- |
| head | 标题单元格渲染 | { col: iColumnInfo; renderColumn: iRenderColumn; customizedTitle?: string } |
| normal | 普通显示态渲染 | { row: any; editRow: any; sourceRow: any; node: iTableNode; col: iColumnInfo; renderColumn: iRenderColumn } |
| edit | 行内编辑态渲染 | 同上 |
| form | 表单编辑态渲染(渲染的是 O2FormItem 内的部分) | 同上 |
| filter | 查询表单渲染 | { formData: PlainObject; col: iColumnInfo; toggleExpand: (expand?: boolean) => void; search: (forceSearch?: boolean) => Promise<void>; fto: iFilterTargetOption; } |

其中：

- `iColumnInfo` 是内部渲染时使用的列信息, 其上的 props 就是列的配置项 `iColumnProps`。
- `iColumnProps` 是列的配置项类型，是作用域插槽的主要参数来源。
- `iRenderColumn` 包含了 `iColumnProps` 并扩展了 `{ col: iColumnInfo; group: false; level: number; deepField?: boolean }`, 一般直接视为 `iColumnProps` 即可。

回退顺序：

- 表单编辑态优先使用 `form` 未提供时回退 `edit` (后续回退与下一条一致)
- 行内编辑态优先使用 `edit` 未提供时使用列组件自己的编辑态, 如果均没有则回退 `normal`
- `normal` 未提供时回退默认字段展示
- `filter` 未提供时回退 `filterName` 参数定义的查询组件, 均没有则使用默认查询组件(O2Input)

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
| O2ColumnInput | `column/o2-column-input.md` | O2Input |
| O2ColumnInputNumber | `column/o2-column-input-number.md` | O2InputNumber |
| O2ColumnCurrency | `column/o2-column-currency.md` | O2Currency |
| O2ColumnDatePicker | `column/o2-column-datepicker.md` | O2DatePicker |
| O2ColumnSelect | `column/o2-column-select.md` | O2Select |
| O2ColumnLov | `column/o2-column-lov.md` | O2Lov |
| O2ColumnLovView | `column/o2-column-lov-view.md` | O2LovView |
| O2ColumnSwitch | `column/o2-column-switch.md` | O2Switch, O2Lov |
| O2ColumnCheckbox | `column/o2-column-checkbox.md` | O2Checkbox |
| O2ColumnTextarea | `column/o2-column-textarea.md` | O2Textarea |
| O2ColumnIntlField | `column/o2-column-intl-field.md` | O2IntlField |
| O2ColumnJsonEditor | `column/o2-column-json-editor.md` | O2JsonEditor |
| O2ColumnImage | `column/o2-column-image.md` | O2Picture, O2ImageUpload |
| O2ColumnPicture | `column/o2-column-picture.md` | O2Picture |
| O2ColumnAddress | `column/o2-column-address.md` | O2Address |

### 内部/框架列

| 组件 | 文档 | 说明 |
| --- | --- | --- |
| O2ColumnOperator | `column/o2-column-operator.md` | 行内操作位布局列，封装按钮组渲染策略 |
| O2ColumnCheck | `column/o2-column-check.md` | 勾选状态列，依赖 table option 的 check 状态机 |
| O2ColumnGroup | `column/o2-column-group.md` | 分组表头容器，负责收集子列结构 |

## 常见选型建议

- 常规字段优先使用对应变体，少写重复插槽。
- 复杂展示用 `O2Column + normal/head`。
- 复杂编辑用 `O2Column + edit/form`。
- 动态查询项优先用 `filter` 插槽。

## 版本支持

- `cascadeFields` 级联字段在 `1.6.30` 新增
- `filter` 插槽在 `1.6.18` 新增
- `formEditorOrder` 表单编辑顺序在 `1.5.9` 新增
- `formEditorProps` 用于给表单编辑的FormItem传递额外参数在 `1.5.9` 新增
- `disappearInFormEditor` 支持函数在 `1.6.61` 新增
- `highlight` / `highlightRenderer` / `cellTooltip` 在 `1.6.45` 新增
- `otherBodyCellProps` / `onCell` 在 `1.6.45` 新增
- `allowEquals` 边界等于校验在 `1.6.25` 新增
