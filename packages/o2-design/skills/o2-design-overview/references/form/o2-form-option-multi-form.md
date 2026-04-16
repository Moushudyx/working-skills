# useFormOption 多表单协作

一个 option 可以驱动多个 O2Form，适用于详情页分块场景。

## 机制

- 每个 O2Form 在 setup 时会注册到 `hooks.onO2FormRef`。
- option 内部把引用收集到 `freezeState.forms`。
- O2Form 卸载时通过 `onO2FormUnRef` 注销引用。

## 统一能力

### 聚合校验

- `methods.validateAll()` 会遍历所有已注册表单。
- 失败时默认抛首个错误，并附带 `errorFormIndexes`。

### 统一清理

- `methods.clearValidate()` 会清空所有注册表单的校验状态。

### 提交一致性

- `methods.save()` 先做 `validateAll`，再按 status 调 insert/update。

## 推荐写法

```tsx
const option = useFormOption({ ... });

return () => (
	<>
		<O2Form option={option}>{/* 基本信息 */}</O2Form>
		<O2Form option={option}>{/* 扩展信息 */}</O2Form>
	</>
);
```

## 常见问题

### 第二个表单没参与校验

- 检查该表单是否确实挂载。
- 检查是否把 option 传成了不同实例。

### 分块切换后校验索引不稳定

- 动态渲染分块时，优先保持表单挂载顺序稳定。
- 错误定位建议结合字段名，而不是只依赖 errorFormIndexes。

关联主文档：`../o2-form-option.md`，页面模板：`../page-detail.md`。
