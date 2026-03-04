# link-lov 值列表相关组件

值列表是 link 中的概念, 根据指定的 lov 编码显示一个可选择的值列表

- 值列表类型 - 一个编码
- 独立源代码 - 内部存的数据, 一般是英文
- 显示值 - 给用户看的, 一般是中文
- 父值列表 - 某些值列表是有层级关系的, 父值列表的选择会影响子值列表的内容

## 单独使用时选择 link-lov-select

```vue
<!-- 单个值列表标准写法, 渲染为一个下拉框 -->
<link-lov-select lov-type="编码" v-model="绑定值"></link-lov-select>

<!-- 父值列表 -->
<link-lov-select lov-type="父级值列表编码" v-model="父级值"></link-lov-select>
<!-- 子值列表 -->
<link-lov-select lov-type="子级值列表编码" :parent-lov-type="父级值列表编码" :parent-lov-value="父级值" v-model="子级值"></link-lov-select>

<!-- 排除指定项 排除项需填写独立源代码 -->
<link-lov-select lov-type="编码" v-model="绑定值" :disabled-lov="['排除项1', '排除项2']"></link-lov-select>
```

### 参数 Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| lov-type | 值列表类型 | String | – | – |
| parent-lov-type | 父值列表类型, 指定该项限定可选值 | String | – | – |
| parent-lov-value | 父值列表独立源代码 | String | – | – |
| excludeLov | 排除的独立源代码 | Array | – | [] |
| disabledLov | 禁用的独立源代码 | Array | – | [] |
| multiple | 是否为复选框多选 | Boolean | true/false | false |
| beforeSelect | 打开下拉选择器前触发的钩子函数, 如果希望阻止打开下拉框, 则return Promise.reject | Function | - | - |
| afterSelect | 选择完毕之后触发的钩子函数 | Function | - | - |
| filterable | 是否可以输入筛选 | Boolean | true/false | false |

`excludeLov` 和 `disabledLov` 的区别在于, 前者是直接从选项中排除掉(对应的选项无法正常翻译), 而后者是将选项禁用掉(用户可以看到但无法选择, 对应的选项可以正常翻译)

## 变体

link-radio-lov, 渲染为单选或多选单选框组, 没有 filterable 参数

```
<link-form-item prop="ruleType" label="规则类型" required>
    <link-radio-lov lov-type="PCY_RULE_TYPE" v-model="rule.ruleType" @change="onRuleTypeChange"/>
</link-form-item>
```

link-lov-text, 渲染为只读文本, 不可选择, 仅有 type、val 两个参数

```
<link-lov-text type="值列表类型" :val="item.XXX"/>
```

### 列表中使用

link-table-column-lov, 在表格中使用的值列表渲染组件, 可以用 lovTypeFunc 根据行数据动态返回 lov-type, 可以传入异步函数

详细信息(所有的列组件名称、属性等)参考 references/link-table-column.md 中的说明

```vue
<template>
    <link-table :columns="columns" :data="data"/>
        <!-- title 列名称, 展示在表头 -->
        <!-- field 列使用的字段编码 -->
        <!-- auto-fill 控制列宽度, lov 字段一般使用 TYPE -->
        <!-- lov-type 值列表类型 -->
        <link-table-column-lov title="业务年度" field="busiYear" auto-fill="TYPE" lov-type="BUSINESS_YEAR_TYPE" />
        <link-table-column-lov title="政策大类" field="majorType" auto-fill="TYPE" lov-type="PCY_MAJOR_TYPE_NEW" />
        <!-- quickFilter 会在列表的查询表单区域渲染一排多选框, 可以快速勾选 -->
        <link-table-column-lov title="政策类型" field="pcyType" auto-fill="TYPE" lov-type="PCY_TYPE" quickFilter />
        <link-table-column-lov title="政策子类型" field="subType" auto-fill="TYPE" lov-type="PCY_SUB_TYPE_NEW" />
      </link-auto-table>
</template>
```
