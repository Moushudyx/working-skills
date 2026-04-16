---
name: c7n-ui-overview
description: Choerodon UI 组件库开发必读
---

# Choerodon UI

本技能用于在使用 Choerodon UI (`choerodon-ui`、`choerodon-ui/pro`) 仓库中执行规范驱动开发（Spec-Driven Development）

## 适用范围

- 新页面开发（路由、权限、DataSet、LOV、多语言）
- 现有页面重构（结构对齐、目录规范化）
- 组件开发（含文档化）
- 编码前规则对齐、编码后规则自检

## 阅读建议

- 先读本文件（`skills/c7n-ui-overview/SKILL.md`）
- 根据任务类型，按需读取 `skills/c7n-ui-overview/references/` 下文档
- 输出实现前，先写“本次将遵循的规则清单”

## 关键概念

- DataSet：查询、字段、transport、绑定、生命周期
- 多语言（intl）：静态 key、默认值英文、可扫描写法
- LOV：也称值集，只能在线上环境配置，用于将内部编码翻译成可阅读的文字，用法为 `lookupCode`(独立值集) 与 `options(getLovDs)`(SQL 值集)
- 权限：一般与按钮/接口绑定，前端一般只需关注按钮权限
- 新页面注册：路由、permissionKey、按钮权限码，新页面需要线上环境配置

## references 目录说明

目录：`skills/c7n-ui-overview/references`

- `dataset.md`：DataSet 规范与模板
- `lov.md`：LOV 使用规范
- `page-registration.md`：新页面注册与权限规范
- `header-actions.md`：页面顶部按钮区规范
- `common-import.md`：CommonImport 使用规范
- `table-interactions.md`：列表字段交互与弹框，代码拆分规范
- `table-styling.md`：列表表头与单元格上色规范

## C7N 文档预留

- 后续将补充 `choerodon-ui` `choerodon-ui/pro` 组件详细文档
- 当前先以本技能中的页面级模板与关键组件文档为准

## 执行规则

- 先规范后编码：若规则不清晰，先补文档再改代码
- 默认优先复用现有模式，不引入新范式
- 遇到规范未覆盖但会重复使用的组件写法或坑点，先与人类开发者讨论，再补文档
- 如果页面/组件功能复杂导致代码过多，应该与人类开发者讨论拆分逻辑到其他代码文件中，单个代码文件大小最好不要超过 500 行（如果接近 1000 行则必须提上日程），并且要有明确的功能边界

## 编码前检查清单

- 是否确认目标模块与页面路由命名
- 是否确认 `permissionKey` 来源与按钮权限码格式
- 是否明确 DataSet 的 `queryFields/fields/transport`
- 是否明确 LOV 选型（`lookupCode` 或 `options(getLovDs)`）
- 是否列出本次涉及的 intl key 前缀

## 编码后检查清单

- 路由已注册且路径符合命名规范
- 权限 key 与按钮权限码可追溯
- DataSet 查询与提交流程可执行
- 新增/变更内容有对应 reference 依据
- 对字段和接口时需要注意除了页面、dataSet 中的接口/字段外，页面逻辑、子组件、相关页面中的接口/字段也要检查

### 一些需要忽略的问题

- withProps 的第一个参数的返回值在定义为了 DataSetMap 但是实际上传什么都可以, 所以忽略这里的 ts 报错
