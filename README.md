# cj-admin模版项目

## 使用
> 后台需要全局状态管理的需求少、所以建议大家尽量写在本地存储中（storage）；如果必须要用、建议用StoreProvider组件（src/demo-hooks是这个组件的使用demo）

> 富文本编辑器统一用WEditor组件（src/demo2是这个组件的使用demo）

### 目录结构说明
```
├── README.md  # 开发说明文档
├── docker
│   ├── Dockerfile  # docker创建配置文件
│   ├── Ingress.yaml  # KBS 生成规则
│   ├── deployment.yaml  # K8s 配置
│   ├── nginx.conf  # nginx配置文件
│   └── svc.yaml  # K8s pod相关配置
├── mock 
├── package.json  # npm package配置管理文件
├── public  # 公共静态资源
├── src
│   ├── app.ts  # 项目入口文件
│   ├── components  # 公共组件
│   ├── hooks  # 公共逻辑
│   ├── layouts  # 布局
│   ├── locales  # 本地语言
│   ├── models  # 公共数据状态存储
│   ├── pages
│   │   ├── demo1
│   │   │   ├── _components  # 私有组件
│   │   │   │   ├── Filter.tsx 
│   │   │   │   └── TableList.tsx
│   │   │   ├── _service  # 私有api调用层
│   │   │   │   ├── @types  # api接口字段类型定义
│   │   │   │   └── index.ts  # api引用入口
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── services  # 公共api调用层
│   │   ├── @types  # api接口字段类型定义
│   │   │   └── api.ts
│   │   ├── api.ts
│   │   └── index.ts 
│   └── utils  # 工具文件
├── tsconfig.json  # ts检查配置
├── typings.d.ts 
└── yarn.lock # npm包版本管理锁文件
```
### 多环境配置
- 在package.json中配置对应环境的命令,如 test环境
    > "build-test": "cross-env UMI_ENV=test umi build",
- 增加对应的test环境的配置文件--可以增加test环境对应的api地址等
    >.umirc.test.ts 同.umirc.ts的配置一样 只不过他们有优先级
- 配置文件执行顺序
    >.umirc.local.ts(本地配置文件、不放到git仓库中跟踪) > UMI_ENV 指定的配置（.umirc.test.ts） > .umirc.ts(始终会执行、其他指定配置会和它 deep merge 后形成最终配)

    >注：.umirc.local.ts 仅在 umi dev 时有效。umi build 时不会被加载。
- .umirc.local.ts 文件内容参考（该文件需要自己创建、不走git）
```
import { defineConfig } from 'umi';

export default defineConfig({
  // base: '/',

  // ---- 本地环境-优先级最高
  define: {
    ENV:'local',
    JOBSAPI: 'http://master.jobs2020.cj.com/api',
  },
});
```    


### cicd
    cicd自动部署已配置好、可直接使用
- 容器命名空间的创建规则：项目组+分支（如前端大部分项目都在web下、对应的命名空间是web-分支）
- 自动部署主要针对测试环境和预演环境
    > - master分支 === 测试环境 ps：一旦有代码合并或提交到master分支就会触发自动部署
    > - release分支 === 预发环境 ps：一旦有代码合并或提交到release分支就会触发自动部署
    
### demo说明
    demo 1 主要展示目录架构的使用规范
    demo 2 主要展示富文本编辑器的使用
    demo-hoos 主要展示hooks全局状态的使用

### 本地环境启动

```bash
$ yarn
$ yarn start
```

### 打包
> 根据不同的环境执行不同的打包命令
```bash
$ yarn // 安装依赖
$ yarn build-test // 测试环境
$ yarn build-release // 预发环境
$ yarn build // 正式环境
```


