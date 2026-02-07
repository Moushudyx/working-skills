---
name: o2-common-issues
description: 常见问题与排查建议（摘自 100.常见问题）
---

# 网络请求与异步处理

- 推荐使用 `async/await`，避免回调地狱。
- 对“只需要请求一次”的场景可用缓存 Promise。

```jsx
// 只执行一次的请求包装
const loadOnce = (fn) => {
  let promise;
  return async (...args) => (promise ? promise : (promise = fn(...args)));
};
```

# 单列编辑多个字段

- 使用列的 `edit`/`normal` 插槽自定义渲染。

```jsx
<O2Column title="日期范围" field={['start', 'end']}>
  {{
    normal: ({ row }) => <span>{[row.start, row.end].filter(Boolean).join('~')}</span>,
    edit: ({ row }) => <O2DatePicker range v-model-start={row.start} v-model-end={row.end} />,
  }}
</O2Column>
```

# 获取查询表单筛选参数

- 使用 `await option.methods.getParams()` 获取上一次查询参数。
- 用户未触发查询时不会更新参数。

# 页面之间状态共享

- 使用 `reactive` 在模块级创建共享状态，并导出 getter。
- 生命周期钩子只能在 `setup` 内调用。

# 隐藏列但保留查询

- `hide` 会同时隐藏列表与查询表单。
- 若只想保留查询能力，可改用自定义查询表单或单独的筛选区。

# O2Table 响应卡顿

- 将表格渲染包进 `computed`，缩小响应式依赖范围。

```jsx
const tableNode = computed(() => <O2Table option={option}>{/* columns */}</O2Table>);
return () => <>{tableNode.value}</>;
```

# 动态 required

- `required` 支持函数，参数包含 `row`。

```jsx
<O2ColumnInputNumber
  field="n2"
  title="n2"
  required={({ row }) => !!row.n1}
/>
```

# 动态增删列顺序

- `1.4.19` 之前动态增删列可能顺序错乱，升级或确保 `key` 唯一。

# Hooks 使用

- 新版 hooks 支持插入位置与中断执行，适合控制执行顺序。
