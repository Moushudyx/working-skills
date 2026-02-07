---
name: o2-button-collapse
description: O2ButtonCollapse 按钮折叠
---

# 基本用法

```jsx
import { O2ButtonCollapse, O2Button } from 'o2-design';

export default () => (
  <O2ButtonCollapse max={3} placement="bottom">
    <O2Button>新增</O2Button>
    <O2Button>编辑</O2Button>
    <O2Button>删除</O2Button>
    <O2Button>导出</O2Button>
  </O2ButtonCollapse>
);
```

# 要点

- `max` 控制展示按钮数量，超出部分折叠到气泡。
- 内部会处理按钮权限后再渲染。
