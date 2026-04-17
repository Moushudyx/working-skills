# 新建页面

为防止返工, 任何新页面的开发都必须按此文档流程进行, 包括非标准页面

关于列表页的搭建, 可以参考 `references/page-list.md` 文档

关于详情页的搭建, 可以参考 `references/page-detail.md` 文档

## 新页面开发要点

1. 先确认具体需求, 研究清楚需要哪些功能, 页面结构什么样子
2. 搭建过程中优先搭建好结构, 不要过早关注细节(先建好所有可能需要的文件, 比如一个列表-详情结构就先建好列表页和详情页的文件)
3. 再根据实际需求调整细节, 逐步完善功能

### 确认具体需求

1. 理解需求, 比如页面的整体结构如何
2. 根据需求和整体结构, 确认功能、组件
3. 根据功能和组件, 确认需要哪些代码文件, 以及文件之间的关系

### 搭建页面结构

1. 根据确认的文件结构和列表页/详情页的文档, 先创建好所有文件, 包括列表页、详情页(包括拆分的表单、tab 子表等)、特殊逻辑的组件(比如特别大的模态框或者复杂的交互等)
2. 搭建过程中优先关注结构, 不要过早关注细节

### 完善功能

1. 先完善看得见的部分(把组件放在正确的位置、字段基本展示等)
2. 再完善交互部分(交互逻辑、事件处理等)
3. 最后完善细节部分(样式、权限控制、多语言、特殊场景处理等)

## 常见场景

1. 仅一个列表展示数据, 所有操作都在列表页完成
2. 列表页展示数据, 点击新增/编辑进入详情页完成操作

## 页面结构

```
packages/
└── 子模块名/
    ├── config/
    │   └── config.ts # 页面需要写在这里, 包括页面路由、代码文件路径
    └── src/
        └── routes/
            └── 页面编码(大驼峰)/ # 页面文件放在这里
                ├── components/ # (可选)页面内的特殊组件, 比如特别大的模态框或者复杂的交互等
                ├── List/ # 列表页
                ├── Detail/ # 详情页
                └── 其他子页面/ # 其他子页面
```

`config.ts` 中的页面配置

```ts
export default extendParentConfig({
  routes: [
    // 单页面示例
    {
      path: "/o2om/single-page-demo", // 页面路由
      component: "@/routes/o2om/SinglePageDemo", // 默认读取其下的 index.js 作为入口文件, 也可以指定其他文件
      // @ 表示子模块的 src 目录下
    },
    // 列表-详情页示例
    {
      path: '/o2om/list-detail-demo', // 页面根路由
      routes: [
        {
          path: '/o2om/list-detail-demo/list', // 实际访问页面根路由时会重定向到这里的第一个子路由
          component: '@/routes/o2om/ListDetailDemo/List',
        },
        {
          path: '/o2om/list-detail-demo/detail/:id?',
          component: '@/routes/o2om/ListDetailDemo/Detail',
        },
        // {
        //   path: '/o2om/list-detail-demo/其他子页面',
        //   component: '@/routes/o2om/ListDetailDemo/其他子页面',
        // },
      ],
    },
  ],
  hzeroMicro: {
    microConfig: {
      // 前端加载使用微前端模式, 页面路由匹配正则才会加载当前子模块
      "registerRegex": "\\/(pub\\/)?(o2om|o2rm)",
    },
    mfExposes: {
      // 当前子模块暴露给其他子模块的组件, key 是暴露的组件名称, value 是组件的路径(相对于 src 目录), 其他子模块可以通过 import { TrainVideoCard } from '当前子模块' 来使用这个组件
      'TrainVideoCard': '@/routes/components/TrainVideoCard',
    },
  },
});
```
