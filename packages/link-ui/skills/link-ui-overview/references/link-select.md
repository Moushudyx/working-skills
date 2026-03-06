# link-select 下拉选择

## 示例代码

```vue
<template>
    <div>
        <link-select
            v-model="val"
            :data="list"
            labelKey="name"
            valKey="val"
        />
        <span>{{ val }}</span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            val: null,
            list: [
                { name: '牛肉脯', val: '1' },
                { name: '猪肉脯', val: '1_1' },
                { name: '牛肉干', val: '1_2' },
            ],
        }
    },
}
</script>
```

## 事件

| 事件名称 | 说明 |
| --- | --- |
| select | 选中值变化后触发 |

## 特殊使用场景

### 多选

```vue
<link-select v-model="vals" :data="list" labelKey="name" valKey="val" multiple />
```

### 联动下拉 + 打开前校验

```vue
<link-select v-model="parentVal" :data="parentList" @select="handleParentSelect" />
<link-select v-model="childVal" :data="childList" :beforeSelect="handleBeforeSelect" />
```

## Props 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | --- | --- | --- | 双向绑定值 |
| height | Number | --- | --- | 下拉框高度，`null` 表示自适应 |
| data | Array, Function | --- | --- | 选项数组，可为异步函数 |
| valKey | String | --- | --- | 值字段名 |
| labelKey | String | --- | --- | 显示字段名 |
| beforeSelect | Function | --- | --- | 展开前置动作，可返回 Promise 拦截 |
| afterSelect | Function | --- | --- | 展开后置动作 |
| multiple | Boolean | --- | --- | 是否多选 |
| displayFormat | Function | --- | --- | 显示值格式化 |
| filterable | Boolean | --- | --- | 是否可输入筛选 |
| disabledHideOnClickOutside | Boolean | --- | --- | 是否禁用点击外部自动关闭 |
| disabledDestroyOnHide | Boolean | --- | --- | 是否禁用关闭后销毁下拉内容 |
| disabledEqual | Boolean | --- | --- | 是否禁用下拉宽度对齐目标元素 |
| showValueWhenNoMatch | Boolean | --- | --- | 无匹配项时是否显示原值 |
| type | String | line, fill, none | fill | 输入框类型 |
| color | String | primary, success, warn, error, info | info | 颜色 |
| size | String | large, default, small | default | 大小 |
| shape | String | round, none, fillet | none | 输入框形状 |
| long | Boolean | --- | --- | 是否占满一行 |
| prefixIcon | String | --- | --- | 前置图标 |
| placeholder | String | --- | 选择日期... | 空值占位符 |
| width | Number | --- | 200 | 输入框宽度 |
| focusOnHover | Boolean | --- | --- | 悬浮时是否自动获取焦点 |
| hideClearIcon | Boolean | --- | --- | 是否隐藏清除图标 |
| required | Boolean | --- | --- | 是否必填 |
| validateOnInit | Boolean | --- | --- | 初始化时是否触发校验 |

## 列组件 link-table-column-select

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| data | Array, Function | --- | --- | 选项数组，可为异步函数 |
| valKey | String | --- | --- | 值字段名 |
| labelKey | String | --- | --- | 显示字段名 |
| beforeSelect | Function | --- | --- | 展开前置动作 |
| afterSelect | Function | --- | --- | 展开后置动作 |
| multiple | Boolean | --- | --- | 是否多选 |

## 注意事项

- 联动场景中，父选择变化后建议主动清空子选择值，避免旧值残留。
- `beforeSelect` 返回 `Promise.reject` 可以阻止下拉展开。
