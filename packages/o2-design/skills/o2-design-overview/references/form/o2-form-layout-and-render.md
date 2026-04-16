# O2Form 布局与渲染

本文只说明布局与渲染策略，不重复解释校验规则。

## 容器级布局

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| column | 3 | 表单总列数 |
| width | 100% | 表单主体宽度 |
| bodyAlign | center | 表单内容对齐方式 |
| verticalLayout | 跟随主题 | 纵向布局开关 |
| labelWidth | 110 | 标签固定宽度 |
| labelMinWidth | 按列数推导 | 标签最小宽度 |
| labelAlign | 按列数推导 | 标签对齐 |

默认推导：

- `labelMinWidth`：单列 120，其余 110。
- `labelAlign`：当前实现默认右对齐（单列/多列均为 right）。

## 字段级布局（O2FormItem）

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| columns | 1 | 当前字段占用列数 |
| block | false | 占满整行 |
| flexOrder | 10 | flex 排序序号 |
| hideLabel | false | 隐藏标签 |
| colon | 继承 O2Form | 标签冒号 |

规则：

- 实际占列 = `min(columns 或 block 结果, O2Form.column)`。
- `block=true` 时按整行处理。

## 内容渲染结构

O2FormItem 内容渲染由 `renderFormItemCell` 统一处理：

- 非表格单元格：使用 O2FormTooltip 包裹，支持错误提示与业务 tooltip。
- 表格单元格：使用专门分支，避免与 cell overflow 规则冲突。

这保证了表单与表格在错误提示风格上的一致性。

## 详情页分块建议

- 一个详情页多个业务块时，优先拆多个 O2Form 提升可维护性。
- 多个 O2Form 共用同一 useFormOption 时，提交前统一 `validateAll()`。
- 复杂详情页模板参考 `../page-detail.md` 与 `../page/page-detail-template.md`。

## 常见问题

### 标签宽度看起来不一致

- 检查字段是否单独设置了 `labelWidth/labelMinWidth`。
- 检查是否混用了手写 O2FormItem 与 O2FormXXX 自动组件并设置了不同样式。

### 字段顺序不符合预期

- 检查 `flexOrder` 是否被业务代码覆盖。
- 检查 `block=true` 的字段是否打断了布局流。
