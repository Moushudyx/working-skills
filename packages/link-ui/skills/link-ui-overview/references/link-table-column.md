# 列组件 link-table-column-*

一般作为 link-auto-table 的子组件使用, 可以参考 references/link-table.md 中的相关说明

## 常用列

其中 普通列 组件没有编辑态, 查询时则视为文本列

| 说明 | 列名 |
| ---|---| 
| 普通列 | link-table-column |
| 文本框输入 | link-table-column-input |
| 文本域输入 | link-table-column-textarea |
| 地址选择 | link-table-column-address |
| 复选按钮 | link-table-column-checkbox |
| 开关按钮 | link-table-column-toggle |
| 日期选择 | link-table-column-datepicker |
| 时间选择 | link-table-column-timepicker |
| 图片列 | link-table-column-img |
| 数字输入框 | link-table-column-input-number |
| 值列表 | link-table-column-lov |
| mvg选择 | link-table-column-mvg |
| object选择（picklist列） | link-table-column-object |
| 下拉选择 | link-table-column-select |

## 不常用列

这些列一般不会手动使用, 而是由列表组件自行渲染

|说明|列名|
|---|---|
| 索引列 | link-table-column-index |
| 多选列 | link-table-column-check |
| 设置主要记录列 | link-table-column-radio |
| 排序列 | link-table-column-draggier |
| 操作列 | link-table-column-operate |

## 公共属性 Props

所有的列组件都具备link-table-column的列属性；

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| title | String | --- | --- | 必填, 列标题 |
| field | String | --- | 必填, 列关联字段 |
| searchField | String | --- | 列上绑定需要查询的字段，为了满足一些字段加密，使用非加密字段查询逻辑 |
| align | String | --- | --- | 非编辑状态下文本对其方式, 会被 auto-fill 覆盖 |
| width | String,Number | --- | 120px | 列宽, 会被 auto-fill 覆盖 |
| autoFill | String | --- | --- | 列展示规范化, 具体使用参考 references/link-table-auto-fill.md |
| fit | Boolean | --- | --- | 列宽自动填充权重 |
| order | Number | --- | --- | 列排序，序号越高越靠前 |
| fixed | String | left，right | --- | 列固定位置 |
| search | Boolean | --- | --- | 列是否可搜索 |
| sort | Boolean | --- | --- | 列是否可排序 |
| filterOrder | Boolean | --- | --- | 筛选的时候的排序位置 |
| quickFilter | Boolean | --- | --- | 是否需要快速筛选(只对值列表列(lov)有效) |
| formFilter | Boolean | --- | --- | 是否需要表单筛选 |
| columnFilter | Boolean | --- | true | 是否启用列筛选功能 |
| exactQuery | Boolean | --- | false | 文本查询的时候，是否为精确查询，否则为模糊查询 |
| filterName | String | --- | input | 筛选栏筛选组件类型:date,time,number,input |
| filterOption | Object | --- | --- | 筛选参数 |
| disableColumnFilterCheck | Boolean | --- | null | 是否禁用字段列(lov无效)筛选的多选功能，AutoOption有一个同名的属性可以用来设置所有列（除了lov字段） |
| disableColumnFilterCheckAll | Boolean | --- | null | 是否禁用字段列(lov无效)筛选多选中的【全部】时间范围筛选参数，AutoOption有一个同名的属性可以用来设置所有列（除了lov字段） |
| placeLeft | Boolean | --- | --- | 当出现左滚动列的时候，是否自动设置为左固定列 |
| placeRight | Boolean | --- | --- | 当出现右滚动列的时候，是否自动设置为右固定列 |
| decimal | Number | --- | 0 | 导出精度（导出小数点后几位）需要配合后端一起使用 仅供数字列使用 |
| editable | Boolean | --- | --- | 列是否可编辑 |
| hide | Boolean | --- | --- | 是否隐藏 |
| moreColumn | Boolean | --- | false | 更多列功能 |
| disabledConfig | Boolean | --- | --- | 禁止配置该列 |
| disabledFormEdit | Boolean | --- | --- | 禁止在form表单中编辑 |
| disabledBatchModify | Boolean | --- | --- | 禁止批量修改 |

| dataType | String | --- | --- | 数据格式化方式:tel,cny,money,percent |
| tooltip | Boolean | --- | --- | 列在非编辑状态下是否需要tooltip提示 |
| link | Boolean | --- | --- | 是否以超链接的形式展示文本，并且点击的时候会触发事件 |
| clickWhenInEditable | Boolean | --- | --- | 只有非编辑状态下才能出发点击事件，否则任何状态都会触发点击事件 |
| showInDialog | Boolean | --- | --- | 非编辑状态下，点击打开弹框显示列内容 |
| tip | String | --- | --- | 显示一个提示图标，tooltip显示提示信息 |
| formatter(val,{showRow,rowIndex}) | Function | --- | --- | 数据自定义格式化函数，支持异步格式化 |

| required | Boolean | --- | --- | 是否必输 |
| rules | Array,String  | --- | --- | 校验规则数组 详细请参考 references/link-form-validate.md |
| validateOnInit | Boolean | --- | false | 列编辑状态下，是否初始化的时候校验 |
| editableFunc({row,editRow,rowIndex,field}) | Function | --- | --- | 是否可编辑判断函数, 参数: row原始默认数据，editRow编辑后数据，rowIndex当前行下标，field当前行field值; 注意，禁止此函数内修改row和editRow数据内容 |
| requiredFunc({row,editRow,rowIndex,field}) | Function | --- | --- | 是否必输判断函数, 参数: row原始默认数据，editRow编辑后数据，rowIndex当前行下标，field当前行field值; 注意，禁止此函数内修改row和editRow数据内容 |
| columnStyleFunc() | Function | --- | --- | 列单元格自定义样式钩子函数 |
| moreColumn | Boolean | --- | --- | 是否初始化显示这个字段 用于配合表格【显示更多列】功能使用 与hide属性不是同一功能 |

## 作用域插槽 自定义列内容

```html
<link-table-column field="id" title="编号" link>
    <template slot-scope="{row,rowIndex,editRow,field,editable,col,colIndex,showRow,fixedRow}">
        <el-button @click="handleClick(row)"/>
    </template>
</link-table-column>
```

作用域插槽中的参数:

- row: 行对象数据
- rowIndex: 行索引（StaticTable中无效，因为做了虚拟分页，不是真实的行索引，需要调用StaticTable的方法转换索引）
- editRow: 编辑行对象数据
- field: 列所绑定的字段，设置required时，会判断该字段是否为空
- editable: 该单元格是否可编辑
- col: 列对象信息
- colIndex: 列对象索引（第几列）
- showRow: 当前使用的行对象数据（该行编辑状态下，注意是行而不是单元格，为editRow，否则为row）
- fixedRow: 当前行是否为固定行

## 渲染函数 自定义列内容

### JSX的方式: 

```jsx
render(h) {
    return (
        <div>
            <link-table-column-input title="商机名称" field="optyName" {...{
                scopedSlots: {
                    default: ({row, rowIndex}) => {
                        return (<div>[{rowIndex},{row.optyName}]</div>)
                    },
                    title: ({col}) => {
                        return (<div>[{col.title}]</div>)
                    }
                }
            }}/>
            <link-table-column title="商机编码" field="id"/>
            <link-table-column-datepicker title="创建时间" field="created"/>
            <link-table-column-lov title="商机阶段" field="stage" lovType="OPTY_STAGE"/>
            <link-table-column-datepicker title="商机收集时间" field="optyDt"/>
        </div>
    )
},
```

### 原生vue渲染函数写法: 

```js
render(h) {
    return h('div', {}, [
        h('link-table-column-input', {
            props: {
                title: '商机名称', field: 'optyName',
            },
            scopedSlots: {
                default({row, rowIndex}) {
                    return h('div', {domProps: {innerHTML: `[${rowIndex},${row.optyName}]`}})
                },
                title({col}) {
                    return h('div', {domProps: {innerHTML: `[${col.title}]`}})
                },
            }
        }),
        h('link-table-column', {props: {title: '商机编码', field: 'id'}}),
        h('link-table-column-datepicker', {props: {title: '创建时间', field: 'created'}}),
        h('link-table-column-lov', {props: {title: '商机阶段', field: 'stage', lovType: 'OPTY_STAGE'}}),
        h('link-table-column-datepicker', {props: {title: '商机收集时间', field: 'optyDt'}}),
    ])
},
```
