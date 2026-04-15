# 开发规划（按阶段）

## 阶段 1: SKILL.md

目标: 建立入口、边界、资料优先级与 references 导航

交付:

- skills/o2-design-overview/SKILL.md

## 阶段 2: 示例组件文档

目标: 先完成 O2Button、O2Input 两篇标准样例, 作为其他组件文档模板

交付:

- references/o2-button.md
- references/o2-input.md

## 阶段 3: 批量提示词

目标: 形成可复用提示词, 用于调用其他 AI 批量补齐组件文档

交付:

- references/ai-batch-prompt.md

## 阶段 4: 复杂场景文档

目标: 在普通组件完成后补齐核心复杂能力

范围:

- O2Table 与 O2Column 系列
- O2Form 与 O2Form 系列
- 列表页模板、详情页模板、多表单详情页、Tabs 详情页

建议拆分:

1. O2Table 总览 + useTableOption 专题
2. O2Column 分类文档（输入类/选择类/展示类/操作类）
3. O2Form 总览 + useFormOption 专题
4. 页面模板（列表页、详情页、头行结构、Tabs 结构）

## 阶段 5: 常见问题专题

目标: 汇总高频坑位与修复策略

范围:

- 响应式陷阱
- 性能优化
- 动态列与动态表单问题
- 异步与并发问题
- Hooks/生命周期误用

交付:

- references/common-pitfalls.md

