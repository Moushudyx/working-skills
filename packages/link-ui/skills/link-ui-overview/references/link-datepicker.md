# link-datepicker 日期选择

## 示例代码

```vue
<template>
    <div>
        <link-datepicker v-model="date" />
        <span>{{ date }}</span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            date: null,
        }
    },
}
</script>
```

## 特殊使用场景

### 范围选择

```vue
<link-datepicker :start.sync="start" :end.sync="end" range />
```

### 日期时间

```vue
<link-datepicker v-model="dateTime" datetime />
```

### 周选择

```vue
<link-datepicker :start.sync="weekStart" :end.sync="weekEnd" week />
```

### 值/显示格式分离

```vue
<link-datepicker v-model="val" valueFormat="YYYYMMDD" displayFormat="YYYY年MM月DD日" />
```

## Props 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | String | --- | --- | 双向绑定值 |
| start | String | --- | --- | 范围选择开始值（支持 `.sync`） |
| end | String | --- | --- | 范围选择结束值（支持 `.sync`） |
| max | String | --- | --- | 最大日期 |
| min | String | --- | --- | 最小日期 |
| displayFormat | String | --- | --- | 展示值格式，默认 `YYYY-MM-DD` |
| valueFormat | String | --- | --- | 绑定值格式，默认 `YYYY-MM-DD` |
| datetime | Boolean | --- | --- | 是否启用日期时间选择 |
| range | Boolean | --- | --- | 是否为范围选择 |
| week | Boolean | --- | --- | 是否按周选择 |
| view | String | year, month, date | date | 视图粒度 |
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
| dateType | String | start, end | start | 时间默认补位方式 |
| disabledDate | Function | --- | --- | 自定义禁用日期钩子 |

## 列组件 link-table-column-datepicker

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| start | String | --- | --- | 范围开始值（支持 `.sync`） |
| end | String | --- | --- | 范围结束值（支持 `.sync`） |
| max | String | --- | --- | 最大日期 |
| min | String | --- | --- | 最小日期 |
| displayFormat | String | --- | --- | 显示值格式 |
| valueFormat | String | --- | --- | 绑定值格式 |
| datetime | Boolean | --- | --- | 是否日期时间 |
| range | Boolean | --- | --- | 是否范围选择 |
| view | String | year, month, date | date | 视图粒度 |
| dateType | String | start, end | start | 时间补位方式 |
| disabledDate | Function | --- | --- | 自定义禁用日期钩子 |

## 注意事项

- `max/min` 的格式需与 `valueFormat` 对齐，否则比较结果可能不符合预期。
- `range` 模式下优先使用 `start/end`，单值模式使用 `v-model`。
