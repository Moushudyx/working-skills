---
name: o2-modal
description: O2Modal 弹窗与确认框
---

# 基本用法

```jsx
import { designPage, O2Button, O2Modal } from 'o2-design';

export default designPage(() => {
  const openConfirm = async () => {
    const result = await O2Modal.asyncConfirm({
      title: '提示',
      children: '确认提交吗？',
    });
    console.log('confirm result', result);
  };

  return () => <O2Button onClick={openConfirm}>打开确认</O2Button>;
});
```

# 要点

- `O2Modal.confirm`/`asyncConfirm` 提供统一风格的确认框。
- `open` 支持 children 传函数以获得 `close/update` 等能力。
