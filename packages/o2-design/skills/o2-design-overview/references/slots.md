# slots 插槽

slots 用于“父组件传结构，子组件决定位置”。

关于 scope-slots 见 `scope-slots.md`，它们的区别在于是否传递作用域参数。

## 基本概念

- `default` 是默认插槽, 写法就是直接写子组件。
- 具名插槽用于把不同内容投放到不同区域。
- 子组件可提供 fallback（兜底内容）。

## 基本用法

### 默认插槽

组件定义：

```tsx
const MyBox = designComponent({
  slots: ['default'],
  setup({ slots }) {
    return () => <div className="box">{slots.default()}</div>;
  },
});
```

使用侧：

```tsx
<MyBox>
  <p>这是 box 里的内容</p>
</MyBox>
```

### 多个插槽

组件定义：

```tsx
import { designComponent } from 'o2-design';

export const MyPanel = designComponent({
  slots: ['default', 'header', 'footer'],
  setup({ slots }) {
    return () => (
      <section>
        <header>{slots.header(<span>默认标题</span>)}</header>
        <main>{slots.default('默认内容')}</main>
        {/* slots.插槽名.isExist() 可以判断插槽是否存在 */}
        {slots.footer.isExist() ? <footer>{slots.footer(<button>默认按钮</button>)}</footer> : null}
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

## 常见问题

### 为什么传了插槽不渲染

- 检查 `slots` 声明里是否包含对应名称。
- 检查渲染函数是否实际调用了 `slots.xxx()`。

### default 和具名同时传时顺序混乱

- 组件内应明确渲染顺序。
- 建议把布局语义固化在子组件，避免调用侧猜测顺序。
