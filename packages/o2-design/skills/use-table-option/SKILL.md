---
name: use-table-option
description: useTableOption 列表配置与常见用法
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2ColumnInput } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({
    // 权限编码，一般项目中用不到
    permission: 'o2.o2xxx.yyy.zzz.ps.button',

    // 列表增删改查用的 URL
    url: `${prefix}/v1/${organizationId}/xxx`,
    /*
    url: {
      // 默认接口路径
      // 默认调用方法是：
      // 查询 GET 新建 POST 编辑 PUT 删除 DELETE
      base: `${prefix}/v1/${organizationId}/xxx`,

      // 可以单独指定某个调用类型使用的接口路径
      query: `${prefix}/v1/${organizationId}/xxx/list`,

      // url 可以设置为一个函数，适用于接口可能会变化情况
      insert: () => `${prefix}/v1/${organizationId}/xxx/create/${某个会变动的参数}`

      // 还可以写成这种格式，更细地处理网络请求
      update: {
        url: () => `${prefix}/v1/${organizationId}/xxx/update/${某个会变动的参数}`,
        method: 'POST', // 如果只想更改方法，可以去掉 url 字段只写个 method
      }

      // 如果某个接口确实和标准接口不太一样，那么需要这样写完全代理某个网络请求
      delete: {
        request(requestConfig) {
          return http.post(requestConfig.url, requestConfig.body)
        }
      }
    }
    */

    // 主键字段，除非有勾选相关的逻辑，否则一般用不到
    keyField: 'xxxId',
    // 是否展示序号列
    indexing: false,
    // 是否多选
    multipleCheck: true,
    // 是否单选（如果多选、单选都是 false，那么列表将不渲染勾选列）
    singleCheck: false,
    // 新建时新建的对象默认值，适用于某些字段有默认值的场景
    // 可以写成一个函数的形式，适用于默认参数可能会变化情况
    defaultNewRow: { enableFlag: 0 }, // () => ({ enableFlag: 某个会变动的参数 }),
    // 编辑模式
    // 这个参数默认会根据可编辑列的数量决定用哪种编辑方式，列数量 ≤ 5 时是行内编辑
    // inline 行内编辑，最常见的编辑模式，直接在列表中将这一行变成可编辑状态填写
    // form 屏幕右侧弹框编辑，弹框中有一个表单，在这个表单中编辑
    editType: 'inline',
    // 页面加载后列表就会根据 url 的配置自动查询信息
    // 这个参数默认为 true
    // 将这个置为 false，列表就不会默认查询，需要代码调用/用户手动触发查询
    loadOnStart: false,

    // 自带的新建、编辑、删除三个功能是否启用
    enable: {
      // insert: true, // 启用自带的新建功能
      // update: true, // 启用自带的编辑功能
      // delete: true, // 启用自带的删除功能
    },
    // 隐藏指定按钮，主要用于隐藏自带的按钮
    // 默认的按钮编码有
    // insert 新建 update 编辑 delete 删除
    // 其中 按钮编码-in（或者 out）可以特指行上/外层按钮
    // 比如说自带的删除按钮就有行上和外层两个，可以根据实际情况隐藏一个
    hideButton: {
      // insert: true, // 隐藏默认新建按钮
      // update: true, // 隐藏默认编辑按钮
      // delete: true, // 隐藏默认删除按钮
      'delete-out': true, // 隐藏默认批量删除按钮
      'delete-in': true, // 隐藏默认行内删除按钮
    },
    // 自定义按钮，这块功能很多且很复杂
    buttons: [],
    // 实际上手你会发现列表的外层按钮都放在页面右上角了
    // 如果不想要将外层按钮放在页面顶部，可以将这个置为 true
    // 这样外层按钮就会渲染在列表的上面靠右的位置
    notPlaceButtonInPageOperator: false,

    // 钩子函数，这块功能很多且很复杂
    hooks: {},
  });

  return () => (
    <O2Table option={option}>
      {/* 开启 formFilter 即出现在查询表单 */}
      <O2ColumnInput title="名称" field="name" formFilter />
    </O2Table>
  );
});
```

# 常用配置

- `url`：增删改查接口，可为字符串/对象/函数。
- `keyField`：主键字段。
- `editType`：`inline`/`form`。
- `defaultNewRow`：新建行默认值。
- `buttons`/`hideButton`：按钮配置。
- `hooks`：各阶段钩子。

# 进阶要点

- `deepField`：启用链式字段（如 `a.b.c`）。
- `cascadeFields`：在列上设置，用于字段联动。
- `methods.getParams()`：获取上一次查询的筛选参数。
