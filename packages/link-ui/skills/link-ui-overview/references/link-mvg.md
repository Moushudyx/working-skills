# link-mvg 多对多选择（MVG）

MVG 能力由以下部分组成：

- 服务：$mvg.pick
- 输入组件：link-mvg-input
- 列组件：link-table-column-mvg

## 与旧组件 lnk-mvg 的关系

- link-mvg 是基于旧组件 lnk-mvg 的封装层。
- `$mvg.pick` 的 option 字段与 lnk-mvg 参数高度对应。
- 新业务建议优先使用 link-mvg 体系，不再直接渲染 lnk-mvg。

## 示例代码

### 服务调用（$mvg.pick）

```vue
<link-button @click="pickMainPostn">选择主要职位</link-button>
```

```js
export default {
    data() {
        return {
            postnMvgOption: {
                title: '选择主要职位',
                mvgParentId: '17177956560404480',
                mvgName: 'userPostn',
                leftTableOptions: { fields: [{ field: 'postnName', name: '职位名称' }] },
                rightTableOptions: { fields: [{ field: 'postnName', name: '职位名称' }] },
                change: (changeObj) => console.log(changeObj),
            },
        }
    },
    methods: {
        pickMainPostn() {
            this.$mvg.pick(this.postnMvgOption)
        },
    },
}
```

### 输入组件（link-mvg-input）

```vue
<link-mvg-input
    :option="postnMvgOption"
    :row="postnRow"
    show-key="postnName"
    :map="{ postnName: 'postnName', postnId: 'id' }"
    :beforeSelect="beforeSelect"
    :afterSelect="afterSelect"
/>
```

## 服务：$mvg.pick option

| 属性名称 | 类型 | 说明 |
| --- | --- | --- |
| title | String | 弹框标题 |
| mvgName | String | MVG 名称（后端定义） |
| mvgService | String | 后端服务名，默认 base |
| mvgParentId | String | 主对象 id（必填） |
| leftTableOptions | Object | 左侧列表配置 |
| rightTableOptions | Object | 右侧列表配置 |
| change | Function | 结果变化回调（常见于旧代码） |

## 组件：link-mvg-input Props

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| option | Object | --- | --- | `$mvg.pick` 所需 option |
| mvgParentIdKey | String | --- | --- | 从 row 读取并覆盖 `option.mvgParentId` |
| row | Object | --- | --- | 绑定对象 |
| map | Object | --- | --- | 主要记录回写映射 |
| showKey | String | --- | --- | 展示字段 |
| beforeSelect | Function | --- | --- | 打开前置动作 |
| afterSelect | Function | --- | --- | 打开后置动作 |
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

## 列组件：link-table-column-mvg

常用参数与 link-mvg-input 基本一致，重点是：

- option
- map
- showKey
- beforeSelect

## 特殊使用场景

### 场景：link-table-column-mvg 按当前行动态补查询参数

该场景实现方式与对象选择列一致：在 `beforeSelect({ row, option })` 中校验 row 字段，并写入 option 的查询参数。

## 注意事项

- MVG 数据依赖后端关系表，测试请使用可回收测试数据，避免污染正式数据。
- 出现“重新打开后主要记录不正确”时，优先检查 `mvgParentId` 是否指向真实存在且匹配的数据。
- 历史遗留代码若直接使用 lnk-mvg，可逐步迁移到 `$mvg + link-mvg-input/link-table-column-mvg`。
