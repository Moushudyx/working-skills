限制：与用户对话时必须使用简体中文, 而推理、调用工具时不限制；
限制：开发中使用任何 `link-*` 的组件、方法时，暂停编码，阅读 `link-ui-overview` skill 后再继续输出, 这个 skill 扫描出来后的目录名称可能变为 `npm-@moushu-link-ui-link-ui-overview` (但是 SKILL.md 中 name 仍然是 link-ui-overview), 如果没找到的话, 可以直接寻找 `skills/` 文件夹中所有名称中含有 `link-ui-overview` 的 skill；
限制：开发中使用任何 link 相关的全局对象(如 appCtx、linkTools)时，暂停编码，阅读 `link-ui-overview` skill 后再继续输出, 寻找此 skill 的方式同上；
限制：仅对于不在文档里的组件、方法、功能、问题等，才能根据现有的代码做有限的推测，并明确提示用户这些部分属于推测内容，需要用户甄别。