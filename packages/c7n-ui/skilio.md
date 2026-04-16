限制: 与用户对话时必须使用简体中文, 而推理、调用工具时不限制;
限制: 开发中使用任何来自 `choerodon-ui` `choerodon-ui/pro` 的组件、方法时, 暂停编码, 阅读 `c7n-ui-overview` skill 后再继续输出;
限制: 确认需要读取某个文档时, 必须完整读取整个 md 文件, 因为文件底部可能存在常见问题提示;
限制: 读取 `c7n-ui-overview` 时检查如下路径, 不做全局模糊搜索:
1. `skills/npm-@moushu-c7n-ui-c7n-ui-overview/SKILL.md` 首选
2. `node_modules/@moushu/c7n-ui/skills/c7n-ui-overview/SKILL.md` 仅在 1 不存在时使用;
限制: 仅对于不在文档里的组件、方法、功能、问题等, 才能根据现有的代码做有限的推测, 并明确提示用户这些部分属于推测内容, 需要用户甄别.