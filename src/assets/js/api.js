//接口ip地址配置
const serviceModule ={
   //测试
  test: {
    name:{
      url: '/sys/name',
      method: 'post'
    },
    name2:{
      url: '/sys/name',
      method: 'post'
    }
  },

  //获取列表测试接口
  getList: {
    url: '/taskService/task/normal/listPage',
    method: 'post'
  },
  login:{
    url:'http://140.249.48.201:9004/api/Account/Login',
    method:'post'
  },
  getSign:{
    url:" http://uc.findmaster.cn:13389/ossService/ossUpload/sign",
    method:"get"
  }

};

const ApiSetting = { ...serviceModule};

export default ApiSetting
