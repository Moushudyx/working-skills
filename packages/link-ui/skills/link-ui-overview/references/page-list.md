
## 列表-详情 结构

列表-详情结构也称头行结构, 列表页(以及详情页的表单信息)称为头信息(对应数据库的主表), 详情页的表格信息称为行信息(对应数据库的子表), 适用于一对多的场景, 例如订单和订单项, 课程和章节等

编写此页面时建议参考 references/link-table.md 中的 AutoOption 对象相关内容

其对应的详情页建议参考 references/page-detail.md

```vue
<!--
* @author <开发人员名称>
* @date <创建日期>
* <页面名>列表页
-->
<template>
    <div class="main-content <页面编码>-list">
        <link-auto-table :option="tableOption">
            <template slot="button">
                <!-- 列表的按钮信息, 也可以写在 tableOption 的 buttons 参数里 -->
                <link-button @click="handleSubmit">提交</link-button>
                <link-button v-if="isFinanceUser" @click="handleApproval">审批通过</link-button>
                <link-button v-if="isFinanceUser" @click="handleReject">审批拒绝</link-button>
                <link-button v-if="isFinanceUser" @click="handleDisable">失效</link-button>
            </template>
            <!-- 列信息 -->
            <link-table-column title="XX编码" field="XXCode" auto-fill="TEXT" />
            <!-- 这一列可以点击跳转详情页, 其中 link 参数表示渲染为 a 标签 -->
            <link-table-column title="XX名称" field="XXName" auto-fill="TEXT" link @click="gotoDetailForm" />
            <!-- 操作列, 除非明确要求否则一般不展示 -->
            <link-table-column-operator title="操作" fixed="right" align="center" width="1-button" :sort="false">
                <template slot-scope="{row,rowIndex}">
                    <link-button label="预览" @click="previewData(row,rowIndex)"/>
                </template>
            </link-table-column-operator>
        </link-auto-table>
        <!-- <link-dialog v-model="showDialog" title="可能存在的弹框需求">
        </link-dialog> -->
    </div>
</template>
<script>
import {globalPublicMixin} from '@/modules/common/js/mixin';

export default {
    name: '<页面编码>-list',
    mixins: [globalPublicMixin], // 关于这个 mixin 的说明见 references/globalPublicMixin.md
    data() {
        return {
            // showDialog: false,
            tableOption: new AutoOption({
                title: '<页面名>',
                context: this,
                module: '<模块名>', // 接口前缀, 如果是标准接口, 一般建议只填写这个就行
                queryByExamplePage: '<模块名>/customQueryUrl', // 查询接口, 如果配置了 module 的话, 可以不配置这个参数, 默认是 `${module}/queryByExamplePage` 如有不同则用这个参数覆盖
                // defaultNewRow: {}, // 列表-详情模式的页面一般用不上这个
                buttons: [],
                // 列表-详情模式的页面, 其新建/编辑/复制等操作往往在详情页, 所以需要关闭这些标准功能
                batchUpdateable: false,
                batchInsertable: false,
                insertable: false,
                updateable: false,
                deleteable: false, // 删除操作可能会留在列表页, 需要注意
                importable: false,
                copyable: false,
                fill: true
            })
        };
    },
    mounted() {
        this.$nav.$on('returnBack', (param) => this.tableOption.load()); // 从详情页返回列表页, 刷新列表数据
    },
    computed: {
        /** 是否是财务用户, 这个只是一个示例, 实际情况可能需要根据不同的业务需求来判断 */
        isFinanceUser() {
            return appCtx.positionType === 'Finance';
        }
    },
    methods: {
        // 这块需要根据文档来, 有的页面可能没有新建/复制的需求, 有的页面新建/复制是直接调用特定接口实现
        /**
         * 跳转到详情页的新建页面
         */
        gotoInsertForm() {
            this.$nav.push('/modules/crm/rebate_manage/rebate_policy/rebate-policy-detail.vue', {
                mode: 'new' // mode 是一个约定好的参数, new 新建(最常用), detail 查看(最常用), update 进入详情页后立刻进入编辑状态(很少见), copy 复制(类似新建, 复制指定 id 的数据作为默认数据填入)
            });
        },
        /**
         * 跳转到详情页
         */
        gotoDetailForm({row}) {
            this.$nav.push('/modules/crm/rebate_manage/rebate_policy/rebate-policy-detail.vue', {
                mode: 'detail',
                id: row.id
            });
        },
        /**
         * 跳转到详情页的复制页面
         */
        gotoCopyForm() {
            this.$nav.push('/modules/crm/rebate_manage/rebate_policy/rebate-policy-detail.vue', {
                mode: 'copy',
                id: row.id
            });
        },
        // 其他操作函数, 比如提交、审批等
    }
};
</script>
<style lang="scss">
// @import '../../../../styles/index.scss';
// .<页面编码>-list {
// }
</style>
```

## 单列表页

此结构可以参考上文的列表-详情结构, 只需要把详情页相关的内容去掉即可, 也就是没有跳转详情页的操作等

## 父子表结构

编写此页面时建议参考 references/link-table.md 中的父子表相关内容

父子表结构的页面一般不存在详情页, 所以一般不需要开发页面跳转, 把详情页相关的内容去掉
