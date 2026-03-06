# link-tree-pro 高级树组件

`link-tree-pro` 是树 + 右侧内容区的复合布局组件，支持懒加载、多选、拖拽、搜索、面板缩放等。

> 版本要求: 组件版本 >= 1.8.23；多选相关问题建议升级到 >= 1.9.17。

## 示例代码

```vue
<template>
    <div style="height:500px">
        <link-tree-pro
            ref="tree"
            :data="treeData"
            keyField="id"
            labelField="text"
            childrenField="children"
            :current.sync="current"
            @click-node="handleClickNode"
        >
            <template slot-scope="{ treeNode }">
                <span>{{ treeNode.data.text }}</span>
            </template>
            <template slot="right">
                <div style="padding: 16px">
                    <link-button @click="$refs.tree.methods.expandAll()">全部展开</link-button>
                    <link-button @click="$refs.tree.methods.collapseAll()">全部收起</link-button>
                </div>
            </template>
        </link-tree-pro>
    </div>
</template>
```

## 插槽

| 插槽名称 | 作用域参数 | 说明 |
| --- | --- | --- |
| default | `{ treeNode }` | 自定义树节点渲染 |
| right | --- | 自定义右侧面板 |

## Props 属性

| 属性名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | String | --- | 左侧面板标题 |
| noHeader | Boolean | --- | 隐藏标题与展开收起按钮 |
| onlyTree | Boolean | --- | 仅显示树面板 |
| noSearch | Boolean | --- | 隐藏搜索栏 |
| value | String, String[], Object[] | --- | 绑定值 |
| data | Object[] | --- | 树数据 |
| keyField | String, Function | --- | 节点唯一标识字段 |
| labelField | String, Function | --- | 节点文本字段 |
| childrenField | String, Function | --- | 子节点字段 |
| tipField | String, Function | --- | 提示字段 |
| expand | String[] | --- | 已展开节点 keys |
| active | String[] | --- | 高亮节点 keys |
| current | Object | --- | 当前选中节点 |
| multiple | Boolean | --- | 是否多选 |
| singleValueType | last, all | --- | 单选绑定值结构 |
| checkLast | Boolean | --- | 是否仅可选择叶子节点 |
| checkStrictly | Boolean | false | 父子勾选是否解耦 |
| isCheckAble | Function | --- | 节点是否可选 |
| isLeaf | Function | --- | 自定义叶子节点判断 |
| filterText | String | --- | 搜索关键字 |
| filterMethod | Function | --- | 自定义搜索匹配 |
| lazy | Boolean | --- | 是否懒加载 |
| getChildrenData | Function | --- | 懒加载子节点方法 |
| setChildrenData | Function | --- | 当 `childrenField` 为函数时设置子节点数据 |
| according | Boolean | --- | 手风琴模式 |
| autoExpandParent | Boolean | --- | 展开时是否自动展开父节点 |
| autoCollapseChildren | Boolean | --- | 收起时是否自动收起子节点 |
| autoCheckChildren | Boolean | true | 勾选时是否联动子节点 |
| autoCheckParent | Boolean | true | 勾选时是否联动父节点 |
| treeWidth | Number | --- | 左侧树面板宽度 |
| treeCollapse | Boolean | --- | 左侧面板是否折叠 |
| loading | Boolean | --- | 加载状态 |
| resizable | Boolean | true | 左侧面板是否可拖拽调整宽度 |
| handleFilter | Function | --- | 手动执行搜索 |
| filterOnEnter | Boolean | --- | 是否仅回车触发搜索 |
| draggable | Boolean | --- | 是否开启拖拽 |
| isAllowDraggable | Function | --- | 节点是否允许被拖拽 |
| isAllowDroppable | Function | --- | 节点是否允许被放置 |

## 实例方法

通过 `this.$refs.tree.methods.[方法名]` 调用。

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| expand | keys | 展开指定节点 |
| collapse | keys | 收起指定节点 |
| toggleExpand | keys | 切换展开/收起 |
| expandAll | --- | 展开全部 |
| collapseAll | --- | 收起全部 |
| check | keys | 选中指定节点 |
| uncheck | keys | 取消选中指定节点 |
| toggleCheck | keys | 切换选中状态 |
| checkAll | --- | 全选 |
| unCheckAll | --- | 取消全选 |
| refreshCheckStatus | keys | 刷新节点选中状态 |
| clearInvalidChecked | --- | 清空无效选中项 |
| getParentChildren | node | 获取兄弟节点 |
| getParentChildrenData | node | 获取同辈节点及其后代数据 |
| getReactiveChildrenData | node | 获取响应式子节点数据 |
| removeSelf | node | 删除当前节点 |
| previousSibling | move, start | 将 `start` 插入到 `move` 前 |
| nextSibling | move, start | 将 `start` 插入到 `move` 后 |
| unshiftChild | move, start | 将 `start` 插入到 `move` 子节点首位 |

## 事件

| 事件名 | 参数说明 | 说明 |
| --- | --- | --- |
| input | `value: object[]` | 多选绑定值变化（`v-model`） |
| update-data | `data: object[]` | 树数据变化（懒加载/拖拽后） |
| update-filter-text | `text: string` | 搜索文本变化 |
| update-expand | `val: string[]` | 展开节点变化 |
| click-node | `treeNode: iTreeNode` | 点击节点 |
| update-current | `val: object` | 当前选中节点变化 |
| update-tree-width | `val: number` | 树面板宽度变化 |
| update-tree-collapse | `val: boolean` | 树面板折叠状态变化 |
| drag-change | `data: iTreeDragChangeData` | 拖拽结果变化 |

## 特殊组合规则

- 绑定单值: `checkLast=false` + `singleValueType='last'`
- 绑定多值且只能选叶子: `checkLast=true` + `singleValueType='all'`
- 绑定多值且可选任意节点: `checkLast=false` + `singleValueType='all'`

## 相关对象类型

### iTreeDragChangeData

拖拽事件返回对象，核心字段:

| 字段 | 说明 |
| --- | --- |
| data | 被拖拽节点数据 |
| newParent / oldParent | 新旧父节点数据 |
| node | 被拖拽节点对象（`iTreeNode`） |
| newSiblings / oldSiblings | 新旧同级数组 |
| undo | 撤销本次拖拽 |

### iTreeNode

节点对象，常用成员:

| 字段/方法 | 说明 |
| --- | --- |
| key / level / data | 节点标识、层级、原始数据 |
| children() / parent / parents() | 子节点与父链 |
| isLeaf() / isExpanded() | 叶子与展开状态 |
| checkStatus() / isCheckAble() | 选中状态与可选状态 |
| isActive() / isCurrent() | 激活与当前态 |
