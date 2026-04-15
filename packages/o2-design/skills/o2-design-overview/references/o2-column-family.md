# O2Column 系列速览

O2ColumnXxx 是按编辑组件类型拆分的列组件族

## 常见列组件

| 组件 | 典型场景 |
| --- | --- |
| O2ColumnInput | 文本输入 |
| O2ColumnInputNumber | 数字输入 |
| O2ColumnCurrency | 金额 |
| O2ColumnSelect | 下拉选择 |
| O2ColumnLov | 值集 |
| O2ColumnLovView | 值集视图/选择弹窗 |
| O2ColumnDatePicker | 日期时间 |
| O2ColumnCheckbox | 多选状态 |
| O2ColumnSwitch | 开关状态 |
| O2ColumnTextarea | 长文本 |
| O2ColumnAddress | 地址 |
| O2ColumnOperator | 行操作按钮 |
| O2ColumnGroup | 分组表头 |

## 选型建议

- 默认优先选专用列组件, 少写重复 edit/normal 插槽
- 复杂展示用 O2Column + normal/head 插槽
- 复杂编辑用 O2Column + edit/form 插槽
- 动态查询项优先用 filter 插槽

## 列配置组合建议

- 高可读字段: tooltip="overflow"
- 易误操作字段: editable 使用函数按行控制
- 有父子联动字段: cascadeFields + disableWhenParentClear
- 动态必填字段: required 使用函数
