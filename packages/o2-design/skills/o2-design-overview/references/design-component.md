# designComponent

`designComponent` 是定义组件的基础方法

```tsx
const Component = designComponent({
  name, // 挺没用的东西, 不要管, 如果想要自定义组件名, 直接写 Component.displayName = 'XXX' 就好
  inheritAttrs: true, // 类似 Vue 的参数透传, 默认为 true, 设为 false 后组件标签上未声明的属性和事件将不会被透传 
  inheritPropsType: HTMLDivElement, // 用于 typescript 类型提示, 被透传组件的类型, 传这个可以让使用者拿到被透传组件的 props 类型提示, 例如 HTMLDivElement, 这样使用 Component 时就会有 HTMLDivElement 的类型提示
  props: {
    // 定义组件的 props, 组件使用时传入
    // 例如 <Component title="标题" />
    title: String,
  },
  emits: {
    // 定义组件的事件, 组件使用时通过 event.emit.事件名() 触发
    // 例如 props.onClick() 或者 event.emit.onClick()
    onClick: () => true,
  },
  // 插槽详解见 `slots.md`
  slots: ['default'], // 定义组件的插槽, 组件使用时传入内容
  // 定义域插槽详解见 `scope-slots.md`
  scopeSlots: {
    title: (scope: {title: string, count: number}) => true, // 定义组件的作用域插槽, 组件使用时传入一个函数, 函数参数是子组件传出的作用域数据
  },
  expose: { a: 1 }, // Component.a 可以访问到 1, 定义组件对外暴露的属性和方法
  setup({ props, event, slots, attrs, scopeSlots }) {
    // setup 函数是组件的核心, 定义组件的状态、方法、渲染函数等
    const state = reactive({ count: 0 }); // 定义响应式状态
    const methods = {
      increment() {
        state.count++;
      },
    };
    // 没有 refer 的写法
    // return () => (
    //   <div onClick={methods.increment}>
    //     {scopeSlots.title.isExist() ? scopeSlots.title({title: props.title, count: state.count}) : <>{props.title} {state.count}</>}
    //     {slots.default(<>默认内容</>)}
    //   </div>
    //  );
    // 有 refer 的写法, 可以在 <Component /> 上通过 ref 获取 state 和 methods
    return {
      refer: {
        state,
        methods,
      },
      render: () => {
        return (
          <div onClick={methods.increment}>
            {scopeSlots.title.isExist() ? scopeSlots.title({title: props.title, count: state.count}) : <>{props.title} {state.count}</>}
            {slots.default(<>默认内容</>)}
          </div>
        );
      },
    }
   },
});

```
