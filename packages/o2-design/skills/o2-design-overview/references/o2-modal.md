# O2Modal 模态弹窗

O2Modal 是对 choerodon-ui/pro Modal 的封装，提供了更便捷的函数式调用方式，支持响应式 children。

## 示例代码

### 基本用法

```tsx
import { O2Modal, designPage } from 'o2-design';

export default designPage(() => {
  const handleOpen = () => {
    O2Modal.open({
      title: '提示',
      children: '确认要执行此操作吗？',
      onOk: () => {
        console.log('点击了确定');
      },
      onCancel: () => {
        console.log('点击了取消');
      },
    });
  };

  return () => <button onClick={handleOpen}>打开弹窗</button>;
});
```

### children 函数写法（响应式）

```tsx
import { O2Modal, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ count: 0 });

  const handleOpen = () => {
    O2Modal.open({
      title: '响应式弹窗',
      children: ({ close, update }) => (
        <div>
          <p>计数: {state.count}</p>
          <button onClick={() => state.count++}>增加</button>
          <button onClick={close}>关闭</button>
        </div>
      ),
    });
  };

  return () => <button onClick={handleOpen}>打开响应式弹窗</button>;
});
```

### 确认框

```tsx
import { O2Modal } from 'o2-design';

// 确认框
O2Modal.confirm({
  title: '确认删除？',
  children: '删除后无法恢复，请确认。',
  onOk: async () => {
    await deleteApi();
  },
});

// 快捷方法
O2Modal.success({ children: '操作成功！' });
O2Modal.error({ children: '操作失败，请重试。' });
O2Modal.warning({ children: '警告：xxx' });
O2Modal.info({ children: '提示信息' });
```

### 异步确认框

```tsx
import { O2Modal } from 'o2-design';

const result = await O2Modal.asyncConfirm({
  title: '确认提交？',
  children: '提交后将无法修改。',
});
if (result === 'ok') {
  console.log('用户点击了确定');
} else {
  console.log('用户取消了');
}
```

### 只传 children 简写

```tsx
import { O2Modal } from 'o2-design';

// confirm 系列方法可以直接传字符串
O2Modal.confirm('确定要删除这条记录吗？');
O2Modal.success('保存成功！');
```

## O2Modal.open

### 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | ReactNode | - | 弹窗标题 |
| children | ReactNode \| ((props) => ReactNode) | - | 内容，支持函数写法获取 close/update |
| onOk | () => boolean \| void \| Promise | - | 确定回调，返回 false 可阻止关闭 |
| onCancel | () => boolean \| void \| Promise | - | 取消回调，返回 false 可阻止关闭 |
| onClose | () => boolean \| void \| Promise | - | 关闭回调，返回 false 可阻止关闭 |
| destroyOnClose | boolean | false | 关闭后是否销毁 |
| closable | boolean | true | 弹框右上角是否显示关闭按钮 |
| movable | boolean | true | 是否可拖动 |
| resizable | boolean | true | 是否可调整大小 |

说明：

- 继承 choerodon-ui/pro Modal 的所有属性
- onOk/onCancel/onClose 中抛出异常不会在左下角显示小提醒
- children 为函数时，从函数参数可以获得 `close`、`update`、`visible` 等 modal 方法/状态

## O2Modal.confirm / success / info / error / warning

### 参数（以 confirm 为例，其他方法同理）

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | ReactNode | - | 弹窗内容 |
| title | ReactNode | - | 标题（默认显示"提示"） |
| type | info/success/error/warning | info | 图标类型 |
| iconType | string | - | 自定义图标类型 |
| okCancel | boolean | true | 是否显示取消按钮 |
| onOk | () => boolean \| void \| Promise | - | 确定回调 |
| onCancel | () => boolean \| void \| Promise | - | 取消回调 |

说明：

- 简写: 参数可以直接写 children 字符串 `O2Modal.confirm('确定要删除吗？')`
- confirm 默认无 closable/movable/resizable，标题有默认值，样式统一

## O2Modal.asyncConfirm / asyncSuccess / asyncInfo / asyncError / asyncWarning

异步确认框，返回 Promise。resolve 为 `'ok'` 表示确定，`'cancel'` 表示取消。

## 常见问题

### 为什么 onOk 报错了但没有提示？

- 这是 O2Modal 特意设计的处理方式，与原生 Modal.open 不同
- 异常会被捕获并打印到控制台，不会弹出小提醒打断用户

### children 函数写法如何使用 close/update？

```tsx
O2Modal.open({
  children: (modalProps) => {
    // modalProps 包含 close, update, visible 等
    return (
      <div>
        <button onClick={modalProps.close}>关闭</button>
        <button
          onClick={() => {
            modalProps.update({ title: '新标题' });
          }}
        >
          更新标题
        </button>
      </div>
    );
  },
});
```

### confirm 与 open 的区别？

- `confirm` 是确认框场景，有默认样式（无 closable，标题默认"提示"）
- `open` 是通用弹窗，更灵活，无默认样式干预

## 特殊使用场景

- 点击按钮后二次确认场景, 可以使用 O2Button 的 confirmType="modal" 来实现, 详见 `./o2-button.md` 中的 confirmType 相关部分
- 表单校验失败后弹窗提示：使用 `O2Modal.error()`
- 需要用户二次确认的危险操作：使用 `O2Modal.confirm()` 或 `asyncConfirm()`
- 动态内容弹窗：使用 `children` 函数写法，响应式更新

## 版本支持

- `asyncConfirm` 及异步系列方法在 `1.6.37` 起支持
- children 函数写法在 `1.6.37` 起支持
