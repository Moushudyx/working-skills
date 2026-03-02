---
name: link-ui-overview
description: link工程PC端开发说明与link-ui组件库使用说明
metadata:
  author: moushu
---

## 工程结构

此工程基于 Vue 2.6 和 link 专用组件库开发，系统主要分为 CRM 和 DMS 两大部分

- src/modules/crm - CRM 系统相关代码
- src/modules/dms - DMS 系统相关代码

页面代码文件路径按照 src/modules/{crm|dms}/{模块名称}/{页面名称}/{页面名称}-{list|detail}.vue 组织

- 比如 src/modules/crm/rebate_manage/rebate_product/rebate-product-list.vue 表示 CRM 系统的返利管理模块下的返利商品页面的列表页

系统中可能存在不按此规范命名的页面文件，请根据实际情况处理

## 常见概念

ID: link 项目中所有数据都一个 id 字段, 是一个永远不会重复的长数字字段(一般当作字符串处理), 关联子表时往往使用 headId 来指示自己的父级数据

安全性: (重要概念)在PC端配置, 每个菜单都有安全性控制, link-table 会自动响应相关配置, 变更自己的默认查询参数、默认按钮; 比如某个页面对某个用户配置了“我组织及下级组织数据”的安全性, 那么列表查询时的 oauth 参数会自动编程"MT_ORG"(或者"MY_ORG_拼接一串特殊参数"), 如果页面安全性配置了不允许编辑, 那么列表的编辑按钮会自动隐藏(还有双击编辑功能也会失效)

值列表: (重要概念)也称 lov, 部分来自 O2 项目的同事可能称其为“值集”, 用于将存在后端的英文数据转换成人类阅读的文本(如后端存"NEW"、"SUBMITTED"前端展示“新建”“已提交”), 在 PC 端的“值列表”页面配置, 使用时需要用到 link-lov 或其他名称类似的组件, 组件会根据传入的 lov-type 自动请求后端接口, 获取“值-展示值”的配置

Picklist: (重要概念)也称 object 选择, 部分来自 O2 项目的同事可能称其为“值集视图”, 打开弹框, 里面是一个列表, 用户勾选数据并点击确定, 有单选和多选两种模式, 使用起来比较复杂, 建议使用时参考已有代码处理

MVG: (不常用的组件)穿梭框组件, 点开弹框, 分为左右两个列表, 点确定时会保存在 MVG 专用表里; 此组件使用非常麻烦, 需要配置左右两个框的 option, 建议使用时参考已有代码处理

## link 组件库

此组件库没有对外公开文档，请参考已有代码进行使用；此组件不通过 npm 安装，而是直接放在 static/lib/link 下

页面中使用组件库的组件（特征是以 link- 开头的自定义标签）时不需要引入

### 组件

- 按钮 link-button, 文档见 references/link-button.md
- 对话框 link-dialog, 文档见 references/link-dialog.md
- 表单 link-form-panel, 文档见 references/link-form.md
  - 表单相关组件 link-form-item、link-form-grid、link-panelfolder 等
  - 一些旧组件 link-form、lnk-form-panel 可能还在部分页面使用, 也可参考此文档
- 图标 link-icon, 文档见 references/link-icon.md
- 值集相关组件 link-lov, 文档见 references/link-lov.md
  - 常见组件名 link-table-column-lov、link-radio-lov、link-lov-select、link-lov-text
- 列表 link-auto-table, 文档见 references/link-table.md

### 服务

- 对话框服务 $dialog, 文档见 references/link-dialog.md
- 气泡提示服务 $msg, 文档见 references/link-msg.md

### 特殊写法示例

### 常见问题

## 公共对象

### linkTools

上面有很多方法但是基本只用到这几种

- deepCopy(obj) 深拷贝对象，只能拷贝普通的对象和数组
- isEmpty(val) 判断值是否为空，null、undefined、空字符串、空数组、空对象都会返回 true
- copyToClipboard(text) 复制文本到剪贴板，返回true/false 表示是否成功

### appCtx

appCtx 是一个全局的应用上下文对象，常用的参数就以下几个

- appName 应用名称，比如 CRM、DMS
- isAdmin 是否为管理员用户，Y/N 类型
- orgId 当前用户所属组织ID
- orgName 当前用户所属组织名称
- positionType 当前用户职位类型, SysAdmin 系统管理员
- userId 当前用户ID
- userName 当前用户名称
