---
name: o2-global-config
description: O2 Design 全局配置的作用域与常见配置项
---

# 作用

全局配置是通过特殊的 `provide/inject` 为后代组件提供默认行为与样式配置。

# 常见配置项

- 表格：`tableRowCommonProps`、`tableCommonColumnProps`
- 表单：`formCommonItemProps`、`formCommonNativeProps`
- 其他：`filterInheritGlobalFormCommonProps`、`adjustIntlFieldMaxLengthMap`

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormInput, O2FormIntlField, useGlobalConfig } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { value: null, multi: null } });

  useGlobalConfig({
    adjustIntlFieldMaxLengthMap: ({ maxLength, maxLengthMap }) => {
      return maxLength ? { en_US: +maxLength * 3, ...maxLengthMap } : undefined;
    },
    formCommonItemProps: {
      tooltip: ({ value, props }) => `${props.label}：${value}`,
    },
  });

  return () => (
    <O2Form formData={state.formData}>
      <O2FormInput field="value" label="值" />
      <O2FormIntlField field="multi" label="多语言" maxLength={3} showLengthInfo component="textarea" />
    </O2Form>
  );
});
```

# 要点

- 作用域仅覆盖当前组件及其后代。
- 适合统一 Tooltip、表单组件默认属性等。
