# slots 插槽

slots 用于“父组件传结构，子组件决定位置”。

## 基本概念

- `default` 是默认插槽。
- 具名插槽用于把不同内容投放到不同区域。
- 子组件可提供 fallback（兜底内容）。

## 基本用法

组件定义：

```tsx
import { designComponent } from 'o2-design';

export const MyPanel = designComponent({
  slots: ['default', 'header', 'footer'],
  setup({ slots }) {
    return () => (
      <section>
        <header>{slots.header?.() || <span>默认标题</span>}</header>
        <main>{slots.default?.()}</main>
        <footer>{slots.footer?.() || null}</footer>
      </section>
    );
  },
});
```

使用侧：

```tsx
<MyPanel>
  {{
    header: () => <h3>订单信息</h3>,
    default: () => <div>主体内容</div>,
    footer: () => <button>提交</button>,
  }}
</MyPanel>
```

## 常见模式

### 仅默认插槽

```tsx
const MyBox = designComponent({
  slots: ['default'],
  setup({ slots }) {
    return () => <div className="box">{slots.default?.()}</div>;
  },
});
```

### 可选具名插槽

- 对可选区域使用 `slots.xxx?.()`，避免未传时报错。
- 需要默认 UI 时加 fallback。

## 常见问题

### 为什么传了插槽不渲染

- 检查 `slots` 声明里是否包含对应名称。
- 检查渲染函数是否实际调用了 `slots.xxx?.()`。

### default 和具名同时传时顺序混乱

- 组件内应明确渲染顺序。
- 建议把布局语义固化在子组件，避免调用侧猜测顺序。
