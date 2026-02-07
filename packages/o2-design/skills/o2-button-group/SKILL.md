---
name: o2-button-group
description: O2ButtonGroup 按钮组
---

# 基本用法

```jsx
import { O2ButtonGroup, O2Button } from 'o2-design';

export default () => (
  <O2ButtonGroup size="small" funcType="flat">
    <O2Button>新增</O2Button>
    <O2Button>删除</O2Button>
  </O2ButtonGroup>
);
```

# 要点

- `size` 与 `funcType` 会影响组内按钮样式。
- `forceDisabled` 可统一禁用。
