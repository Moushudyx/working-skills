---
name: o2-address
description: O2Address 地址选择组件
---

# 基本用法

```jsx
import { designPage, reactive, O2Form, O2FormItem, O2Address } from 'o2-design';

export default designPage(() => {
  const state = reactive({
    formData: { countryName: '', countryCode: '' },
  });

  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="国家" field="countryName">
        {/* 地址选择 */}
        <O2Address
          country
          bindId={false}
          v-model-name={state.formData.countryName}
          v-model-value={state.formData.countryCode}
        />
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- 省市区等层级通过 `region/city/district` 属性切换。
- 子级地址通常需要传 `parentValue`。
- 表单中推荐使用 `O2FormAddress` 变体。
