---
name: reactive-caveats
description: 响应式数据常见陷阱与规避方式
---

# 常见陷阱：新增属性不响应

```jsx
const state = reactive({ text: 'awa' });
state.info = 'new'; // info 不是响应式
```

规避方式：初始化时就把需要的字段写入 `reactive` 对象。

# 常见陷阱：setup 外不可用生命周期

生命周期只能写在 `setup` 函数中，渲染函数中不可调用。

# 建议

- 复杂对象尽量一次性初始化字段，避免运行时新增。
- 需要跨组件共享时，可通过 `reactive` 创建共享状态，但注意生命周期与依赖边界。
