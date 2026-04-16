# useFormOption Buttons

useFormOption 内置了标准按钮体系，并支持通过 `buttons` 扩展。

## 按钮配置结构

| 字段 | 说明 |
| --- | --- |
| type | `save/update/cancel/other` |
| code | 按钮唯一标识 |
| permissionCode | 权限编码（不写时回退 code） |
| label/icon | 文案与图标，支持函数 |
| handler | 点击处理函数，支持异步 |
| render | 自定义渲染 |
| show/disabled | 显示与禁用控制，支持函数 |
| color | 按钮颜色 |
| seq | 排序权重 |
| confirmType | `popconfirm/modal` |
| confirmTitle | 二次确认文案，支持 ReactNode/函数 |

## 默认按钮

按 `status/editing` 自动切换：

- insert + editing=true：`insertCancel`、`insertSave`
- update + editing=true：`updateCancel`、`updateSave`
- editing=false：`update`（编辑）

默认顺序（seq 越小越靠前）：

- other: 5
- update: 10
- cancel: 15
- save: 20

## 权限与可用性

- `permission` 作为前缀时，按钮权限编码为 `${permission}.${permissionCode || code}`。
- 后端权限结果可控制按钮 `hidden/disabled`。
- `enable.insert/enable.update` 会影响标准编辑/保存按钮可用性。

## 放置位置

- 默认：按钮注入到 page operator（页面头部操作区）。
- `notPlaceButtonInPageOperator=true`：按钮渲染到表单内容区（onRenderContent）。

## 常见问题

### 自定义按钮不显示

- 检查 `show` 是否返回 false。
- 检查 hideButton 是否命中该 code。
- 检查权限是否返回 hidden。

### 按钮点击后没有 loading

- 统一 loading 来自 option.methods 的异步方法状态。
- 仅自定义 handler 且未走 methods 时，需要自行处理异步状态。

关联主文档：`../o2-form-option.md`。
