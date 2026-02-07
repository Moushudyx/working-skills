---
name: o2-performance
description: O2 Design 页面性能优化常见手法
---

# 常见问题

- 页面所有逻辑写在一个组件内，任何字段变化都会触发全页面重渲染。

# 推荐做法

- 使用 `computed` 包装页面模块，减少不必要的重渲染。
- 将大页面拆成多个模块函数，按块渲染。

# 示例

```jsx
export default designPage(() => {
  const state = reactive({ formData: { name: '' } });
  const part1 = computed(() => <div>基础信息</div>);
  const part2 = computed(() => <div>扩展信息</div>);

  return () => (
    <>
      {part1.value}
      {part2.value}
    </>
  );
});
```
