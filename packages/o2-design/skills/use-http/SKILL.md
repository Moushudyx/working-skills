---
name: use-http
description: useHttp 网络请求工具的用法
---

# 基本用法

```jsx
import { designPage, useHttp, O2Button } from 'o2-design';

export default designPage(() => {
  const http = useHttp();

  const load = async () => {
    // 根据项目初始化配置，http 会带上 token 等基础信息
    const data = await http.get('/api/v1/items', { page: 0, size: 10 });
    console.log(data);
  };

  return () => <O2Button asyncHandler={load}>加载数据</O2Button>;
});
```

# 要点

- `useHttp` 来自 `initialize` 的基础配置。
- 适合配合 `async/await` 编写清晰的请求逻辑。
