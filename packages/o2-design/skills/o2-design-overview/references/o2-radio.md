# O2Radio 单选框

O2Radio 支持单个开关式单选，也支持与 O2RadioGroup 组成选项组。

## 示例代码

### 单体模式（trueValue/falseValue）

```tsx
import { O2Radio, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ enabled: 1 });
  return <O2Radio v-model={state.enabled} trueValue={1} falseValue={0}>启用</O2Radio>;
});
```

### 组选项模式（推荐）

```tsx
import { O2Radio, O2RadioGroup, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ level: 'A' });
  const options = [
    { value: 'A', label: 'A级' },
    { value: 'B', label: 'B级' },
  ];

  return (
    <O2RadioGroup v-model={state.level}>
      {options.map((opt) => (
        <O2Radio key={opt.value} value={opt.value} label={opt.label} />
      ))}
    </O2RadioGroup>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | any | - | 单体模式绑定值 |
| value | any | - | 组选项模式下当前项值 |
| label | string | - | 文案 |
| trueValue | any | true | 单体选中值 |
| falseValue | any | false | 单体未选中值 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义文案 |

## 常见问题

### 为什么没有 options 属性？

- O2Radio 组选是通过 `O2RadioGroup + 多个 O2Radio` 实现。
- 选项数组一般用 `map` 渲染。

### 组选中判断有什么坑？

- Group 内部使用宽松相等比较（`==`）。
- 建议保持 value 类型一致，避免隐式转换问题。

## 特殊使用场景

- 详情页状态单选组。
- 轻量开关布尔映射（单体模式）。
