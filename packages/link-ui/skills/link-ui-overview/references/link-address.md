# link-address 地址选择

地址选择能力由以下部分组成：

- 服务：$lv.$address.pick
- 输入组件：link-address-input
- 列组件：link-table-column-address

## 示例代码

### 服务调用（$lv.$address.pick）

```vue
<link-button ref="button1" @click="useService(['province', 'city', 'district'], 'button1')">
    选择省市县
</link-button>
```

```js
export default {
    data() {
        return {
            param: {
                province: '广东',
                city: '广州市',
                district: '番禺区',
            },
        }
    },
    methods: {
        handleConfirm(val) {
            Object.assign(this.param, val)
        },
        useService(types, refName) {
            this.$lv.$address.pick({
                types,
                param: this.param,
                onConfirm: this.handleConfirm,
                referenceEl: this.$refs[refName],
            })
        },
    },
}
```

### 输入组件（link-address-input）

```vue
<link-address-input
    :types="['district', 'province', 'city']"
    :map="{ province: 'rowProvince', city: 'rowCity', district: 'rowDistrict' }"
    :row="row"
/>
```

## 服务：$lv.$address

### 方法

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| getAddress | --- | 获取地址基础数据（支持并发调用） |
| pick | Object | 打开地址选择弹层 |

### pick 参数

| 属性名称 | 类型 | 说明 |
| --- | --- | --- |
| types | Array | 地址级别组合，如 `['province','city','district']` |
| param | Object | 当前地址对象 |
| onConfirm | Function | 确认后回调 |
| referenceEl | HTMLElement | 定位参考元素 |

## 组件：link-address-input Props

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| row | Object | --- | --- | 绑定的 row 对象 |
| map | Object | --- | --- | row 与 province/city/district 字段映射 |
| types | Array | province/city/district 组合 | --- | 地址级别组合 |
| title | String | --- | --- | 地址弹框标题 |
| placeholder | String | --- | --- | 空值占位符 |
| type | String | line, fill, none | line | 输入框类型 |
| color | String | primary, success, warn, error, info | info | 输入框颜色 |
| size | String | large, default, small | default | 输入框大小 |
| width | Number | --- | 200 | 输入框长度 |
| long | Boolean | --- | --- | 是否占满宽度 |
| hideClearIcon | Boolean | --- | --- | 是否隐藏清除图标 |
| shape | String | fillet, none, round | none | 输入框形状 |
| suffixIcon | String | --- | icon-location | 后置图标 |
| required | Boolean | --- | --- | 是否必填 |
| validateOnInit | Boolean | --- | --- | 初始化时是否校验 |

## 列组件：link-table-column-address Props

| 属性名称 | 类型 | 说明 |
| --- | --- | --- |
| map | Object | row 与 province/city/district 字段映射 |
| types | Array | 地址级别组合 |
| title | String | 地址弹框标题 |

## 特殊使用场景

### 省市县联动清理规则

当 map 中包含低级别字段，且本次 types 只选择高级别时，低级别字段会被清空。

例如：

- `types=['province']` 且 map 含 city/district：会清空 city、district
- `types=['province']` 且 map 不含 city/district：不会清空

## 注意事项

- 推荐统一用同一份 row + map 做多个地址输入框联动，避免字段不同步。
- 表格场景中优先使用 link-table-column-address，减少重复 before/after 逻辑。
