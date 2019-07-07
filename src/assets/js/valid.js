//验证条件保存js
const validation = {};

//电话号码验证（必填）
validation.telMust = (rule,value,callback) =>{
  if(value){
    value = value.toString().replace(/^\s+|\s+$/g, ''); //去空
  }
  if(!value||value==''){
    return callback(new Error('请输入手机号'));
  }
  setTimeout(()=>{
    let mobile = /^1[3|4|6|5|7|8|9]\d{9}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
    //let myreg = /^[1-9]\d*$/;
    if(!mobile.test(value)&&!phone.test(value)){
      callback(new Error('请输入正确手机号'));
    }
    else{
      callback();
    }
  },100)
};

//手机号验证非必填
validation.tel = (rule,value,callback) =>{
  if(value){
    value = value.toString().replace(/^\s+|\s+$/g, ''); //去空
  }
  if(!value||value==''){
    /*return callback(new Error('请输入手机号'));*/
    callback();
  }
  setTimeout(()=>{
    let mobile = /^1[3|4|6|5|7|8|9]\d{9}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
    //let myreg = /^[1-9]\d*$/;
    if(!mobile.test(value)&&!phone.test(value)){
      callback(new Error('请输入正确手机号'));
    }
    else{
      callback();
    }
  },100)
};

//邮箱验证（必填）
validation.emailMust = (rule,value,callback)=>{
  if(value){
    value = value.replace(/^\s+|\s+$/g, '');
  }
  if(!value||value==''){
    callback(new Error('请输入正确的邮箱'));
  }
  setTimeout(()=>{
    //let regEmail =  /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    let regEmail =  /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if(!regEmail.test(value)){
      callback(new Error('请输入正确的邮箱'));
    }
    else{
      callback();
    }
  },100)
};

//邮箱验证（非必填）
validation.email = (rule,value,callback)=>{
  if(value){
    value = value.replace(/^\s+|\s+$/g, '');
  }
  if(!value||value==''){
    callback();
  }
  setTimeout(()=>{
    //let regEmail =  /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    let regEmail =  /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if(!regEmail.test(value)){
      callback(new Error('请输入正确的邮箱'));
    }
    else{
      callback();
    }
  },100)
};

/*//编辑普通密码验证
validation.editpassword = (rule, value, callback) => {
  //console.log(value)
  if (value === ''|| value == null) {
    //callback(new Error('请输入密码'));
    callback();
  } else {
    if (value.length<6 || value.length>15 ) {
      callback(new Error('请输入6至15位密码'));
      //callback();
    }
    if (this.editform.password2 !== '') {
      this.$refs.editform.validateField('password2');
    }
    callback();
  }
};
validation.editpassword2 = (rule, value, callback) => {
  if(this.editform.password != ''&& value == ''){
    callback(new Error('请再次输入密码'));
  }
  else if (this.editform.password == ''&&(value === '' || value == null)) {
    //callback(new Error('请再次输入密码'));
    callback();
  } else if (this.editform.password != ''&& value != this.editform.password) {
    //console.log(value,this.editform.password)
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};*/

export default ({
  validation
})
