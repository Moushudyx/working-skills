# O2Address 地址选择

O2Address 是省市区（含国家）级联选择组件，维护两套值：`value`（编码或 ID）和 `name`（显示名）。

这是一个特殊组件，建议在“省/市/区县”链路上成组使用。

## 示例代码

```tsx
import { O2Address, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({
    formData: {
      countryCode: '',
      countryName: '',
      regionCode: '',
      regionName: '',
      cityCode: '',
      cityName: '',
      districtCode: '',
      districtName: '',
    },
  });

  return () => (
    <>
      <O2Address
        country
        v-model-value={state.formData.countryCode}
        v-model-name={state.formData.countryName}
      />

      <O2Address
        region
        parentValue={state.formData.countryCode}
        v-model-value={state.formData.regionCode}
        v-model-name={state.formData.regionName}
      />

      <O2Address
        city
        parentValue={state.formData.regionCode}
        v-model-value={state.formData.cityCode}
        v-model-name={state.formData.cityName}
      />

      <O2Address
        district
        parentValue={state.formData.cityCode}
        v-model-value={state.formData.districtCode}
        v-model-name={state.formData.districtName}
      />
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | string \| number \| string[] | - | 绑定显示文本 |
| value | string \| number \| (string\|number)[] | - | 绑定值 |
| parentValue | string \| number | - | 父级值 |
| country | boolean | false | 国家选择器 |
| region | boolean | false | 省选择器 |
| city | boolean | false | 市选择器 |
| district | boolean | false | 区县选择器 |
| bindId | boolean | false | 绑定 id（否则绑定 code） |
| queryUrl | string | - | 自定义查询路径 |
| multiple | boolean | false | 是否多选 |

事件:

- `onUpdateName`
- `onUpdateValue`
- `onChange({ name, value })`

## 关键行为说明

- 组件内部按 `country/region/city/district` 决定调用不同地址接口。
- `parentValue` 变化后会重新加载 options。
- 当 `name` 为空但 `value` 有值时，组件会尝试自动翻译并回填 `name`。
- 当某级地址变更时，下级组件会在链路变更场景下清空自身 `name/value`。
- 禁用逻辑默认是：非国家级且 `parentValue` 为空时禁用。

## 常见问题

### 为什么下级地址框是禁用状态？

- 这是默认行为：没有父级值时不可选。
- 检查父级 `parentValue` 是否正确传入。

### 为什么回写的是 code 不是 id？

- 默认绑定 code。
- 需要绑定 id 时设置 `bindId=true`。

### 为什么只传 value 不传 name 会有校验问题？

- 组件支持在 options 加载后自动回填 name。
- 但建议新增行默认值时尽量同时初始化 name/value。

## 特殊使用场景

- 省市区四级联动表单。
- 地址编码和名称双字段分离存储。
- 多选行政区划（`multiple=true`）。

## 版本支持

- `multiple` 多选模式在 `1.9.2` 新增。
- `value` 有值时自动回填 `name` 的能力在 `1.6.67` 增强。
- `queryUrl` 支持国家查询场景在 `1.6.63` 新增。
