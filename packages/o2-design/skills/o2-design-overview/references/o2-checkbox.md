# O2Checkbox 复选框

O2Checkbox 支持单体复选，也支持与 O2CheckboxGroup 组成选项组，内置“全选”能力。

## 示例代码

### 单体模式

```tsx
import { O2Checkbox, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ enabled: true });
  return <O2Checkbox v-model={state.enabled}>是否启用</O2Checkbox>;
});
```

### 组选项模式（含全选）

```tsx
import { O2Checkbox, O2CheckboxGroup, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ roles: ['ADMIN'] as string[] });
  const options = [
    { value: 'ADMIN', label: '管理员' },
    { value: 'USER', label: '普通用户' },
  ];

  return (
    <O2CheckboxGroup v-model={state.roles}>
      <O2Checkbox checkboxForAll>全选</O2Checkbox>
      {options.map((opt) => (
        <O2Checkbox key={opt.value} value={opt.value} label={opt.label} />
      ))}
    </O2CheckboxGroup>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | any | - | 单体模式绑定值 |
| value | any | - | 组选项模式当前项值 |
| label | string | - | 文案 |
| trueValue | any | true | 单体选中值 |
| falseValue | any | false | 单体未选中值 |
| indeterminate | boolean | false | 半选态（单体） |
| checkboxForAll | boolean | false | 在组内作为全选项 |

## 常见问题

### 为什么组选没有 options 属性？

- 与 Radio 一样，组选使用 `Group + 多个 O2Checkbox`。
- 建议用数组 `map` 渲染。

### 全选项为什么会出现半选状态？

- Group 会根据已选数量计算 `checked/uncheck/minus`。
- 这是预期行为，用于提示部分选中。

### 组选值更新异常怎么办？

- 建议初始化为数组（如 `[]`）。
- 避免混入不同类型的 value。

## 特殊使用场景

- 权限点批量选择（组模式）。
- 数值或布尔字段勾选（单体模式）。
