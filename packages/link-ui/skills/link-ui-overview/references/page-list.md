
## 列表-详情 结构

列表-详情结构也称头行结构, 列表页(以及详情页的表单信息)称为头信息(对应数据库的主表), 详情页的表格信息称为行信息(对应数据库的子表), 适用于一对多的场景, 例如订单和订单项, 课程和章节等

编写此页面时建议参考 references/link-table.md

若要编写详情页, 建议参考 references/page-detail.md

实际编写页面时建议去掉不必要的注释, 仅保留页面顶部注释、关键属性注释、方法/计算值注释等必要注释, 以免造成视觉干扰; 当然修改页面时不要删除用户的注释

对于后端没有给出接口/字段信息等场景, 可以先搭建一个壳子, 然后用 TODO 注释标明需要补充接口/字段信息的位置, 以便后续补充

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
            <!-- width 参数一般按照两个字的按钮宽度来计算, 比如一个 4 字按钮 + 一个 2 字按钮, 则需要设置为 3-button -->
            <link-table-column-operate title="操作" fixed="right" align="center" width="1-button" :sort="false">
                <template slot-scope="{row,rowIndex}">
                    <link-button label="预览" @click="previewData(row,rowIndex)"/>
                </template>
            </link-table-column-operate>
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
                singleSelect: false, // 是否单选, 设为 false 会展示复选框, 如果没有明确多选需求则不要设置这个参数(默认是无复选框)
                buttons: [],
                // 列表-详情模式的页面, 其新建/编辑/复制等操作往往在详情页, 所以需要关闭这些默认开启的标准功能
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
                id: row.id // 至少要传一个 id
            });
        },
        /**
         * 跳转到详情页的复制页面
         */
        gotoCopyForm() {
            this.$nav.push('/modules/crm/rebate_manage/rebate_policy/rebate-policy-detail.vue', {
                mode: 'copy',
                id: row.id // 至少要传一个 id
            });
        },
        // 以 审批拒绝 为例, 以下代码修改自一个政策页面的审批拒绝按钮, 实际编码中需根据业务需求调整
        /**
         * 审批拒绝
         */
        async handleReject() {
            // 设置 singleSelect=false 后列表会展示复选框, 然后可用这个方法获取用户勾选了复选框的数据数组
            const rows = await this.tableOption.getTable().getSelected();
            if (!rows || !rows.length) {
                this.$msg.warning('请至少选择一行数据');
                return;
            }

            // 假设这里有个状态校验, 只有【待审批】状态的政策才能审批拒绝, 如果有不满足条件的行就提示用户并返回
            const statusInvalidRows = rows.filter((row) => row.pcyStatus !== 'PENDING_APPR');
            if (statusInvalidRows.length > 0) {
                // 提示时最好带上具体哪些数据不满足条件, 以免用户不知道问题出在哪里, 具体展示哪些字段可以根据实际情况调整
                this.$msg.warning(`只有【待审批】状态的政策才能审批拒绝，请检查：\n${statusInvalidRows.map((r) => r.pcyName).join(', ')}`);
                return;
            }

            // operateTip 用于操作前提示, 这个函数会返回一个 Promise, 在用户确认提示时 resolve, 在用户取消提示时 reject, 详见 references/globalPublicMixin.md 文档
            await this.operateTip({tip: '审批拒绝'});

            // publicHandler 封装了 this.$http.post 调用, 方便调用时的提示和一些参数的处理, 成功时会自动提示(可以关闭)并 resolve, 失败是会自动提示并 reject, 详见 references/globalPublicMixin.md 文档
            const res = await this.publicHandler('<模块名>/batchApprove/reject', rows, '审批拒绝');
            // 这里可以处理返回的 res

            // 后续操作, 比如说取消列表选中, 并刷新当前页
            this.tableOption.getTable().unselectAll();
            this.tableOption.load();
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
