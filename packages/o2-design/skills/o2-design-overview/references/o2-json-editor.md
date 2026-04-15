# O2JsonEditor JSON 编辑器

O2JsonEditor 用于 JSON 字段可视化编辑，支持输入框模式和文本域模式。

## 示例代码

```tsx
import { O2JsonEditor, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ extJson: '{"a":1}' });

  return (
    <>
      <O2JsonEditor v-model={state.extJson} title="扩展参数" />
      <O2JsonEditor v-model={state.extJson} title="扩展参数(文本域)" textarea />
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string \| object | - | JSON 源数据 |
| title | string | JSON Editor | 弹窗标题 |
| textarea | boolean | false | 文本域展示模式 |

## 常见问题

### 双击没反应？

- 组件默认通过双击打开编辑弹窗。
- 输入框模式也可点后缀编辑图标。

### 非法 JSON 会怎样？

- 组件会提示错误并阻止非法内容进入编辑态。
- 建议保存前再做一次业务校验。

### 为什么回写是字符串？

- 组件最终回写 `JSON.stringify(...)`。
- 如果业务要对象，请在外层自行解析。

## 特殊使用场景

- 扩展配置字段可视化维护。
- 低频但复杂结构的参数编辑。
