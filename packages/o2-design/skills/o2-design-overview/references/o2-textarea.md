# O2Textarea 文本域

O2Textarea 用于多行文本输入，支持后缀插槽、防抖同步和 Enter/Blur 提交。

如果需要“输入框 + 弹窗编辑”模式，见 `o2-textarea-input.md`。

## 示例代码

```tsx
import { O2Textarea, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ remark: '' });

  return (
    <O2Textarea
      v-model={state.remark}
      rows={4}
      optimize
      placeholder="请输入备注"
      style={{ width: 420 }}
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string \| number | - | 双向绑定值 |
| optimize | boolean | false | 输入过程弱同步，依赖 Enter/Blur 提交 |

说明:

- 继承 choerodon-ui/pro TextArea 常用属性。
- 内部支持 `suffix`（通过继承 c7n TextArea 实现）。

## 常见问题

### 为什么输入和模型更新有延迟？

- 组件内有 300ms 防抖同步。
- `optimize=true` 时更依赖 Enter/Blur。

### 为什么 clear 后值是空？

- clear 会触发模型更新并发出 `onClear`。
- 建议在业务层统一处理空值语义。

## 特殊使用场景

- 详情页长备注录入。
- 列表行内多行文本编辑。
