# 新页面注册与权限规范

## 目标

明确新页面从“可访问”到“可控权”的完整注册路径。

## 最小注册清单

1. 根据页面名称确定页面编码最后一段、页面路由、页面文件路径
2. 在 `packages/hzero-front-adidas-chase/config/config.ts` 中注册路由
3. 将“页面路由 + 页面编码最后一段”发给人类开发者
4. 等待人类开发者在线上环境注册页面、配置菜单并分配权限
5. 人类开发者返回完整页面编码
6. 用完整页面编码补全 `permissionKey`
7. 再继续按钮权限码、页面功能等后续开发

## 人类开发者必须处理的步骤

以下步骤必须由人类开发者在线上环境完成，智能体不能替代：

1. 切换到平台租户。
2. 打开“系统管理-菜单管理-菜单配置”。
3. 配置菜单并获取菜单编码。
4. 打开“系统管理-角色管理-角色管理”。
5. 在页面顶部将“当前角色”切换为平台的系统管理员。
6. 在左侧列表中找到“营销与渠道产品部”的租户管理员。
7. 点击后切到“分配权限”页签。
8. 分配权限并点击“保存权限”。

智能体在此阶段的职责：

- 产出路由配置
- 确定页面编码最后一段
- 告知人类开发者需要线上注册
- 等待完整页面编码返回后再继续开发

## 路由规范

- 路由 path 使用中划线命名。
- 组件指向页面 `pages` 入口。

示例：

```ts
{
  path: '/omni-chase/example-page', // 路由，在系统中注册页面用这个
  component: './examplePage/pages', // 默认取此目录下的 index
}
```

带有子页面的写法

```ts
{
  path: '/omni-chase/example-page', // 路由，在系统中注册页面用这个
  routes: [
    // 第一个页面是默认页面，跳转 /omni-chase/example-page 会自动重定向到 /omni-chase/example-page/subpage-aaa
    {
      path: '/omni-chase/example-page/subpage-aaa',
      component: './examplePage/pages',
    },
    // 其他子页面，可以跳转这个 path 来进入
    {
      path: '/omni-chase/dashboards/subpage-bbbb',
      component: './examplePage/pages/subpageBBB',
    },
  ],
}
```

## 权限规范

建议模式：

```ts
const permissionKey = 'hzero.example.mgmt.example-page.ps';
```

其中 `example-page` 对应人类开发者在线上注册后给回的完整页面编码最后一段所属完整编码。

按钮权限码实践中存在两种写法，最终效果理论一致，推荐采用规范写法：

- 推荐：`${permissionKey}.ps.button.submit`
- 存量常见：`${permissionKey}.button.submit`

新增功能优先使用推荐写法，并在评审中保持一致。

## 页面创建顺序建议

1. 先确定页面路由、页面编码最后一段、文件路径
2. 注册路由
3. 把路由与页面编码最后一段发给人类开发者
4. 等待人类开发者返回完整页面编码
5. 再建 `store` DataSet 与 `pages` 页面主体
6. 接入 `components`
7. 配置完整 `permissionKey` 与按钮权限码

## 坑点

- `permissionKey` 为空字符串会导致权限表达式异常。
- 路由可访问但权限按钮不可见，多数是编码前缀不一致。
- 未先在网页端注册页面，通常无法得到正确页面编码。
- 未提醒人类开发者完成菜单分配，页面可能能打开但没有对应权限。
