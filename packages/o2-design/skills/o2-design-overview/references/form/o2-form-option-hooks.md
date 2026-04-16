# useFormOption Hooks

useFormOption hooks 分为异步 hooks（createHooks）与同步 hooks（createSyncHooks）。

## hooks 清单

### 加载

- `onBeforeLoad(requestConfig)`
- `onAfterLoad(resp)`

### 新建

- `onBeforeInsert(requestConfig)`
- `onAfterInsert(resp)`
- `onFinishInsert(state)`

### 更新

- `onBeforeUpdate(requestConfig)`
- `onAfterUpdate(resp)`
- `onFinishUpdate(state)`

### 提交通用

- `onBeforeSubmit(requestConfig)`
- `onAfterSubmit(resp)`
- `onFinishSubmit(state)`

### 校验

- `onValidateError({ error })`
- `onAfterValidate()`

### 编辑态切换

- `onBeforeOpenEdit(state)`
- `onAfterOpenEdit(state)`
- `onBeforeCancelEdit(state)`
- `onAfterCancelEdit(state)`

### 渲染与按钮

- `onRenderContent(content)`
- `onLoading(flag?)`
- `onButtons(buttons)`

### 表单实例生命周期

- `onO2FormSetup()`
- `onO2FormRef(form)`
- `onO2FormUnRef(form)`

## 执行时序（核心链路）

### refresh

1. `onBeforeLoad`
2. 请求 detail
3. `onAfterLoad`
4. 写入 formData/formDataBackUp

### saveInsert/saveUpdate

1. `onBeforeInsert` 或 `onBeforeUpdate`
2. `onBeforeSubmit`
3. 请求 insert/update
4. `onAfterInsert` 或 `onAfterUpdate`
5. `onAfterSubmit`
6. 视配置 refresh 或直接写入返回值
7. `onFinishInsert/onFinishUpdate`
8. `onFinishSubmit`

## 使用建议

- 请求参数改写优先放 `onBeforeLoad/onBeforeSubmit`。
- 返回值标准化优先放 `onAfterLoad/onAfterSubmit`。
- 页面副作用（埋点、联动）优先放 `onFinish*`。
- 按钮显示/禁用的统一改写放 `onButtons`。

关联主文档：`../o2-form-option.md`。
