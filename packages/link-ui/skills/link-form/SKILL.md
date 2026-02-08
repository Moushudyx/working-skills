---
name: link-form
description: link 中的表单页面, 一般用于详情页(也称“明细页”)
metadata:
  author: moushu
---

推荐使用 link-form-panel 组件来构建表单页面

```vue
<template>
<!-- link-form-panel 是所有表单的最外层, 接受 option -->
<link-form-panel :option="formOption">
    <template slot="header-right-readonly">
        <!--这里放只读状态下右上角的出现的按钮-->
        <link-button @click="formOption.doInsert">新建</link-button>
        <link-button @click="formOption.doCopy">复制</link-button>
        <link-button @click="formOption.doUpdate">编辑</link-button>
        <link-button @click="column = column === 3 ? 2 : 3">动态切换列</link-button>
    </template>
    <template slot="header-right-editing">
        <!--这里放编辑状态下右上角的出现的按钮-->
        <link-button @click="formOption.closeEdit">取消</link-button>
        <link-button @click="formOption.save">保存</link-button>
    </template>
    <!-- 改变列数, 默认 3 列 -->
    <link-form-grid :column="column">
        <!-- 部分页面可能是用这个组件来分块 <lnk-form-card title="标题"></lnk-form-card> 多数情况不用 -->
        <!-- 折叠表单 -->
        <lnk-panelfolder title="默认3列显示">
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
                id: '', // 给这个属性赋值的话会自动加载（一般用于详情页）
                title: '表单模板', // 会在 link-form-panel 顶部展示，根据业务要求来，不是所有表单都需要
                module: '/link/accnt', // 类似于表格的 module
                data: {},
            }),
            column: 3, // 默认3列，这个示例是为了展示动态切换列数才写的这个
        }
    }
}
</script>
```

formOption 中还有这几个方法

- checkValid 校验表单
- cancelValidate 清除校验状态
- save 保存当前数据
- loadById 需传入 id，根据 id 查询数据
- reload 重新加载当前数据

项目中可能存在使用 link-form 这个旧组件的表单页面，用法与现有的组件大相径庭，需参考已有代码进行使用
