# 定义组件

## designComponent

`designComponent` 是一个工厂函数, 接收一个配置对象, 返回一个 React 组件, 提供了更强大的功能, 例如响应式状态管理、插槽等

具体用法见 `design-component.md`

关于插槽和作用域插槽见 `slots.md` 和 `scope-slots.md`, 使用时机类似 Vue 的插槽, 适用于“父组件传内容，子组件决定放置位置”的场景

## designPage

`designPage` 是基于 `designComponent` 的简化版, 不再支持插槽等复杂功能, 更类似普通 React 组件

```tsx
const designPage = (setup: (props: any) => any) => designComponent({
    inheritAttrs: false,
    setup: ({attrs}) => setup(attrs)
})
```

```tsx
const Page = designPage((props) => {
  const state = reactive({count: props.initialCount || 0});
  const methods = {
    increment() {
      state.count++;
    },
  };
  const doubleCount = computed(() => state.count * 2);
  return () => (
    <div onClick={props.onClick || methods.increment}>
      页面内容 {state.count} {doubleCount.value}
    </div>
  );
});
```

渲染出来的东西就是简单的

```jsx
{/* <Page initialCount={1} /> */}
<div>
  页面内容 1 2
</div>
```

虽然名字是 designPage, 但它并不能使用 usePageTitle、usePageOperator 这些页面级的功能, 只能使用 useTableOption 和生命周期函数等组件级的功能, 因此它更适合一些特殊的页面, 例如一个非常简单的页面或者一个不需要使用页面级功能的组件, 但对于大多数标准中台页面来说, 推荐使用 designO2Page 和 designKeepAlivePage 来定义组件

## designO2Page 和 designKeepAlivePage

这两个方法都可以生成标准中台页面组件

其中 designKeepAlivePage 基于 designO2Page, 增加了页面缓存功能, 从别的路由跳回时会保留状态, 不会重新渲染, 适用于需要保留页面状态的场景, 例如从详情页返回列表页时要求保留列表页的状态(分页、筛选条件等)

具体使用参考 `references/page/page-empty-template.md` 中的示例

标准中台页面组件最终渲染的内容如下

```jsx
<>
  {/* Header 和 Content 都是 HZero 的中台标准页面组件 */}
  <Header
    title={/* 页面标题, 使用 usePageTitle 定义 */}
    backPath={/* 返回路径, 使用 usePageBackPath 定义 */}
  >
    {/* 这里是页面标题旁边的操作区, 使用 usePageOperator 定义 */}
  </Header>
  <Content>
    {/* 这里是页面的主体内容, 页面 setup 中定义 */}
  </Content>
</>
```

## 版本支持

- 非常重要: `designKeepAlivePage` 是 `1.8.0` 以后的才能使用的方法
