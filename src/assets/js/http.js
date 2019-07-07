import axios from 'axios'
//axios配套使用的对象与字符转换工具，主要用于处理get和post提交数据格式转换问题
import qs from 'qs'
import router from '../../router'
//elementUi 加载中样式组件，如果使用其他的ui框架库可进行更换
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

//服务器ip引入地址(本地测试，打包正式)
const baseUrl = process.env.API_ROOT; //服务器ip修改地址：config/dev.env.js（测试环境），config/prod.env.js（正式环境）

//定义loading变量
let loading;
let submission; // 防止重复提交
let derepeat;

//请求开始时执行的拦截器
//拦截器可以截取请求或者响应在被then和catch处理之前的操作，例如axios请求开始时执行动画，请求回来之后把loading动画关掉
axios.interceptors.request.use(config =>{
  //console.log('请求开始时的拦截');
  submission = derepeat?1:'';

  return config
},error => {
  console.log('请求开始时的报错');
  submission = derepeat?2:'';
  return Promise.reject(error)
});

//请求得到响应时执行的拦截器
axios.interceptors.response.use(response =>{
  //console.log('请求响应时的拦截');
  submission = derepeat?1:'';
  //关闭loading框
  return response;
},error => {
  submission = derepeat?2:'';
  //关闭loading框
  console.log('请求响应时的错误');
  return Promise.resolve(error.response);
});

//错误的时候执行的方法
function errorState(response) {
  console.log(response); //输出错误信息
  submission = derepeat?2:'';
  //如果http状态正常，则直接返回数据 ，有特殊处理可以根据状态来返回
  // if(response && (response.status === 200 || response.status === 304 || response.status === 400)){

  //   return response;
  // }
  // else{
  // Message.error('网络异常，请重新登录');
  // setTimeout(function () {
  //   router.push('/')
  // },1000)

  //   console.log('http 状态异常');
  // }
}

//正确的时候执行的方法
function successState(res) {
  //console.log(res);
  submission = derepeat?2:'';

}
//hasloading
const httpServer =(opts,data,setOpts) =>{
  let requestOptions
  if(setOpts){
    requestOptions = {
      hasloading:setOpts.hasloading?setOpts.hasloading:false,
      specialApi:setOpts.specialApi?setOpts.specialApi:false,
      cancelFalseMsg:setOpts.cancelFalseMsg?setOpts.cancelFalseMsg:false
    };

  }
  else{
    requestOptions = {
      hasloading:false,
      specialApi:false,
      cancelFalseMsg:false
    }
  }
  let Public = {};
  //配置axios的主要参数项
  let httpDefaultOpts = {
    method:opts.method,
    url: requestOptions.specialApi?opts.url:baseUrl + opts.url,
    timeout: 10000,
    data:Object.assign(Public, data),
    //data:qs.stringify(Object.assign(Public, data)),
    params:qs.stringify(Object.assign(Public, data)),
    withCredentials: true,
    /*params:data,
    data:data,*/
    headers:{
      'Accept': "application/json, text/plain, *!/!*",
      'Content-Type' : "application/json;charset=utf-8"
    },
    hasloading:requestOptions.hasloading
    //token:sessionStorage.user_token
    //get和post不同的处理方法
    /* headers: opts.method == 'get'?{
         'Accept': "application/json, text/plain, *!/!*",
         'Content-Type' : "application/json;charset=utf-8",
         token:sessionStorage.user_token
     }:{
       'Accept': "application/json, text/plain, *!/!*",
       'Content-Type' : "application/json;charset=utf-8",
       token:sessionStorage.user_token
     }*/

  }



  derepeat = requestOptions.derepeat;//赋值是否可重复提交的变量

  //post和get方法分别只用了params和data中的一个，所以当不用的时候就删除
  if(opts.method=='get'||opts.method=='delete'||opts.method=='put'){
    delete httpDefaultOpts.data;
    // httpDefaultOpts.url = httpDefaultOpts.url+'?'+httpDefaultOpts.params;
  }else{
    delete httpDefaultOpts.params
  }

  //判断是否需要loading框
  if(requestOptions.hasloading===true){
    loading = Loading.service({
      lock: true,
      text: '数据加载中',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  else{
    //console.log("不需要loding");
  }
  let promise = new Promise(function (resolve, reject) {
    //console.log(httpDefaultOpts.url);
    //数据加载中的loading框
    if(submission != 1){
      axios(httpDefaultOpts).then(
        (res)=>{
          //res = Json.parse(res)
          //报错时执行上方的方法
          successState(res);
          if(httpDefaultOpts.hasloading!=false){
            setTimeout(function () {
              loading.close();
            },200);
          }
          //调用接口之后返回的错误信息
          //修改以下if判断语句，根据success返回的布尔值来判定是否返回正确
          if(res.data.success.toString() == 'false'&&res.data.interMsg!='_noRecord'&&!requestOptions.cancelFalseMsg){
            Message.error(res.data.hint);
          }
          //对应具体调用时的resolve
          resolve(res.data);
        }
      ).catch(
        (response) => {
          //报错时执行上方定义的错误方法
          errorState(response);
          if(httpDefaultOpts.hasloading!=false){
            loading.close();
          }
          //对应具体调用时的reject
          reject(response);
        }
      )
    }
    else{
      Message.info('正在提交，请稍候');
    }
  });
  return promise
};

export default httpServer
