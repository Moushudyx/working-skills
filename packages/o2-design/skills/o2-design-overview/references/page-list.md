# 列表页

适用场景: 单列表页、列表-详情页中的列表入口

若无特殊情况, 必须参照页面模板而非现有页面开发

关于详情页的搭建, 可以参考 `references/page-detail.md` 文档

## 标准模板

如无特殊说明, 相关文档放在 `references/page/` 目录中

- 带有详情页的列表页模板 `page/page-list-template.md`
- 只有列表页的模板 `page/page-list-only-template.md`（适用于没有详情页的单列表页场景）

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
                │   └── index.js # 列表页入口文件, 虽然是 .js 但确实是 jsx 格式的
                └── Detail/ # 详情页
```

## 开发要点

- useTableOption 和生命周期函数必须在 setup 中调用
- 列表按钮优先放在 table button 区, 统一权限与交互
- 列配置优先使用 O2Column 系列组件, 保持与编辑态一致
- 注意多语言的写法
