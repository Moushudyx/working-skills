module.exports = function help() {
  return "安装方法（推荐使用 pnpm）：\n1) 在项目中安装此包（开发依赖）：npm i -D @moushu/link-design\n2) 安装 skilio 工具：npm i -D skilio\n3) 运行：npx skilio scan\n\n安装后，skilio 会扫描 node_modules 中的 skills/ 文件夹并将合法 skill 符号链接到你的 AI 工具对应目录。";
};
