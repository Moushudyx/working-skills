---
name: link-table
description: link 中的列表组件, 功能很多但也很复杂, 列表页、详情页都有用到
metadata:
  author: moushu
---

最常用的是 link-auto-table 组件，支持分页、排序、筛选等功能

```vue
<template>
<link-auto-table :option="chargersOption">
    <!-- title 表示列标题，field 表示字段名(取值) -->
    <link-table-column-input title="线索ID" field="id"/>
    <!-- formFilter 表示展示在表格顶部的查询表单里 -->
    <link-table-column-input title="线索编号" field="code" fixed="left" formFilter/>
    <!-- fixed 则是固定列，data-type 控制展示格式，required 控制编辑时的必填校验 -->
    <!-- tooltip 表示鼠标悬浮提示，rules 则是额外的编辑时校验规则 -->
    <link-table-column-input title="线索名称" field="name" fixed="left" data-type="operate" required tooltip width="80px" formFilter rules="length:{max:10,min:5}"/>
    <!-- link-table-column-address 是展示地址用的列组件 -->
    <link-table-column-address title="省" field="province" :types="['province']" :map="{province:'province',city:'city',district:'district'}" formFilter/>
    <link-table-column-address title="市" field="city" :types="['city']" :map="{province:'province',city:'city',district:'district'}" formFilter/>
    <link-table-column-address title="区/县" field="district" :types="['district']" :map="{province:'province',city:'city',district:'district'}" formFilter/>
    <link-table-column-input title="地址" field="address" formFilter/>
    <!-- disabledBatchModify 表示这个字段是否禁用批量修改 -->
    <link-table-column-input title="联系人" field="contactName" formFilter :disabledBatchModify="isContractFieldDisabledBatchModify"/>
    <link-table-column-input-number title="电话" field="mobilePhone" data-type="tel" formFilter/>
    <!-- link-table-column-lov 是展示值列表用的列组件 -->
    <!-- editable 控制是否可编辑 -->
    <link-table-column-lov title="跟进状态" field="followStatus" lov-type="CLUE_FOLLOW_STATUS" :editable="false" formFilter/>
    <link-table-column-checkbox title="公司名称" field="companyName"/>
    <!-- link-table-column-object 是展示 picklist 用的列组件，编辑时会渲染一个 picklist 输入框，点击打开弹框勾选数据 -->
    <link-table-column-object title="组织" field="orgName" :option="orgOption" showKey="orgName" :map="{orgName: 'text',orgId: 'id'}" formFilter/>
    <link-table-column-input-number title="价格" field="price" :min="0" data-type="cny" formFilter/>
    <!-- link-table-column-datepicker 展示时间的列组件 -->
    <link-table-column-datepicker title="创建时间" field="created" :editable="false" formFilter/>
    <!-- link-table-column-operator 是操作列组件，通常放在最后 -->
    <link-table-column-operator title="操作" fixed="right" align="center" width="1-button" :sort="false">
        <template slot-scope="{row,rowIndex}">
            <link-button label="预览" @click="logData(row,rowIndex)"/>
        </template>
    </link-table-column-operator>
</link-auto-table>
</template>
<script>
export default {
    data(){
        return {
            chargersOption: new AutoOption({
                context: this, // 没有特殊情况请保持这一行不变
                module: 'link/clue', // 模块名称，根据这个名称来请求对应的接口
                beforeCancel(status) {
                    console.log('取消编辑',status)
                },
            }),
            // 这个 option 用于 picklist，也就是弹框选择，所以配置了 render 方法来定义弹框内的表格列
            orgOption:new AutoOption({
                context:this, // 没有特殊情况请保持这一行不变
                queryByExamplePage: 'link/organization/picklist', // 查询接口，如果配置了 module 的话，可以不配置这个参数，默认是 `${module}/queryByExamplePage` 如有不同则用这个参数覆盖
                // 弹框内的表格列定义
                render(h){
                    // 这里可以写 JSX
                    return h('div',{},[
                        h('link-table-column',{props:{title:'组织编码',field:'orgCode'}}),
                        h('link-table-column',{props:{title:'组织名称',field:'text'}}),
                    ])
                },
            })
        }
    },
    methods:{
        // 示例代码
        /*判断联系人字段是否可以批量修改*/
        isContractFieldDisabledBatchModify(selectNodes) {
            const selectRows = selectNodes.map(i => i.row)
            /*只要有一条数据的跟进状态不是【已完成】，就禁用批量修改这个字段*/
            const invalid = selectRows.find(i => i.followStatus !== 'success')
            console.log({invalid})
            return !!invalid
        },
        logData(row,rowIndex){
            console.log({
                row:{...row},rowIndex,
                selectRow:{...this.chargersOption.selectRow}
            })
        },
    },
}
</script>
```

link-auto-table 默认存在三个外观不同的查询功能，一个是列表左上角的查询（筛选栏），由 search 参数控制，可以用 filterName 控制在 date,time,number,input 四种类型中；一个是表格顶部的查询表单，由 formFilter 控制；还有一个是表头的筛选与排序（两部分组成，一个是上下箭头点击更改列表排序，一个是点击表头文字部分弹框，里面是所有可选的值，可以勾选并查询），由 sort 控制

## 父子表

```vue
<template>
<link-auto-table :option="duty">
    <link-table-column title="编号" field="id"/>
    <link-table-column-input required title="职责名称" field="name"/>
</link-auto-table>
<link-auto-table :option="dutyOfMenu">
    <link-table-column title="编号" field="id"/>
    <link-table-column-input title="菜单名称" field="text"/>
</link-auto-table>
<link-auto-table :option="subMenuDutySelect">
    <link-table-column title="编号" field="id"/>
    <link-table-column-input title="菜单名称" field="text"/>
</link-auto-table>
</template>
<script>
export default {
    name: "demo-table-cascade",
    data() {
        const duty = new AutoOption({
            title: '职责',
            context: this,
            module: 'link/duty',
            queryByExamplePage: 'link/duty/queryDutyListPage',
            insert: 'link/duty/upsert',
            update: 'link/duty/upsert',
            searchField: 'name',
            insertable: false,
            updateable: false,
            deleteable: false,
            defaultNewRow: {
                platformType: 'CRM'
            }
        })
        const dutyOfMenu = new AutoOption({
            title: '菜单',
            context: this,
            module: 'link/duty',
            queryByExamplePage: 'link/duty/dutyOfMenuList',
            insert: 'link/duty/addMenuOfDuty',
            update: 'link/duty/updateMenuOfDuty',
            deleteById: 'link/duty/delMenuOfDuty',
            insertable: false,
            updateable: false,
            deleteable: false,
            parentOption: duty, // 父级表的 option
            map: {dutyId: 'id'}, // 父子表关联字段映射，key 是子表字段，value 是父表字段
            searchField: 'text'
            // param: {filtersRaw: [{property: "dutyId", value: "16121625011290112"}]},
        })
        const subMenuDutySelect = new AutoOption({
            title: '安全性菜单列表',
            context: this,
            module: 'link/duty',
            queryByExamplePage: 'link/duty/subMenuDutySelect',
            insert: 'link/duty/addMenuOfDuty',
            update: 'link/duty/updateMenuOfDuty',
            deleteById: 'link/duty/delMenuOfDuty',
            insertable: false,
            updateable: false,
            deleteable: false,
            parentOption: dutyOfMenu, // 同上，多级父子表写法没有区别
            map: {parentMenuId: 'attr1', dutyId: 'dutyId'},
            searchField: 'text'
        })

        return {
            duty,
            dutyOfMenu,
            subMenuDutySelect,
        }
    },
}
</script>
```

注意父表查询完成后，子表才会进行查询

## AutoOption 对象

new AutoOption({}) 可以生成一个用于 link-auto-table 的 tableOption

AutoOption 中常用的参数：

```js
const tableOption = new AutoOption({
    context: this, // 必填, 需传入 VueComponent, AutoOption所属的上下文，在触发AutoOption中配置的事件时会作为this传入事件函数中，一般情况下请保持 this 不变
    indexing: true, // 自动添加索引列 默认为 true
    title: '标题', // 表格标题, 没有则不显示标题, 一般页面上只有一个列表时会用这个
    showNum: 10, // 设置表格高度，显示的行数，超过会展示纵向滚动条, 默认为 10, 一页多个列表时想把列表设置得矮一点可以将这项设为 5
    fill: false, // 是否自动填满父元素, 默认 false, 设为 true 时不用设置 showNum
    bodyRowHeight: 32, // 行高（不加px）, 一般不需要配置
    selectCache: true, // 表格翻页时是否缓存上一页的选中结果, 默认 false
    sortField: 'created', // 排序字段, 默认以数据创建时间字段进行排序
    sortDesc: true, // 排序方式，先序还是降序，默认为降序
    searchField: 'text', // 默认搜索列字段
    singleSelect: false, // 是否单选（只适用于对象选择框）
    render: null, // 渲染表格内容的渲染函数
    sizeOption: [5, 10, 20], // 分页查询页大小配置项, 默认 [10,20,50,100]
    fixedRowText: '合计', // 固定行，索引列显示文本，默认为【合计】
    availablePageNum: 3, // 分页栏可见页数，默认是3，表示左右两边最多显示三个页按钮
    formEditLabelWidth: 'auto', // 表单编辑时，表单项文本宽度，默认值为auto，表示自动计算label宽度，以表单项中label最大的为准
    parentOption: XXXoption, // 父表option, 父子表结构中子表需要配置这个
    map: {headId: 'id'}, // {headId: 'id'}表示当前查询的记录中的headId字段等于父表选中row的id字段，查询时会自动添加到filtersRaw中{id: 'headId', property: 'headId', operator: '=', value: 父表选中行的id}
    // 注意: 如果只是要预置筛选参数，请写在param中，不要在这里配置，因为这个map中的值会被当做key对待，子表在新建row的时候，也会根据这个map规则设置newRow的一些属性，比如这里新建行默认设置 headId = 父表选中行的id
    editType: 'inline', // 编辑方式,inline(行内编辑),form(表单编辑), 默认 inline, 有时表单编辑会被用户称为“弹框编辑”
    defaultEnableEditable: false, // 默认是否可编辑, 默认为 false
    showExportPlanButton: false, // 是否开启导出计划功能，需要环境中配置【PLAN_EXPORT_ORDER】【EXPORT_PLAN_TYPE】【EXPORT_PLAN_STATUS】值列表, 默认 false
    checkColumnProps: {fixed: 'left'}, // 选框列的属性, 支持所有列属性 (1.7.69版本及后续版本支持)
    columnFilter: true, // 是否开启列筛选, 默认 true
    disabledColumnFilter: false, // 是否禁用掉表格的所有列筛选, 默认 false
    columnFilterPattern: 'Lov', // 表格列筛选方式 可选择的参数有 All(任何情况下打开就查询)、Lov(当配置为Lov 只有点击值列表列，默认查询；否则显示加载数据按钮遮罩) 、None(任何情况下打开都不查询) 也可以针对项目 在前端工程processComponents.js里面全局设置所有表格列筛选
    exactQuery: false, // 开启表格精确匹配参数，true为开启，false为不开启；默认不开启
    showExactQuery: true, // 是否展示表格精确查询框，true为开启，false为不开启；默认开启
    textExactQuery: false, // 文本字段多值精准匹配属性 除去日期列 数字列 值列表列 mvg列 对象选择列等特殊列之外的；默认不开启
    param: { // 默认的查询参数
        oauth: 'ALL', // 控制查询范围, 一般除了详情页的行表外都不用写
        filtersRaw: [{property: "dutyId", operator: '=', value: "16121625011290112"}] // 默认组合查询参数 其中 operator: = 精确查询, like 模糊查询, <> 不等于, in 含有
    }

    // 按钮控制
    insertable: false, // 是否可新建 默认为 true
    updateable: false, // 是否可编辑 默认为 true
    deleteable: false, // 是否可删除 默认为 true
    insertButton: false, // 是否展示标准新建按钮 默认为 true
    copyButton: false, // 是否展示标准复制按钮 默认为 true
    updateable: false, // 是否展示标准编辑按钮 默认为 true
    deleteButton: false, // 是否展示标准删除按钮 默认为 true
    buttons: [
        {
            type: 'other', // 没有特殊情况的话用 other
            label: '提交', // 按钮展示的文本
            handler() { /* 按钮点击后的功能 */ },
            disabled() { /* 返回 true 会让按钮隐藏 */ },
            linkCode: 'TEST-CODE', // 菜单特性配置唯一性编码, 很少用, 一般不写
        },
        // 下面这个按钮会在 insertable: true 时展示
        // 可以同步设置 insertButton: false, 此时页面上没有标准新建按钮, 只展示这个自定义新建按钮
        {
            type: 'insert', // 会受到 insertable 控制，且会渲染为深色、有一个加号图标
            label: '新建',
            handler() {
                // 自定义新建功能
            }
        },
        {
            type: 'update', // 会受到 updateable 控制
            label: '编辑',
            handler() {
                // 自定义编辑功能
            }
        },
        {
            type: 'delete', // 会受到 deleteable 控制
            label: '删除',
            handler() {
                // 自定义删除功能
            }
        }
    ],

    // 钩子函数
    click({row,rowIndex}) {}, // 单击行事件
    dblclick({row,rowIndex}) {}, // 双击行事件
    beforeLoad({url,param,requestMethod,formatFormParam,isReload}) {}, // 加载数据前的钩子函数
    // url：分页查询地址，param：查询参数（包含完整的参数，filtersRaw也在里面），formatFormParam：是否为表单请求，isReload：是否为重新加载数据而不是页跳转
    afterLoad(rows,{url,param,requestMethod,formatFormParam,isReload},data) {}, // 加载数据后的钩子函数
    // 第一个参数rows分页查询请求得到的数组数据，第二个参数同beforeLoad
    // 第三个参数data为完整的response.data，该data一般为{success,rows,total}
    beforeInsert(row) {}, // 保存新建前的钩子函数, return Promise.reject 可以阻止新建
    beforeUpdate(row) {}, // 保存更新前的钩子函数, 阻止方式同上
    beforeUpsert(row) {}, // 保存新建或更新前的钩子函数, 阻止方式同上
    beforeDelete(row) {}, // 提交删除前的钩子函数, 阻止方式同上
    beforeDeleteTip(row) {}, // 同 beforeDelete, 历史遗留
    afterInsert(row) {}, // 新建成功后的钩子函数
    afterUpdate(row) {}, // 更新成功后的钩子函数
    afterUpsert(row) {}, // 新建或更新成功后的钩子函数
    afterDelete(row) {}, // 删除成功后的钩子函数
    beforeExportData(row) {}, // 导出数据前的钩子函数, 阻止方式同上
    afterExportData(row) {}, // 导出数据后的钩子函数
    beforeEnableCreate(row) {}, // 准备开启新建状态前的钩子函数, 阻止方式同上
    beforeEnableUpdate(row) {}, // 准备开启某一行编辑状态前的钩子函数, 阻止方式同上
    beforeEnableDelete(row) {}, // 准备打开某一行确认删除对话框前的钩子函数, 阻止方式同上
    beforeCancel(status) {}, // 取消编辑前的钩子函数, status: 'INSERT' | 'UPDATE'
})
```

使用 new AutoOption 获取 option 对象后，可以调用以下方法

```js
this.tableOption.load() // 重新加载当前页的数据
this.tableOption.reload() // 跳回第一页并重新加载数据
this.tableOption.prevPage() // 加载前一页数据
this.tableOption.nextPage() // 加载后一页数据
this.tableOption.jumpPage(pageNumber) // 跳转到指定页并加载数据
this.tableOption.showFilter() // 打开组合筛选框
this.tableOption.setFilter(id,value,property,operator) // 设置隐藏筛选条件
// id: 随便取但是为了好辨认建议用字段名
// property: 字段名
// operator: = 相等、LIKE 模糊匹配、<> 不等于、> 大于、< 小于、>= 大于等于、<= 小于等于、IN 包含、NOT IN 不包含
this.tableOption.removeFilter(id) // 移除隐藏筛选条件
```

可以获取/设置这些项

```js
this.tableOption.list // 当前页数据数组
this.tableOption.list = [...] // 手动设置当前页数据数组
this.tableOption.selectRow // 当前选中的行数据对象
this.tableOption.selectIndex // 当前选中的行索引
this.tableOption.tableCreated // 当前列表是否初始化完成
this.tableOption.loading // 当前列表是否正在加载中

// 传入 AutoOption 的参数大部分可以获取/重新设置
this.tableOption.param // 额外的查询参数对象
this.tableOption.param = {...} // 手动设置额外的查询参数对象
```

## 特殊场景

调用标准的新建/编辑

```js
// lv_create 是 link-table 组件上的方法
// 使用 tableOption.getTable() 可以获取 link-table 组件的 ref
// 如果给 link-table 设置了 ref 直接使用 $refs.table 也可以
// 但是这样写更加清晰好懂
// 传入的对象会与 tableOption 的 defaultNewRow 合并
tableOption.getTable().lv_create({/* 新建行的字段 */});

// lv_update 是 link-table 组件上的方法
// 可以用 tableOption.selectIndex 获取当前选中行的下标
tableOption.getTable().lv_update(6/* 需要编辑的行的下标 */);
```
