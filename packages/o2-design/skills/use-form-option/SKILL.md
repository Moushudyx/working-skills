---
name: use-form-option
description: useFormOption 详情页表单配置与多表单协作
---

# 基本用法

```jsx
import { designPage, useFormOption, O2Form, O2FormInput } from 'o2-design';

export default designPage(() => {
  const formOption = useFormOption({
    // 权限编码，一般项目中用不到
    permission: 'o2.o2xxx.yyy.zzz.ps.button',

    // 可以参考 useTableOption，只需要注意查询接口就行了
    url: {
      // 默认接口路径，和 useTableOption 的大差不差
      base: `${prefix}/v1/${organizationId}/xxx`,
      // useFormOption 的查询是 url.detail 与 useTableOption 的不同需要注意
      // 这里的 formOption.formData 见下面的 state.formData
      detail: () => `${prefix}/v1/${organizationId}/detail/${formOption.formData.xxxId}`,
      // 其他的都大差不差
      update: { method: 'POST' },
      delete: {},
      insert: {},
    },

    // 表单基础状态
    state: {
      // 表单的默认数据内容
      // 这个 id 一般是列表页跳转详情页带过来的那个 id
      formData: { xxxId: id },
      // 表单的默认状态
      // insert 新建状态；update 查看/编辑状态
      // 实际情况可能有很多种（比如说有同学的编码习惯是 id 为空表示新建）
      status: id === 'create' ? 'insert' : 'update',
    },
    // 只在新建的时候生效
    defaultNewRow: { enableFlag: 0 }, // () => ({ enableFlag: 某个会变动的参数 }),
    // 与 useTableOption 类似，state.status 为 update 时是否查询表单数据
    // 默认为是（即页面加载时自动查询）
    loadOnStart: false,
    // 如果数据结构并非单层平铺，需启用 deep 模式
    // 比如说正常字段可能是 { a, b, detailAddress, provinceCode }
    // 而某个页面上的字段是 { a, b, address: { detailAddress, provinceCode } }
    deepField: true,
    // 这里控制 state.status 为 update 时是否直接打开编辑状态
    // 很少用到，一般用于客户需求进入详情页需要直接开启编辑的场景
    defaultEditing: true,
    // 与 useTableOption 类似，不过只有一个是否启用编辑功能
    // 注意：这个不会隐藏编辑按钮，只是把编辑按钮置灰
    enable: false,
    // 隐藏指定按钮，主要用于隐藏自带的按钮
    // 默认的按钮编码：update 编辑
    // 与 useTableOption 不同，这里没有行内行外之分
    hideButton: {
      update: true, // 隐藏默认编辑按钮
    },
    // 与 useTableOption 差不多，不过这里没有行内行外之分
    buttons: [],
    // 与 useTableOption 差不多，有些区别
    hooks: {},
  });

  return () => (
    <O2Form option={option}>
      <O2FormInput label="名称" field="name" required />
    </O2Form>
  );
});
```

# 常用配置

- `state.status`：`insert`/`update`。
- `defaultEditing`：更新态是否默认可编辑。
- `buttons`/`hideButton`：表单按钮配置。
- `formatFormData`：自动补齐字段以避免响应式陷阱。
- `hooks`：加载/保存前后钩子。

# 多表单协作

- 一个 `option` 可挂载多个 `O2Form`。
- `methods.validateAll()` 可统一校验。
