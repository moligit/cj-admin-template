export default {
  'POST /api/getList': (req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      code: 200,
      total: 30,
      list: [
        {
          id: '1',
          name: 'kkk',
          value: '0000',
        },
        {
          id: '2',
          name: 'kkk',
          value: '0000',
        },
        {
          id: '3',
          name: 'kkk',
          value: '0000',
        },
        {
          id: '4',
          name: 'kkk',
          value: '0000',
        },
      ],
    });
  },
  // GET 可忽略
  'GET /api/getToken': { token: '9e71328b89c739329e10a520d6b86ac2' },
  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },

  // 商品推荐列表
  'GET /manage/product/page': {
    code: 200,
    data: {
      content: [
        {
          id: '1',
          productId: '1',
          amount: 0,
          pictureUrl:
            'https://cc-west-usa.oss-accelerate.aliyuncs.com/20200513/4737149820399.jpg',
          categoryName: '',
          cjProductId: 0,
          cjSellAmount: 0,
          cjTotalAmount: 0,
          freight: 12,
          name:
            'asdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdas',
          sku: 'sku0910293123',
        },
        {
          id: '8',
          productId: '1',
          amount: 0,
          pictureUrl:
            'https://cc-west-usa.oss-accelerate.aliyuncs.com/20200513/4737149820399.jpg',
          categoryName: '',
          cjProductId: 0,
          cjSellAmount: 0,
          cjTotalAmount: 0,
          freight: 0,
          name: 'asdas',
          sku: 'asssss',
        },
      ],
      pageNumber: 0,
      pageSize: 0,
      totalPages: 8,
      totalRecords: 1000,
    },
    message: '',
    success: true,
  },

  'GET /manage/cj/product/page': {
    code: 200,
    data: {
      content: [
        {
          id: '1',
          productId: '1',
          amount: 0,
          pictureUrl:
            'https://cc-west-usa.oss-accelerate.aliyuncs.com/20200513/4737149820399.jpg',
          categoryName: '',
          cjProductId: 0,
          cjSellAmount: 0,
          cjTotalAmount: 0,
          freight: 12,
          name:
            'asdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdas',
          sku: 'sku0910293123',
        },
        {
          id: '8',
          productId: '1',
          amount: 0,
          pictureUrl:
            'https://cc-west-usa.oss-accelerate.aliyuncs.com/20200513/4737149820399.jpg',
          categoryName: '',
          cjProductId: 0,
          cjSellAmount: 0,
          cjTotalAmount: 0,
          freight: 0,
          name: 'asdas',
          sku: 'asssss',
        },
      ],
      pageNumber: 0,
      pageSize: 0,
      totalPages: 8,
      totalRecords: 1000,
    },
    message: '',
    success: true,
  },

  'POST /manage/product/stock': (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      code: 0,
      data: true,
      message: '',
      success: true,
    });
  },

  'POST /manage/cj/product/stock': (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      code: 0,
      data: true,
      message: '',
      success: true,
    });
  },
};
