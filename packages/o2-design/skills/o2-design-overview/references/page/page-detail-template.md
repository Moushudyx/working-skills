```jsx
// 示例: 课程管理详情页
import React from 'react';
import {
  designO2Page,
  // onMounted,
  // reactive,
  useFormOption,
  useHttp,
} from 'o2-design';
// import { useLocation } from 'react-router';
// import O2ButtonCollapse from 'o2Components/O2ButtonCollapse'; // 超过 5 个按钮时可折叠
import formatterCollections from 'utils/intl/formatterCollections';
import intl from 'utils/intl';
import { getCurrentOrganizationId, getResponse } from 'utils/utils';
import { O2MD_M } from 'o2Utils/config';
import { useFormOptionSetup, useTabs } from 'o2Utils';
import { useBaseInfo } from './BaseInfo';
import { useStudentInfo } from './Tabs/StudentList';

// 服务编码
const prefix = `${O2MD_M}`;
const organizationId = getCurrentOrganizationId();
// 部分页面上可能存在特殊写法 getPlatformUrl
// const getPlatformUrl = platformUrlFactory(O2MD_M); // platformUrlFactory 返回一个可以适配平台层的 url 生成器
// getPlatformUrl('course') // 正常情况下相当于 `${prefix}/v1/${organizationId}/course`, 但当页面渲染在 HZero 的平台层时, 没有 organizationId, 此时 getPlatformUrl('course') 返回值会变成 `${prefix}/v1/course`
// 可用 import { isTenantRoleLevel } from "utils/utils"; 配合判断当前页面渲染在 true=租户层 false=平台层
// 实际项目上, 除非有极其特殊的需求, 否则绝大部分页面都没有渲染在平台层的必要, 不过这里的 getPlatformUrl 还是可以作为一个工具函数来使用, 统一生成接口地址, 减少出错概率

const Page = designO2Page((props) => {
  // const searchParams = new URLSearchParams(props.location.search); // 页面路由的查询参数, 部分情况下用得上
  const http = useHttp();
  // useFormOptionSetup 是详情页的基本功能整合，包含这些常用功能
  // - 路由跳转：点击返回按钮跳回列表页、新建保存后跳转到对应的详情页
  // - 页面标题：详情页、新建页展示不同的页面标题
  // - 获取页面ID：自动从页面路由上读取页面ID
  // - 基本配置：将返回的 configs 直接展开给 useFormOption，完成一些繁琐的基本配置(主要是 state)
  // - 页面钩子：自动调用 useCollapses，返回的 useCollapse 和 renderCollapses 直接可以用
  const { configs, setup, useCollapse, renderCollapses } = useFormOptionSetup({
    props, // 页面参数，不懂则勿动
    listUrl: '/o2rm/course/list', // 列表页路由，点返回按钮跳转
    getDetailUrl: (id) => `/o2rm/course/detail/${id}`, // 详情页路由，新建完毕后跳转
    keyField: 'courseId', // 主键
    paramIdField: 'id', // 页面路由参数上的 id，根据这个设置 configs.state.status
    title: intl.get('o2.md.course.title.detail').d('课程管理详情'), // 正常查看、编辑态下的页面标题
    insertTitle: intl.get('o2.md.course.title.insert').d('新建课程管理'), // 新建状态下的页面标题
    // defaultNewRow: {}, // 推荐写在这里，会自动带入 configs.defaultNewRow 和 configs.state.formData 中
  });

  const formOption = useFormOption({
    // defaultNewRow 和 state 推荐写在 useFormOptionSetup 中, 然后由这个 configs 带入
    ...configs,
    keyField: 'courseId', // useFormOptionSetup 返回的 configs 不会带上 keyField 所以这里需要再定义一遍
    permission: '完整菜单编码.ps.detail.button',
    url: { base: () => `${prefix}/v1/${organizationId}/course` },
    // queryParams: {},
    // deepField: true, // 如果数据结构并非单层平铺，需启用 deep 模式
    // enable: false,
    // hideButton: {},
    buttons: [
      // useFormOption 自带编辑按钮, 如果有特殊需求可以隐藏默认的编辑按钮, 自己渲染一个
      // {
      //   type: 'other',
      //   code: 'edit',
      //   // icon: '',
      //   label: intl.get('o2.md.course.button.edit').d('编辑'),
      //   handler: () => methods.handleEdit(),
      //   // disabled: () => xxxx,
      // },
      {
        type: 'other',
        code: 'publish',
        label: intl.get('o2.md.course.button.publish').d('发布'),
        handler: () => methods.handlePublish(),
      },
    ],
    hooks: {
      onAfterLoad: () => {
        // 数据加载完成后的逻辑
        if (formOption.status !== 'insert') studentOption.methods.reload(); // 头数据加载完毕后查询行数据
      },
    },
  });
  setup(formOption); // 这一步不能少了, setup 方法会将 useFormOptionSetup 的功能与 formOption 链接

  const methods = {
    // useFormOption 自带编辑按钮, 如果有特殊需求可以隐藏默认的编辑按钮, 自己渲染一个按钮并自己控制编辑逻辑
    // /** 编辑 */
    // handleEdit() {
    //   formOption.methods.openEdit();
    // },
    /** 发布 */
    async handlePublish() {
      const data = formOption.formData; // 获取数据
      // 这里可以做校验之类的 具体逻辑略
      // 标准接口失败时会返回 {failed: true, message: '错误信息'} 的格式, 可以通过 getResponse 来统一处理接口响应, 直接拿到成功时的数据, 失败时会自动报错并返回 null
      const res = getResponse(await http.post(`${prefix}/v1/${organizationId}/course/publish`, {
        type: 'single',
        data: data.courseId,
      }));
      if (res) {
        // 成功后的逻辑
        formOption.methods.refresh(); // 刷新数据
      } else {
        // 发布失败后的逻辑, 错误信息会在 getResponse 里自动弹出, 所以这里应该做后续处理, 没有后续处理的话这里也可以不写
      }
    },
  };

  // const state = reactive({});

  // onMounted(async () => {
  //   if (formOption.status !== 'insert') {
  //     if (searchParams.has('xxxId')) {
  //       // const id = searchParams.get('xxxId');
  //     }
  //   }
  // });

  // 折叠表单
  useBaseInfo({ useCollapse, formOption, methods /* , state */ });
  // Tab 信息
  const { useTabPane, renderTabs /* , setActiveKey */ } = useTabs();
  const { studentOption } = useStudentInfo({ useTabPane, formOption, methods /* , state */ });

  return () => (
    <>
      {renderCollapses()}
      {renderTabs()}
    </>
  );
});
// 自动加载页面多语言资源。
export default formatterCollections({ code: ['o2.md.course'] })(Page);

```