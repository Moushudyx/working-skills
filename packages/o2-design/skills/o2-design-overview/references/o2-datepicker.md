# O2DatePicker 日期选择

O2DatePicker 支持单值、区间、日期时间、周/月面板等模式。

## 示例代码

```tsx
import { O2DatePicker, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({
    date: '',
    startDate: '',
    endDate: '',
  });

  return () => (
    <>
      <O2DatePicker v-model={state.date} datetime />
      <O2DatePicker
        range
        v-model-start={state.startDate}
        v-model-end={state.endDate}
      />
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string \| string[] | - | 单值模式绑定值 |
| datetime | boolean | false | 是否日期时间模式 |
| range | boolean | false | 是否区间模式 |
| start | string | - | 区间开始值 |
| end | string | - | 区间结束值 |
| rangePro | boolean | false | 使用带快捷选项的 RangePicker |
| panel | DatePicker \| MonthPicker \| WeekPicker | DatePicker | 面板类型 |
| format | string | 自动推导 | 日期格式 |
| placeholder | string \| string[] | - | 占位文案 |

说明:

- `range=false` 时使用 `v-model` 绑定 `modelValue`。
- `range=true` 时使用 `v-model-start` 与 `v-model-end` 绑定区间值。

## 常见问题

### range 模式为什么不走 modelValue？

- `range=true` 时使用 `start/end` 双字段绑定。
- 对应事件是 `onUpdateStart/onUpdateEnd`。

### 为什么选中的值格式和预期不同？

- 未传 `format` 时会按组件默认规则推导。
- 需要固定格式请显式传 `format`。

### rangePro 有什么区别？

- `rangePro` 使用 hzero 的 RangePicker 并内置快捷时间范围。

## 特殊使用场景

- 周/月粒度筛选: `panel='WeekPicker'/'MonthPicker'`。
- 报表时间范围: `range + datetime`。
