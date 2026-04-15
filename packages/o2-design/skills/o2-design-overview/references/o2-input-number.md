# O2InputNumber 数字输入

O2InputNumber 用于数字录入，支持单值和范围输入（start/end）。

如果是金额输入，优先使用 `o2-currency.md`。

## 示例代码

```tsx
import { O2InputNumber, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ amount: 0, start: 10, end: 20 });

  return () => (
    <>
      <O2InputNumber v-model={state.amount} min={0} precision={2} style={{ width: 240 }} />
      <O2InputNumber range v-model-start={state.start} v-model-end={state.end} />
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string \| number | - | 单值模式绑定值 |
| range | boolean | false | 是否启用范围模式 |
| start | string \| number | - | 范围开始值 |
| end | string \| number | - | 范围结束值 |
| rangeDivAttrs | object | - | 范围容器属性 |

说明:

- 继承 choerodon-ui/pro NumberField 常用属性。
- 超过 15 位数字时会兼容 BigNumber 返回值并转为普通值。
- `range=true` 时会在失焦后校正 `start > end` 的情况。

## 常见问题

### 为什么范围输入后值被交换了？

- 组件会在 blur 时自动检查区间。
- 当 `start > end` 时会自动修正顺序。

### 为什么出现 c7n 自带校验提示？

- 组件内部已设置 `noValidate` 来避免和业务校验冲突。
- 建议统一使用表单/表格规则做校验提示。

## 特殊使用场景

- 查询区间字段: 用 `range + start/end` 直接绑定查询参数。
- 高精度数字: 配合 `precision`、`step` 控制输入精度。

## 版本支持

- `range` 区间模式更新问题在 `1.9.4` 有修复。
