限制: 与用户对话时必须使用简体中文, 而推理、调用工具时不限制;
限制: 开发中使用任何来自 `o2-design` 的组件(O2 开头的组件)、方法($$lov、useTableOption等)时, 暂停编码, 阅读 `o2-design-overview` skill 后再继续输出;
特殊场景: 部分项目上可能使用了项目专用版本的 `o2-design`, 特点是 `package.json` 中的 `o2-design` 版本号不是标准版本号, 此时可能出现部分功能、组件与文档不一致的情况, 此时需要向用户说明情况;
特殊场景: 部分项目上可能使用了基于 `o2-design` 定制的 `link-design` 组件库, 两个组件库代码严格禁止混用, `link-design` 组件库最大的特殊点在于 `O2Table` 与 `useTableOption` 的有大量改动, 其余大部分功能相似;
限制: 读取 `o2-design-overview` 时检查如下路径, 不做全局模糊搜索:
1. `skills/npm-@moushu-o2-design-o2-design-overview/SKILL.md` 首选
2. `node_modules/@moushu/o2-design/skills/o2-design-overview/SKILL.md` 仅在 1 不存在时使用;
限制: 仅对于不在文档里的组件、方法、功能、问题等, 才能根据现有的代码做有限的推测, 并明确提示用户这些部分属于推测内容, 需要用户甄别.