---
name: o2-button
description: O2Button 操作按钮组件
---

# 基本用法

```jsx
import { O2Button } from 'o2-design';

export default () => (
	<>
		{/* 普通按钮 */}
		<O2Button onClick={() => console.log('click')}>保存</O2Button>

		{/* 带二次确认 */}
		<O2Button
			confirmType="modal"
			confirmTitle="确认提交吗？"
			asyncHandler={async () => {
				// 异步操作建议用 asyncHandler
				await Promise.resolve();
			}}
		>
			提交
		</O2Button>
	</>
);
```

# 常用参数

- `label` 按钮文本，等价于 children。
- `color` 按钮颜色（`ButtonColor`）。
- `funcType` 按钮样式（`raised`/`flat` 等，来自 C7N）。
- `size` 按钮大小。
- `icon` 图标（来自 C7N ButtonProps）。
- `asyncHandler` 异步处理函数，会自动处理 loading。
- `loading` 手动控制 loading。
- `confirmType` 二次确认方式：`popconfirm` 或 `modal`。
- `confirmTitle` 二次确认内容。

# 要点

- 常用于列表页/详情页的操作区。
- `confirmType="popconfirm"` 时会走气泡确认。
