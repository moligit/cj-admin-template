import React, { FC, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';

interface ILayoutProps {
  children: React.ReactNode;
  loading?: boolean;
  title?: string;
}

const Panel: FC<ILayoutProps> = ({ children, title = '', loading = false }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div className={styles.wrapper}>
      <Spin spinning={loading}>{children}</Spin>
    </div>
  );
};

export default Panel;
