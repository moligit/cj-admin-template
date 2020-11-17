import React, { FC } from 'react';
// @ts-ignore
import { ConnectProps, Link } from 'umi';
import { UseRequestProvider } from 'ahooks';
import { Affix, ConfigProvider, Menu } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import requestConfig from './requestConfig';
import 'moment/locale/zh-cn';

const { SubMenu } = Menu;

const BasicLayout: FC<ConnectProps> = ({ children }) => (
  <ConfigProvider locale={zhCN}>
    <UseRequestProvider value={requestConfig}>
      <Affix offsetTop={0}>
        <Menu style={{ padding: '0 20px' }} mode="horizontal">
          <Menu.Item key="test">
            <Link to="/demo/demo1">demo1</Link>
          </Menu.Item>
          <Menu.Item key="softText">
            <Link to="/demo/demo2/softTextList">demo2</Link>
          </Menu.Item>
        </Menu>
      </Affix>
      {children}
    </UseRequestProvider>
  </ConfigProvider>
);
export default BasicLayout;
