# link-object 对象选择（Picklist）

对象选择能力由以下部分组成：

- 服务：$object.pick
- 输入组件：link-object-input
- 列组件：link-table-column-object

核心前提：`option` 必须是 AutoOption，且需要通过 `render(h)` 或 JSX 配置列。

## 示例代码

### 服务调用（$object.pick）

```vue
<link-button label="选择" @click="handlePick" />
```

```js
export default {
    data() {
        return {
            option: new AutoOption({
                context: this,
                module: 'link/clue',
                render(h) {
                    return h('div', {}, [
                        h('link-table-column', {props: {field: 'id', title: '线索编号'}}),
                        h('link-table-column-input', {props: {field: 'name', title: '线索名称'}}),
                    ])
                },
            }),
        }
    },
    methods: {
        handlePick() {
            this.$object.pick({
                option: this.option,
                onConfirm: (ret) => this.$msg.show(ret.name),
                onCancel: () => this.$msg.show('cancel'),
            })
        },
    },
}
```

### 输入组件（link-object-input）

```vue
<link-object-input
    :option="acctOption"
    :row="formData"
    show-key="name"
    :map="{ name: 'firstName', acctId: 'id' }"
    :beforeSelect="beforeSelect"
    :afterSelect="afterSelect"
/>
```

## 服务：$object.pick

### 参数

| 属性名称 | 类型 | 说明 |
| --- | --- | --- |
| option | AutoOption | 必填，选择列表配置 |
| onConfirm | Function | 点击确认回调，参数为选中结果 |
| onCancel | Function | 点击取消回调 |
| dialog | Object | 弹框配置（宽度、按钮显隐、前置校验等） |

### dialog 常用子参数

| 属性名称 | 类型 | 说明 |
| --- | --- | --- |
| width | Number | 弹框宽度 |
| confirmButton | Boolean | 是否显示确认按钮 |
| cancelButton | Boolean | 是否显示取消按钮 |
| beforeConfirmHandler | Function | 确认前置动作，`Promise.reject` 可阻止确认 |
| beforeCancelHandler | Function | 取消前置动作，`Promise.reject` 可阻止取消 |

## 组件：link-object-input Props

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| option | AutoOption | --- | --- | 必填，AutoOption 配置 |
| row | Object | --- | --- | 绑定对象 |
| map | Object | --- | --- | 字段映射，key=row 字段，value=选择结果字段 |
| showKey | String | --- | --- | 输入框展示字段（来自 row） |
| onConfirm | Function | --- | --- | 自定义确认动作 |
| onCancel | Function | --- | --- | 自定义取消动作 |
| onComplete | Function | --- | --- | 选择完毕动作 |
| beforeSelect | Function | --- | --- | 打开前置动作，reject 可阻止打开 |
| afterSelect | Function | --- | --- | 选择后置动作 |
| type | String | line, fill, none | line | 输入框类型 |
| color | String | primary, success, warn, error, info | primary | 输入框颜色 |
| size | String | large, default, small | default | 输入框大小 |
| shape | String | round, none, fillet | none | 输入框形状 |
| long | Boolean | --- | --- | 是否占满一行 |
| prefixIcon | String | --- | --- | 前置图标 |
| suffixIcon | String | --- | --- | 后置图标 |
| placeholder | String | --- | --- | 空值占位符 |
| width | Number | --- | 200 | 输入框宽度 |
| hideClearIcon | Boolean | --- | --- | 是否隐藏清除图标 |
| required | Boolean | --- | --- | 是否必填 |
| validateOnInit | Boolean | --- | --- | 初始化时是否触发校验 |

## 列组件：link-table-column-object

常用参数与 link-object-input 一致，重点关注以下组合：

- option
- map
- showKey
- beforeSelect
- afterSelect

## 特殊使用场景

### 场景：link-table-column-object 打开前按当前行动态改查询参数

```js
beforeSelect({ row, option }) {
    if (row.addrType == null) {
        return Promise.reject({ message: '请先选择类型!' })
    }
    option.param.attr2 = row.addrType
}
```

## 注意事项

- `map` 决定回写行为，建议始终显式配置。
- 需要阻止打开/确认/取消时，统一使用 `Promise.reject`。
- `option` 里的 `render` 是必备能力，推荐在业务工程中用 JSX 提高可读性。
