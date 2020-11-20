export default [
  {
    path: '/demo1',
    component: 'demo/demo1',
    menu: {
      name: 'demo-用户', // 兼容此写法
      icon: 'BarsOutlined',
    },
    layout: {
      hideNav: false,
    },
    access: 'canRead',
  },
  {
    path: '/demo2',
    component: 'demo/demo2/softTextList',
    menu: {
      name: 'demo-富文本', // 兼容此写法
      icon: 'BarsOutlined',
    },
    layout: {
      hideNav: false,
    },
    // access: 'canRead',
  },
  {
    path: '/demo2/softTextSet/:id',
    component: 'demo/demo2/softTextSet/[id].tsx',
    menu: {},
    layout: {
      hideNav: false,
    },
  },
  {
    path: '/demo-hooks',
    component: 'demo/demo-hooks',
    menu: {
      name: 'demo-hooks', // 兼容此写法
      icon: 'BarsOutlined',
    },
    layout: {
      hideNav: false,
    },
    access: 'canRead',
  },
  {
    path: '/demo-dva',
    component: 'demo/demo-dva',
    menu: {
      name: 'demo-dva', // 兼容此写法
      icon: 'BarsOutlined',
    },
    layout: {
      hideNav: false,
    },
    access: 'canRead',
  },
];
