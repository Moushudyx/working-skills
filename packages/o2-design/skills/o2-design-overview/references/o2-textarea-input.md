# O2TextareaInput 弹框文本域

O2TextareaInput 是 O2Input 的增强组件，点击后缀按钮可打开弹窗编辑长文本。

## 示例代码

```tsx
import { O2TextareaInput, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ content: '' });

  return (
    <O2TextareaInput
      v-model={state.content}
      modalTitle="编辑说明"
      textAreaProps={{ rows: 8, maxLength: 2000 }}
      style={{ width: 420 }}
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string | - | 绑定值 |
| modalTitle | string \| ReactNode | - | 弹窗标题（必填） |
| textAreaProps | object | - | 透传给 O2Textarea 的属性 |

## 常见问题

### 只读状态下还能打开弹窗吗？

- 可以打开，但弹窗是只读模式。
- 用于查看完整文本。

### 为什么后缀是三个点按钮？

- 组件内置 `...` 按钮作为弹窗入口。
- 适合在紧凑布局中编辑长文本。

## 特殊使用场景

- 列表页行内摘要 + 弹窗全文编辑。
- 详情页长文本字段的分步编辑。
