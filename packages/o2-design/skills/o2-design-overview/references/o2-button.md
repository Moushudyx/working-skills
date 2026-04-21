# O2Button 按钮

O2Button 是业务页面中最常用的操作触发组件, 基于 choerodon-ui/pro Button 封装

## 示例代码

```tsx
import { O2Button, designPage } from 'o2-design';

export default designPage(() => {
  const handleSave = async () => {
    await Promise.resolve();
  };

  return () => (
    <>
      <O2Button color="primary" funcType="raised" onClick={() => void 0}>保存</O2Button>
      <O2Button color="default" funcType="flat" asyncHandler={handleSave}>异步保存</O2Button>
      <O2Button confirmType="modal" confirmTitle="确认提交?" asyncHandler={handleSave}>
        提交
      </O2Button>
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | string | - | 按钮文案, 也可直接使用默认插槽文本 |
| color | primary/default/gray/blue/green/red/yellow | primary | 颜色风格 |
| funcType | raised/flat | raised | 展示形态 |
| size | large/default/small | default | 按钮尺寸 |
| asyncHandler | (e) => Promise<void> \| void | - | 异步点击处理, 执行期间会锁定按钮 |
| confirmType | popconfirm/modal | - | 二次确认类型 |
| confirmTitle | ReactNode | - | 二次确认文案, 仅在设置 confirmType 后生效 |

说明:

- 继承 choerodon-ui/pro Button 属性
- confirmTitle 只有在 confirmType=popconfirm 或 confirmType=modal 时才会生效
- 当存在 confirmType=popconfirm 时, 按钮 onClick 会改由确认框触发
- 当存在 confirmType=modal 时, 内部会先弹确认框, 确认后再执行点击逻辑

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮文本内容 |

## 常见问题

### 为什么 onClick 没有自动 loading 防抖?

- O2Button 的自动等待逻辑只在 asyncHandler 生效
- 如果你只写 onClick, 需要自行处理 loading 或防重复点击

### 异步按钮一直不可点

- 常见原因是 asyncHandler 中 Promise 没有正常结束
- 建议统一使用 try/finally 包裹异步流程

## 特殊使用场景

- 列表批量操作按钮: 推荐使用 asyncHandler + confirmType="modal" 组合
- 轻量危险操作: 推荐 confirmType="popconfirm", 避免阻断页面焦点流

## 版本支持

- `confirmTitle` 支持 ReactNode 类型在 `1.5.18` 起支持
- `confirmType` 和 `confirmTitle` 用于行内按钮（O2Table 行内按钮由 `a` 标签替换为 O2Button）在 `1.6.37` 起支持
