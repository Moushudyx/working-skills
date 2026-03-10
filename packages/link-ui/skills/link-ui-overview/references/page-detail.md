
## 标准结构

编写此页面时建议参考 references/link-form.md 中的表单相关内容

其对应的列表页建议参考 references/page-list.md

如下的例子中, link-auto-table 是放在 lnk-panelfolder 中的, 有时候会放在 link-tabs 中

实际编写页面时建议去掉不必要的注释, 仅保留页面顶部注释、关键属性注释、方法/计算值注释等必要注释, 以免造成视觉干扰; 当然修改页面时不要删除用户的注释

对于后端没有给出接口/字段信息等场景, 可以先搭建一个壳子, 然后用 TODO 注释标明需要补充接口/字段信息的位置, 以便后续补充

```vue
<!--
* @author <开发人员名称>
* @date 2026-3-2
* 返利率明细页
-->
<template>
    <!--
        详情页模板代码:
        分割块<lnk-form-card title="标题"></lnk-form-card>
        折叠表单<lnk-panelfolder title="标题"></lnk-panelfolder>
        表单外层<link-form-panel :option="formOption"></link-form-panel>
            右上角按钮-只读模式<template slot="header-right-readonly"></template>
            右上角按钮-编辑模式<template slot="header-right-editing"></template>
        改变列数<link-form-grid :column="列数"></link-form-grid>
    -->
    <div class="main-content rebate-rate-detail">
        <link-form-panel :option="formOption">
            <template slot="header-right-readonly">
                <!-- 这里放只读状态下右上角的出现的按钮 -->
                <!-- <link-button @click="formOption.doInsert">新建</link-button> -->
                <!-- <link-button @click="formOption.doCopy">复制</link-button> -->
                <!-- <link-button @click="formOption.doUpdate">编辑</link-button> -->
                <!-- 返回操作建议调用 returnBack 方法 -->
                <link-button type="line" label="返回" @click="returnBack"/>
            </template>
            <template slot="header-right-editing">
                <!-- 这里放编辑状态下右上角的出现的按钮 -->
                <link-button type="line" @click="formOption.closeEdit">取消</link-button>
                <link-button @click="formOption.save">保存</link-button>
            </template>
            <link-form-grid :column="column">
                <!-- link-form-grid 下可以放置多个 lnk-panelfolder, 其下的 link-form-item 都能正常链接到 formOption -->
                <lnk-panelfolder title="基本信息">
                    <link-form-item label="公司编码" prop="companyCode">
                        <link-input v-model="formOption.data.companyCode" />
                    </link-form-item>
                    <link-form-item label="公司名称" prop="companyName">
                        <link-input v-model="formOption.data.companyName" />
                    </link-form-item>
                    <link-form-item label="客户编码" prop="acctCode">
                        <link-input v-model="formOption.data.acctCode" />
                    </link-form-item>
                    <link-form-item label="客户名称" prop="acctName">
                        <link-input v-model="formOption.data.acctName" />
                    </link-form-item>
                    <link-form-item label="业务年度" prop="businessYear">
                        <link-lov-select v-model="formOption.data.businessYear" lov-type="BUSINESS_YEAR_TYPE" />
                    </link-form-item>
                    <link-form-item label="客户返利率" prop="mainRate">
                        <link-input-number v-model="formOption.data.mainRate" />
                    </link-form-item>
                    <link-form-item label="状态" prop="status">
                        <link-lov-select v-model="formOption.data.status" lov-type="REBATE_RATE_STATUS" />
                    </link-form-item>
                </lnk-panelfolder>
            </link-form-grid>
        </link-form-panel>
        <!-- 这个例子中“产品返利率”是放在一个可以收起的面板中 -->
        <!-- 有的页面需要放在一个 tabs 中切换展示, 需要按后文的说明处理 -->
        <lnk-panelfolder title="产品返利率">
            <link-auto-table :option="rebateRateLineOption">
                <link-table-column-input title="产品编码" field="prodCode" auto-fill="TEXT" required />
                <link-table-column-input title="产品名称" field="prodName" auto-fill="LONG_TEXT" required />
                <link-table-column-input-number title="产品返利率" field="totalRate" auto-fill="TEXT" required />
                <link-table-column-input-number title="买赠返利率" field="giftRate" auto-fill="TEXT" />
            </link-auto-table>
        </lnk-panelfolder>
    </div>
</template>
<script>

import {globalPublicMixin} from '@/modules/common/js/mixin';

export default {
    name: 'rebate-rate-detail',
    mixins: [globalPublicMixin], // 关于这个 mixin 的说明见 references/globalPublicMixin.md
    data() {
        // 若无特殊情况, 建议详情页的 option 命名为 formOption
        const formOption = new LinkFormPanelOption({
            title: '返利率',
            context: this,
            id: this.pageParam.id,
            module: '/dms/link/rebateRate',
            // data: {},
            dataDefault: {}
            // elFormProps: {},
        });
        // 由于父表 id 已知, 一般不用设置行表在父表查询完成后再查询
        const rebateRateLineOption = new AutoOption({
            // title: '产品返利率',
            context: this,
            module: '/dms/link/rebateRateItem',
            queryByExamplePage: '/dms/link/rebateRateItem/queryByExamplePage',
            // 大多数情况下子表都是通过 filtersRaw 中传递 headId 来关联父表的, 详情页的父表 id 一般通过 this.pageParam.id 获取(列表页跳转详情页时传递 id 参数), 见 references/page-list.md 中的相关说明
            // 特殊情况下可能要设置 `param: {filtersRaw:[...], oauth: 'ALL'}`, 其中的 oauth 是安全性配置, 设为 ALL 可以查询出所有数据(所谓的特殊情况一般是指页面设置了限定组织之类的安全性, 但是希望行信息能查出所有数据的场景)
            param: {filtersRaw: [{id: 'headId', property: 'headId', value: this.pageParam.id}]},
            // defaultNewRow: {},
            buttons: [],
            batchUpdateable: false,
            batchInsertable: false,
            insertable: false,
            updateable: false,
            deleteable: false,
            importable: false,
            copyable: false,
            fill: false
        });
        return {formOption, column: 3, rebateRateLineOption};
    },
    methods: {},
    mounted() {
        this.initFormOption(); // 这个方法来自 globalPublicMixin
    }
};
</script>
<style lang="scss">
// @import '../../../../styles/index.scss';
.rebate-rate-detail {
}
</style>
```

### 使用 link-tabs

使用 link-tabs, 关于此组件可以参考 references/link-tabs.md

```html
<link-tabs @change="onTabChange">
    <link-tab title="tab1 标题">
        <link-auto-table :option="XXXOption">
            <!-- 内容 -->
        </link-auto-table>
    </link-tab>
    <link-tab title="tab2 标题">
        <link-auto-table :option="YYYOption">
            <!-- 内容 -->
        </link-auto-table>
    </link-tab>
</link-tabs>
```
