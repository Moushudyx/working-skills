```jsx
// 示例: 课程管理列表页
import React from 'react';
import {
  designO2Page,
  useHttp,
  usePageBackPath,
  // usePageOperator, // 渲染在页面顶部的按钮
  usePageTitle,
  // useReactHooks, // 用于将 React 的 Hooks 改造为 O2 的
  useTableOption,
  // watch,
} from 'o2-design';
// import { useLocation } from 'react-router';
// import O2ButtonCollapse from 'o2Components/O2ButtonCollapse';
import formatterCollections from 'utils/intl/formatterCollections';
import intl from 'utils/intl';
import { getCurrentOrganizationId, getResponse } from 'utils/utils';
import { O2MD_M } from 'o2Utils/config';

// 服务编码
const prefix = `${O2MD_M}`;
const organizationId = getCurrentOrganizationId();
// 部分页面上可能存在特殊写法 getPlatformUrl
// const getPlatformUrl = platformUrlFactory(O2MD_M); // platformUrlFactory 返回一个可以适配平台层的 url 生成器
// getPlatformUrl('course') // 正常情况下相当于 `${prefix}/v1/${organizationId}/course`, 但当页面渲染在 HZero 的平台层时, 没有 organizationId, 此时 getPlatformUrl('course') 返回值会变成 `${prefix}/v1/course`
// 可用 import { isTenantRoleLevel } from "utils/utils"; 配合判断当前页面渲染在 true=租户层 false=平台层
// 实际项目上, 除非有极其特殊的需求, 否则绝大部分页面都没有渲染在平台层的必要, 不过这里的 getPlatformUrl 还是可以作为一个工具函数来使用, 统一生成接口地址, 减少出错概率

// 这里使用的 designKeepAlivePage 是 o2-design 1.8.0 以后的才能使用的方法, 如果页面不需要缓存, 直接使用 designO2Page 即可
// 注意与 designPage 区分:
// designPage 是不带任何功能的最基础的定义组件的方法(只能使用 useTableOption 和生命周期函数)
// designO2Page 上可以使用 usePageTitle、usePageOperator 这些模板页面才有的功能
const Page = designO2Page(({ history }) => {
  usePageTitle(() => intl.get('多语言前缀.多语言编码').d('页面标题'));

  usePageBackPath(() => '返回上一页的路径') // 返回 null 或者不使用此方法则不展示返回按钮

  // 额外的页面操作按钮, 会被渲染在页面顶部
  // usePageOperator((prev) => (
  //   <>
  //     {/* 这里的 prev 是其他地方渲染的按钮 */}
  //     {prev}
  //     {/* O2ButtonCollapse 用于实现超过 5 个按钮时折叠多于按钮的逻辑, 上面的 prev 也可以塞进这里 */}
  //     <O2ButtonCollapse reverse>{getButtonRender()}</O2ButtonCollapse>
  //   </>
  // ));

  const http = useHttp();

  const state = reactive({});

  const methods = {};

  return () => (
    <>
      页面内容, 可以使用 state 和 methods 中定义的状态和方法
    </>
  );
});
// formatterCollections 自动加载对应前缀的多语言资源
export default formatterCollections({ code: ['多语言前缀'] })(Page);
```
