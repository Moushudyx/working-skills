# 列表页模板

适用场景: 单列表页、列表-详情页中的列表入口

## 模板

如无特殊说明, 相关文档放在 `references/page/` 目录中

- 带有详情页的列表页模板 `page/page-list-template.md`
- 只有列表页的模板 `page/page-list-only-template.md`（适用于没有详情页的单列表页场景）

## 开发要点

- useTableOption 和生命周期函数必须在 setup 中调用
- 列表按钮优先放在 table button 区, 统一权限与交互
- 列配置优先使用 O2Column 系列组件, 保持与编辑态一致
- 注意多语言的写法
