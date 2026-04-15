# O2Currency 货币输入

O2Currency 用于金额输入与金额文本展示，底层基于 choerodon-ui/pro Currency。

## 示例代码

```tsx
import { O2Currency, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ price: 12345.67 });

  return () => (
    <>
      <O2Currency v-model={state.price} currency="CNY" precision={2} style={{ width: 240 }} />
      <O2Currency modelValue={state.price} currency="CNY" textOnly precision={2} />
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string \| number | - | 绑定值 |
| currency | string | - | 币种编码 |
| renderer | Function | - | 自定义展示渲染 |
| textOnly | boolean | false | 仅渲染格式化文本，不渲染输入框 |

说明:

- 继承 NumberField 常用属性。
- `textOnly=true` 适合详情页纯展示场景。
- 格式化会结合当前语言和 `precision`。

## 常见问题

### 为什么展示格式和后端值不同？

- 组件展示的是格式化文本，提交值仍是原始数字。
- 建议展示和提交分离处理。

### textOnly 下为什么不能编辑？

- `textOnly` 设计就是只读展示。
- 可编辑场景请关闭 `textOnly`。

## 特殊使用场景

- 列表金额展示: `textOnly + precision`。
- 多币种页面: 动态传入 `currency`。
