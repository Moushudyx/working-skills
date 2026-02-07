---
name: o2-form
description: O2Form 表单容器与 useFormOption 的基本用法
---

# O2Form 概览

O2Form 是详情页表单的基础容器，推荐与 `useFormOption` 配合，让表单具备加载、编辑、保存、校验等完整能力。

# 基本用法

```jsx
import { designPage, useFormOption, O2Form, O2FormInput } from 'o2-design';

export default designPage(() => {
  const option = useFormOption({
    url: '/api/v1/items',
    keyField: 'id',
    state: { formData: { id: 1 }, status: 'update' },
  });

  return () => (
    <O2Form option={option} column={3}>
      {/* 推荐使用 O2FormX 变体 */}
      <O2FormInput label="名称" field="name" required />
    </O2Form>
  );
});
```

# 多表单共享一个 option

`useFormOption` 支持多张表单共享同一个 `option`，适合详情页分块。

```jsx
export default designPage(() => {
  const option = useFormOption({
    url: '/api/v1/items',
    keyField: 'id',
    state: { formData: { id: 1 }, status: 'update' },
  });

  return () => (
    <>
      <O2Form option={option} column={2}>{/* 基础信息 */}</O2Form>
      <O2Form option={option} column={3}>{/* 其他信息 */}</O2Form>
    </>
  );
});
```

# 常用要点

- `state.formData` 里应预置 keyField，避免初始化无法加载详情。
- `option.methods.validateAll()` 可一次校验所有挂载到 option 的表单。
- 详情页建议使用技能 `o2-page-detail` 中的 `useFormOptionSetup` 结构。
- 具体表单字段组件见技能 `o2-form-components` 与各独立组件技能。
- 更推荐使用 `O2FormInput`/`O2FormSelect` 等变体，只有自定义渲染时使用 `O2FormItem`。
