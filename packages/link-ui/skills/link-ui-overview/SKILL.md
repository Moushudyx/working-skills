---
name: link-ui-overview
description: 关于 Link-ui 组件库的整体叙述
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

## link 组件库

此组件库没有对外公开文档，请参考已有代码进行使用；此组件不通过 npm 安装，而是直接放在 static/lib/link 下

页面中使用组件库的组件（特征是以 link- 开头的自定义标签）时不需要引入

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
