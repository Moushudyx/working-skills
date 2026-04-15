# O2Input 输入框

O2Input 是最基础的文本输入组件，支持单值、多值、脱敏展示等高频场景。

如果你要输入数字，优先使用 `o2-input-number.md`；如果要长文本编辑，优先使用 `o2-textarea.md`。

## 示例代码

```tsx
import { O2Input, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({
    name: '',
    tags: [] as string[],
    mobile: '13800138000',
  });

  return () => (
    <>
      <O2Input v-model={state.name} placeholder="请输入名称" style={{ width: 240 }} />
      <O2Input
        v-model={state.tags}
        multiple
        multipleSplit={[/\s+/, ',', '，']}
        placeholder="可粘贴多个编码"
        style={{ width: 320 }}
      />
      <O2Input v-model={state.mobile} encrypt="tel" disabled style={{ width: 240 }} />
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string \| number \| (string\|number)[] | - | 双向绑定值 |
| multiple | boolean | false | 是否开启多值输入 |
| multipleSplit | string \| RegExp \| (string\|RegExp)[] | [/\s+/, ','] | 多值拆分规则 |
| encrypt | boolean \| 'tel' | - | 只读/禁用时脱敏展示 |
| optimize | boolean | false | 开启后输入过程弱同步，主要在 Enter/Blur 时提交 |

说明:

- 继承 choerodon-ui/pro 的 TextField 常用属性。
- `multiple` 模式会对拆分结果去重。
- `encrypt='tel'` 为手机号脱敏；其他值按姓名样式脱敏。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| suffix | 后缀内容，可放按钮/图标 |

## 常见问题

### 为什么输入时模型值看起来更新慢？

- 组件内部有 300ms 防抖同步。
- 当 `optimize=true` 时，会更依赖 Enter/Blur 同步最终值。

### 多值输入为什么会自动拆分并去重？

- `multiple` 场景会按 `multipleSplit` 拆分。
- 拆分后会做 `Set` 去重，适合批量粘贴编码场景。

### 清空为什么不是 undefined？

- 清空时组件会写入 `null` 或空值语义，便于后端识别“字段已修改”。

## 特殊使用场景

- 批量导入编码: `multiple + multipleSplit` 处理空格/逗号混输。
- 敏感信息只读展示: `encrypt` 配合只读或禁用态。

