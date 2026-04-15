# O2Switch 开关

O2Switch 是值映射型开关组件，默认 true/false 映射为 1/0。

## 示例代码

```tsx
import { O2Switch, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ enabledFlag: 1 });

  return <O2Switch v-model={state.enabledFlag} trueValue={1} falseValue={0} />;
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | any | - | 绑定值 |
| trueValue | any | 1 | 打开态映射值 |
| falseValue | any | 0 | 关闭态映射值 |

说明:

- 继承 choerodon-ui 的 Switch 常用属性。
- 组件通过 `modelValue === trueValue` 判定选中态。

## 常见问题

### 为什么默认不是 true/false？

- O2Switch 默认映射是 `1/0`。
- 布尔场景请显式传 `trueValue/falseValue`。

### 点击开关不生效？

- 检查是否处于只读/禁用态。
- 检查外层 edit 权限是否可编辑。

## 特殊使用场景

- 和后端数值开关字段直接绑定。
- 表格行内启停状态切换。
