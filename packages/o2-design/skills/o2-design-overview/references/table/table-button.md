# useTableOption 中的按钮配置

## 按钮配置

按钮本身的使用方式可以参考 `../o2-button.md`

通用参数

```ts
interface iTableOptionButtonBase {
  position: 'in' | 'out'; // [必填] 按钮位置, in 表示行内按钮, out 表示外部按钮
  // type 不为 other 的按钮会被视为默认按钮, 受到 enable 配置的启用/禁用控制
  // 一般来说自定义按钮直接使用 other 即可
  type: 'insert' | 'update' | 'delete' | 'other'; // [必填]
  // code 是按钮的唯一标识, 也是权限标识的一部分, 具体权限字符串为 `${permission}.${code}`
  // 如果想要单独控制权限, 可以使用 permissionCode 覆盖掉默认的 `${permission}.${code}`
  // 如果想要完全控制权限编码, 可以在 permissionCode 中直接写完整的权限字符串
  // 具体逻辑是如果 permissionCode 中没有点号, 则默认拼接到 permission 后面; 如果 permissionCode 中有点号, 则直接使用 permissionCode 作为权限字符串
  code: string; // [必填]
  permissionCode?: string;
  // 排序
  seq?: number;
  // 按钮颜色参考 `../o2-button.md` 的 color 配置
  color?: keyof typeof ButtonColor;
  // 按钮二次确认, 参考 `../o2-button.md` 的 confirmType 和 confirmTitle 配置
  confirmType?: 'popconfirm' | 'modal';
  confirmTitle?: ReactNode;
}
```

外部按钮, 即 position 为 'out' 的按钮, 会被渲染在页面顶部, 适合放置全局操作的按钮

如果 useTableOption 配置了 `notPlaceButtonInPageOperator: true` 则按钮会被渲染在列表的右上角区域(查询表单下面)，而不是页面顶部

```ts
type iTableOptionButtonOuter = iTableOptionButtonBase & {
  position: 'out';
  handler?: (e: React.MouseEvent) => void | Promise<void>;
  render?: () => ReactNode; // 使用 render 渲染按钮时会忽略 handler disabled icon label color confirmType 等作用于按钮本身的参数
  label: string | (() => string); // 即使使用 render 也建议填写 label, 因为权限系统会使用 label 作为按钮名称
  icon?: string | (() => string);
  show?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
  confirmTitle?: ReactNode | (() => ReactNode);
};
```

行内按钮, 即 position 为 'in' 的按钮, 会被渲染在每行的操作列中, 适合放置针对行数据的操作按钮

```ts
type iTableOptionButtonInner = iTableOptionButtonBase & {
  position: 'in';
  handler?: (selectNode: iTableNode, e: React.MouseEvent) => void;
  render?: (selectNode: iTableNode) => ReactNode;
  label: string | ((selectNode: iTableNode) => string);
  icon?: string | ((selectNode: iTableNode) => string);
  show?: boolean | ((selectNode: iTableNode) => boolean);
  disabled?: boolean | ((selectNode: iTableNode) => boolean);
  confirmTitle?: ReactNode | ((selectNode: iTableNode) => ReactNode);
};

interface iTableNode {
  data: Record<string, any>;
  editRow: Record<string, any>;
  key: string;
  index: number;
  checkable: boolean; // 表示该行是否可以勾选
  status: {
    edit: boolean;
    removed: boolean; // 表示该行数据是否被临时移除了
    errors: ValidateError[] | null;
  };
}
```

## 默认的按钮

默认按钮包括新增、编辑、删除等操作按钮

默认的新增按钮: `insert` 渲染在外部，默认图标为 `add`，颜色为 `primary`
默认的编辑按钮: `update` 渲染在行内，默认图标为 `edit`
默认的删除按钮: `delete` 同时渲染在外部和行内，默认图标为 `delete`, (外部)颜色为 `default`

## enable

控制默认按钮的启用状态

`enable: boolean` 可以直接控制所有默认按钮的启用/禁用

`enable: { insert: boolean, update: boolean, delete: boolean }` 可以单独控制默认按钮的启用/禁用

## hideButton

`{ [按钮名称]: boolean }` 可以控制按钮的显示/隐藏, 其中按钮名称即为按钮的 type, 如 { insert: true } 表示隐藏默认的新增按钮

特殊用法:

`{ [按钮名称-in/out]: boolean }` 一般用于控制默认的删除按钮, 因为默认删除按钮同时存在行内和外部两种, 如 { 'delete-in': true } 表示隐藏行内的删除按钮, 但保留外部的删除按钮

## 控制默认的按钮

详见 `./table-hooks.md` 中的 `onButtons` 钩子, 可以在钩子中修改按钮的属性来控制按钮的显示/隐藏/禁用等状态
