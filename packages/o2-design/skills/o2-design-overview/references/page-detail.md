# 详情页

适用场景: 新增/编辑/查看详情页, 或列表-详情结构的详情端

关于列表页的搭建, 可以参考 `references/page-list.md` 文档

## 标准模板

如无特殊说明, 相关文档放在 `references/page/` 目录中

- 标准详情页入口文件模板 `page/page-detail-template.md`
- 详情页表单模板 `page/page-detail-form-template.md`
- Tabs 场景下的详情页模板 `page/page-detail-tab-template.md`

关于新建功能, 项目中的最佳实践是复用详情页组件, 将部分新建时用不到的功能隐藏, 参考 Tabs 场景下的详情页模板

## 多表单场景

- 一个详情页多个表单时, 建议按业务块拆分, 见上文的详情页表单模板
- 如果多个表单对应同一个记录内的数据, 应当共用一个 useFormOption, 统一校验、提交
- 需要联动时, 通过共享 reactive state 或 provide/inject 传递上下文

## 详情页 Tabs 场景

- Tabs 下每个 Tab 维护独立表单/列表 option, 避免相互污染
- 首屏只加载当前 Tab 所需数据, 其余采用懒加载降低首屏压力
- 离开页面前统一处理未保存提示

## 代码文件结构

```
packages/
└── 子模块名/
    ├── config/
    │   └── config.ts # 页面需要写在这里, 包括页面路由、代码文件路径
    └── src/
        └── routes/
            └── 页面编码(大驼峰)/ # 页面文件放在这里
                ├── List/ # 列表页
                └── Detail/ # 详情页
                    ├── Tabs/ # 详情页内的 Tabs, 如果没有 Tabs 可以不建这个文件夹
                    │   └── XXXList.js # Tab 内的表格
                    ├── index.js # 详情页入口文件, 虽然是 .js 但确实是 jsx 格式的
                    └── XXXInfo.js # 详情页表单
```
