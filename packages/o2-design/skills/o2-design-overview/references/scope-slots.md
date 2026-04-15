# scope-slots 作用域插槽

scope-slots 是带参数的插槽：子组件在渲染插槽时把上下文传给父组件。

## 基本概念

- 普通 slots 只传内容。
- scope-slots 额外传 `scope` 参数（如 `row/index/formData`）。
- 适合“父组件自定义渲染，但依赖子组件内部上下文”的场景。

## 基本用法

组件定义：

```tsx
import { designComponent } from 'o2-design';

export const MyList = designComponent({
  scopeSlots: {
    item: (scope) => true,
  },
  setup({ scopeSlots }) {
    const rows = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    return () => (
      <div>
        {rows.map((row, index) => (
          <div key={row.id}>{scopeSlots.item?.({ row, index }) || row.name}</div>
        ))}
      </div>
    );
  },
});
```

使用侧：

```tsx
<MyList>
  {{
    item: ({ row, index }) => (
      <span>{index + 1}. {row.name}</span>
    ),
  }}
</MyList>
```

## 在 O2Column 中的对应关系

以 O2Column 为例，源码中声明了 `scopeSlots` 并在 setup 中传入 `useO2Column`：

- `scopeSlots: O2ColumnScopeSlotOption`
- `setup({ props, scopeSlots, event })`

这就是列组件支持 `normal/edit/form/filter/head` 等作用域插槽的入口。

更完整示例见 `o2-column-scope-slots.md`。

## 常见问题

### 作用域参数拿不到

- 检查子组件是否在调用 `scopeSlots.xxx?.({...})` 时传了参数。
- 检查父组件函数签名是否与参数结构一致。

### 没传 scope-slot 时渲染为空

- 组件内建议给 fallback：`scopeSlots.xxx?.(scope) || 默认渲染`。
- 对关键位（如表格单元格）不要只依赖外部插槽。
