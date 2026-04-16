# 详情页模板（O2Form + 子表）

适用场景: 新增/编辑/查看详情页, 或列表-详情结构的详情端

## 最小模板

如无特殊说明, 相关文档放在 `references/page/` 目录中

- 标准详情页入口文件模板 `page/page-detail-template.md`
- 详情页表单模板 `page/page-detail-form-template.md`
- Tabs 场景下的详情页模板 `page/page-detail-tab-template.md`

## 多表单场景

- 一个详情页多个表单时, 建议按业务块拆分, 见上文的详情页表单模板
- 如果多个表单对应同一个记录内的数据, 应当共用一个 useFormOption, 统一校验、提交
- 需要联动时, 通过共享 reactive state 或 provide/inject 传递上下文

## 详情页 Tabs 场景

- Tabs 下每个 Tab 维护独立表单/列表 option, 避免相互污染
- 首屏只加载当前 Tab 所需数据, 其余采用懒加载降低首屏压力
- 离开页面前统一处理未保存提示

