# 列表字段交互与弹框拆分规范

## 目标

统一列表中“可点击字段、操作列、弹框/抽屉”相关写法，避免页面主文件过大。

## 常见场景

- 某一列点击后打开弹框
- 操作列点击后打开历史记录、编辑备注、关闭告警
- 字段通过 `renderer` 渲染成按钮、Tag、TextField 后触发交互

## 简短示例

```tsx
{
  name: 'remarkDetail',
  renderer: ({ record }) => {
    if (!record) return;
    return (
      <TextField
        readOnly
        record={record}
        name="remarkDetail"
        onClick={() => {
          addRemarkRef.current?.openModal(record);
        }}
      />
    );
  },
}
```

## 规范

1. 列表字段若有点击交互，优先在 `renderer` 中显式表达
2. 交互逻辑较复杂时，弹框、抽屉、历史明细等子组件尽量拆到 `components` 目录
3. 页面主文件保留“触发入口”和“状态/引用管理”，不要把整段弹框实现塞进主页面
4. 如果多个字段共用同一个弹框，统一通过 `forwardedRef` 或自定义 hook 管理打开行为

## 坑点

- 交互逻辑直接写在主页面 renderer 内，容易导致主文件体积失控
- modal 与列表数据耦合过深，后续复用困难
- 点击字段无明显可交互提示，用户体验差
- 交互逻辑分散在多个字段的 renderer 中，维护困难
