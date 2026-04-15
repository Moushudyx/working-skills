---
name: link-mp-dev
description: link 小程序端(使用 taro)开发必须阅读此技能
metadata:
  author: moushu
---

# 项目使用规范

1. 项目中默认开启eslint,不允许关闭
2. 项目中新建的组件,存放在src/components目录下;新建的原生组件,粗放在src/components-wx目录下
3. 新的项目,需要在pages目录下创建自己项目的目录(如拼音首字母),避免与其他项目或通用页面产生耦合性
4. 项目内部通用组件,可以在项目下的components目录下进行创建
5. 模块内部组件或非通用性组件在自己的业务模块下的components目录下新建
6. 如果项目上有客户化的字体图标,需要在static/lib/icon下新建自己项目上目录,并将css文件放入到该目录下

## 目录及文件命名规范

1. 目录命名规范,新建的目录要按照中划线命名规则,多个单词之间要用中划线做分隔,如work-order
2. 文件命名规则,新建文件要按照中划线命名规则,多个单词之间要用中划线做分隔,如work-order-list-page.vue
3. 列表页以 -list-page 结尾, 详情页以 -detail-page 结尾, 如果新建页面与详情页差异太大无法代码复用的, 以 -new-page 结尾

## 页面开发规范

【建议】页面开发时,以link-page组件作为根组件,如果是弹框组件,则以link-dialog组件作为根组件

【强制】在taro中 `scoped` 关键字不会生效,无法做到样式隔离,因此每个页面、组件都要有自己的样式的根节点，比如 work-order-list-page.vue 文件,则可以class="work-order-list" 为根节点样式

【强制】设置变量、方法名、计算属性时，需要做到见名知意，不允许使用意义不明的词做命名

## 项目结构说明

```
.
├── README.md             # readme文件,包含项目工程启动说明
├── babel.config.js       # 需改babel配置的文件
├── config                # taro工程配置目录
├── .editorconfig         # 编辑器配置文件
├── .eslintignore         # eslint忽略文件
├── .eslintrc.js          # eslint配置文件
├── .gitignore            # git忽略文件
├── .npmrc                # npm地址配置文件,包括私服地址及部分依赖相关地址
├── .prettierrc           # pretttier配置文件
│   ├── config.utils.js   # 配置工具文件
│   ├── dev.js            # NODE_ENV为development时使用配置,即开发配置 
│   ├── index.js          # 模块入口
│   └── prod.js           # NODE_ENV为production时使用配置,即打包配置
├── env
│   ├── env.d.ts          # env模型文件
│   ├── env.js            # 工具方法文件
│   ├── index.ts          # 模块入口文件
│   ├── link              # link产品项目配置文件
│   └── xxx               # xxx项目配置文件,按照英文缩写即可
├── global.d.ts           # 全局声明文件
├── package.json                
├── project.config.json   # 小程序配置文件
├── src                   # 源码目录
│   ├── app.config.ts     # 全局配置文件
│   ├── app.scss          # 全局css变量文件
│   ├── app.ts            # 工程入口文件
│   ├── components        # taro组件目录
│   ├── components-wx     # 微信原生组件目录
│   ├── index.html        # index.html文件,H5下才会用到
│   ├── pages             # 业务页面
│   │   ├── components    # 通用组件
│   │   ├── core          # 通用页面
│   │   ├── echart        # echart组件目录
│   │   ├── lzlj          # 泸州老窖项目目录
│   │   ├── tabBar        # 自定义tabbar目录
│   ├── project.config.json   
│   ├── shims-vue.d.ts
│   ├── static            # 静态目录
│   │   ├── images        # 静态图片文件
│   │   ├── lib   
│   │    ├── icon         # iconfont css文件目录
│   ├── store             # vuex 模块目录
│   │   ├── modules       # 存放各业务模块要用到的模块文件
│   │   └── store.ts      # vuex入口文件
│   ├── styles            # 全局css目录
│   ├── types
│   └── utils             # 工具类及服务目录
└── tsconfig.json
```

## 组件/工具使用规范

若无特殊说明, 所有文档都在 `references` 目录下

- 按钮 `link-button.md`
- 对话框 `link-dialog.md`
- 下拉框 `link-dropdown.md`
- 悬浮按钮 `link-fab-button.md`
- 静态卡片列表 `link-list.md`
- 列表 `link-auto-list.md`
  - 列表option `AutoOption.md`
- 表单 `link-form.md`
  - 表单option `FormOption.md`
