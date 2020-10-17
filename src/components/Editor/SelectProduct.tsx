import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { Button, Empty, Form, Input, message, Modal, Spin } from 'antd';
import Api from '@/services';
import styles from './index.less';

interface IProps {
  imgIds: string[];
  handleAddProduct: (productItem: any) => any;
}

export default function SelectProduct({ handleAddProduct, imgIds }: IProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);

  // 商品获取
  const { run: getProduct, loading } = useRequest(Api.getProductApi, {
    onSuccess: ({ data = {}, success, message: msg }) => {
      if (success) {
        const { content = [] } = data;
        setList(content);
      } else {
        message.error(msg);
      }
    },
  });

  // 搜索商品
  const onSearch = (values: any) => {
    getProduct({ ...values, pageNumber: 1, pageSize: 20 });
  };

  // 选择商品
  const handleSelectProduct = () => {
    setVisible(true);
  };

  const handleAddProducts = () => {
    if (imgIds.length === 10) return message.warning('热区图最多上传10张');
    if (list.length === 0) return message.warning('请搜索商品');
    handleAddProduct(list[0]);
    return setVisible(false);
  };

  return (
    <div>
      <button
        type="button"
        data-title="选择商品"
        className="control-item button"
        onClick={handleSelectProduct}
      >
        热区图
      </button>
      <Modal
        title="选择商品"
        visible={visible}
        className={styles.selectProduct}
        onOk={handleAddProducts}
        onCancel={() => setVisible(false)}
      >
        <Spin spinning={loading}>
          <Form
            layout="inline"
            style={{ marginBottom: 16 }}
            onFinish={onSearch}
          >
            <Form.Item
              name="sku"
              rules={[
                {
                  required: true,
                  message: '请输入sku',
                },
              ]}
            >
              <Input
                type="text"
                style={{ width: 390 }}
                placeholder="sku搜索商品"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form>
          <div className="product">
            {list.map(item => (
              <div key={item.id} className="product-item">
                <img src={item.mainPhotoUrl} alt="" />
                <p className="product-name">{item.name}</p>
              </div>
            ))}
          </div>
          {list.length === 0 && <Empty />}
        </Spin>
      </Modal>
    </div>
  );
}
