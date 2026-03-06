# link-textarea 文本域

## 示例代码

```vue
<template>
    <div>
        <link-textarea v-model="val" maxlength="30" show-word-limit />
        <link-textarea-input v-model="val" />
    </div>
</template>
<script>
export default {
    data(){
        return {
            val: null,
        }
    },
}
</script>
```

## 特殊使用场景

### 表格列编辑

```vue
<link-auto-table :option="option">
    <link-table-column title="线索ID" field="id"/>
    <link-table-column-textarea title="线索名称" field="name" required/>
</link-auto-table>
```

## Props 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | --- | --- | --- | 双向绑定值 |
| color | String | primary, success, warn, error, info | info | 颜色 |
| width | Number | --- | 200 | 宽度 |
| height | Number | --- | 80 | 高度 |
| long | Boolean | --- | --- | 是否占满宽度 |
| cols | Number | --- | --- | 列数 |
| rows | Number | --- | 4 | 行数 |
| required | Boolean | --- | --- | 是否必填 |
| rules | Array | --- | --- | 校验规则 |
| maxlength | Number | --- | --- | 输入长度限制 |
| showWordLimit | Boolean | --- | --- | 是否显示字数统计 |
| validateOnInit | Boolean | --- | --- | 初始化时是否触发校验 |
| fixWidth | Boolean | --- | false | 是否固定宽度（仍可被用户拖拽调整） |
| fixHeight | Boolean | --- | false | 是否固定高度（仍可被用户拖拽调整） |

## 相关组件

link-textarea-input: 与 link-input 共用值的多行输入形式

link-table-column-textarea: 在 link-auto-table 中提供文本域列编辑
