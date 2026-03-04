# link-form 表单

推荐使用 link-form-panel 组件来构建表单页面

## 示例

```vue
<template>
<!-- link-form-panel 是所有表单的最外层, 接受 option -->
<link-form-panel :option="formOption">
    <template slot="header-right-readonly">
        <!--这里放只读状态下右上角的出现的按钮-->
        <link-button @click="formOption.doInsert">新建</link-button>
        <link-button @click="formOption.doCopy">复制</link-button>
        <link-button @click="formOption.doUpdate">编辑</link-button>
    </template>
    <template slot="header-right-editing">
        <!--这里放编辑状态下右上角的出现的按钮-->
        <link-button @click="formOption.closeEdit">取消</link-button>
        <link-button @click="formOption.save">保存</link-button>
    </template>
    <!-- 改变列数, 默认 3 列, 如果没有特殊需求可以不传这个 -->
    <link-form-grid :column="column">
        <!-- 部分页面可能是用这个组件来分块 <lnk-form-card title="标题"></lnk-form-card> 多数情况不用 -->
        <!-- 折叠表单 -->
        <lnk-panelfolder title="表单标题">
            <!-- 特殊说明 required 写在 link-form-item 上 -->
            <link-form-item label="客户名称" prop="acctName" required>
                <!-- disabled 需要写在内部的组件上, 不写 disabled 则受 option 的统一控制 -->
                <link-input v-model="formOption.data.acctName"/>
            </link-form-item>
            <link-form-item label="详细地址" prop="address" required>
                <link-input v-model="formOption.data.address"/>
            </link-form-item>
            <link-form-item label="客户分类" prop="acctType" required>
                <link-lov-select lov-type="ACCT_TYPE" v-model="formOption.data.acctType"/>
            </link-form-item>
            <link-form-item label="客户等级" prop="acctLevel">
                <link-lov-select lov-type="ACCT_LEVEL" parent-lov-type="ACCT_TYPE" :parent-lov-value="formOption.data.acctType" v-model="formOption.data.acctLevel"/>
            </link-form-item>
        </lnk-panelfolder>
        <!-- 如果 lnk-panelfolder 下的表单元素数量占不满一行, 则需要加上 width:100% -->
        <lnk-panelfolder title="另一个表单" style="width: 100%;">
            <link-form-item label="有效时间" prop="endTime" :required="formOption.data.acctLevel === 'VIP'">
                <link-datepicker
                    range
                    placeholder="开始日期 ~ 结束日期"
                    :start.sync="formOption.data.startTime"
                    :end.sync="formOption.data.endTime"
                />
            </link-form-item>
            <link-form-item label="备注" prop="comments" required>
                <link-textarea v-model="formOption.data.comments" />
            </link-form-item>
        </lnk-panelfolder>
    </link-form-grid>
</link-form-panel>
</template>
<script>
export default {
    name: 'link-form-panel-demo1',
    data(){
        return {
            formOption: new LinkFormPanelOption({
                context: this,
                id: '', // 给这个属性赋值的话会自动加载(一般用于详情页, 从 this.pageParam.id 获取)
                title: '表单模板', // 会在 link-form-panel 顶部展示，根据业务要求来，不是所有表单都需要
                module: '/link/accnt', // 类似于表格的 module
                data: {},
            }),
            column: 3, // 默认3列, 一般不写
        }
    }
}
</script>
```

最需要注意的地方是 `required` 需要写在 link-form-item 上, 而不是内部的输入组件上；而 `disabled` 则需要写在输入组件上, 不写 `disabled` 则受 option 的统一控制

- 特别的, 如果是自定义了 `disabled` 的输入组件, 那么 `disabled` 参数中需要写成类似 `:disabled="其他条件 || !formOption.isEditing"` 的形式, 来保证在非编辑状态下组件是禁用的

## formOption

formOption 由 LinkFormPanelOption 实例化而来

```js
const formOption = new LinkFormPanelOption({
    context: this, // 组件实例
    id: '', // 给这个属性赋值的话会自动加载(一般用于详情页, 从 this.pageParam.id 获取)
    module: '/link/accnt', // 类似于表格的 module
    preDefaultUrl: '/link/accnt/customDefault', // 可选项, 新建时获取默认值的接口地址, 默认是 module + '/preDefaultValue'
    queryUrl: '/link/accnt/customQuery', // 可选项, 查询时的接口地址, 默认是 module + '/queryById'
    insertUrl: '/link/accnt/customInsert', // 可选项, 新增时的接口地址, 默认是 module + '/insert'
    updateUrl: '/link/accnt/customUpdate', // 可选项, 编辑时的接口地址, 默认是 module + '/update'
    sendByJson: true, // 可选项, 是否以 json 形式发送请求, 默认为 true, 一般不需要改

    title: '表单模板', // 可选项, 会在 link-form-panel 顶部展示，根据业务要求来，不是所有表单都需要
    data: {}, // 可选项, 表单数据对象, 需要传入组件进行双向绑定, 一般用不上
    dataDefault: {...defaultNewRow}, // 可选项, 新建时表单数据会被重置为这个值
    loadOnStart: false, // 可选项, 是否在组件加载时自动根据 id 加载数据, 默认为 true, 如果不需要自动加载则设置为 false
    labelWidth: 120, // 可选项, 表单标签宽度, 默认 120, 根据实际情况调整

    saveMethod: (option) => { /* ... */ } // 可选项, 自定义保存方法, 一般除非是很复杂的逻辑否则用不上
    onLoadSuccess: (response) => { /* ... */ } // 可选项, 加载成功后的回调函数, 参数是返回的响应
    onLoadError: (error) => { /* ... */ } // 可选项, 加载失败后的回调函数, 参数是错误对象
    beforeEnableInsert: (data) => { /* ... */ } // 可选项, 启用新建前的回调函数, 参数是当前表单数据
    beforeSave: ({url,data,operation,cancel}) => { /* ... */ } // 可选项, 保存前的回调函数, 参数是一个对象, 包含 url(默认的请求地址), data(当前表单数据), operation(当前操作, 'insert' 或 'update'), cancel(一个函数, 调用 cancel() 可以取消保存)
    onSaveSuccess: (response) => { /* ... */ } // 可选项, 保存成功后的回调函数, 参数是返回的响应
    onSaveError: (error) => { /* ... */ } // 可选项, 保存失败后的回调函数, 参数是错误对象
    afterCloseEdit: (context) => { /* ... */ } // 可选项, 取消编辑后的回调函数, context 为当前表单实例对象
})

formOption.isEditing // 表单当前是否处于编辑状态
formOption.isInsert // 当前是否为新建状态(区别于编辑已有数据的状态)
```

其中还有这几个方法

- checkValid 校验表单(会弹出气泡提示, 未通过的字段会标红)
- cancelValidate 清除校验状态(字段标红等)
- save 保存当前数据(会自动校验)
- loadById 需传入 id, 根据 id 查询数据
- reload 重新加载当前数据

## 校验

必填校验由 required 控制, 其他校验可以通过 link-form-item 上 rules 参数传入, 参考 references/link-form-validate.md

## 旧版表单组件 link-form

项目中可能存在使用 link-form 这个旧组件的表单页面，用法与现有的组件大相径庭，需参考已有代码进行使用

## 旧版组件 lnk-form-panel

这个组件由 link-form-panel 组件完全替换了，项目中可能存在使用 lnk-form-panel 这个旧组件的表单页面，推荐用户改用新组件, 如果条件不允许, 则参考已有代码进行使用
