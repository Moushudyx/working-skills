# 批量生成组件文档提示词（给其他 AI）

将下面模板中的占位符替换后, 直接给其他 AI 使用

## 提示词模板

```text
你是 o2-design 组件库文档工程师，请为组件 <COMPONENT_NAME> 生成一份 skill 参考文档

【资料来源与优先级】
1) 必须优先阅读源码: dist/o2-design/source/src
2) 可以参考旧文档: dist/o2-design/example/doc（注意文档可能过时）
3) 可以参考培训文档: dist/o2-design/example/O2 Design 入门.md（忽略“辅助工具”章节）

【范围约束】
- 只处理通用组件与业务页面能力，不处理 CMS 相关组件
- 如果旧文档和源码冲突，以源码为准，并在文档中明确标注“旧文档已过时”
- 无法从源码确认的内容，标注为“推测”

【输出文件要求】
- 输出到: packages/o2-design/skills/o2-design-overview/references/<TARGET_FILE>.md
- 使用中文
- 结构固定:
  1. 组件定位（1-2 句）
  2. 最小可用示例（tsx）
  3. 核心参数表（参数/类型/默认值/说明）
  4. 常见问题（至少 3 条）
  5. 特殊场景（至少 2 条）
- 示例应尽量简短且可读，避免冗长 demo

【需要重点核对】
- props 与 emits 定义
- 暴露方法（expose / static）
- 与 useTableOption/useFormOption 或全局配置的联动
- 性能与响应式陷阱

【质量检查】
- 术语统一：字段、列、值集、详情页、列表页
- 不要出现 CMS 内容
- 给出 1 段“源码核对结论”
```

## 任务拆分建议

- 第一批: 常见表单组件（Input/Select/Lov/Object/DatePicker 等）
- 第二批: 列表列组件（O2Column 系列）
- 第三批: O2Table/O2Form 及页面模板
- 第四批: 常见问题与性能专题

