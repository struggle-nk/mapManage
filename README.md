
# 电缆终端红外测温图谱管理系统 前端项目使用说明

建议使用webstorm编译器
电脑上需装载node.js  10以上版本
node.js下载地址：https://nodejs.org/en/
进入webVueBackstageManage文件夹下，
首先运行 npm i 命令，下载完成后运行 npm audit，
最后npm run dev启动项目

点击标题回到首页

ps: src/components/view相关页面代码位置
  account: 台账录入
  map: 图谱录入
  query: 查询统计，queryMap.vue为查询图谱页面，queryTem.vue为查询温度曲线页面

 项目内部分代码解释
  1.接口地址在 src/publicUrl.js中配置
        this.$ajax({
          //请求方式
          method: 'get',
          // 请求地址
          url: this.$apiUrl.devinfo,
          // 请求参数
          params: ***
        })
          .then(function (response) {
            if (response.data.code === '0') {
              this.data4 = response.data.data;
            } else {
              // 接口返回code不为0时提示信息
              this.$message.error(response.data.message);
            }
          })
  2.调试时可在谷歌浏览器按下F12切换到network下，点选请求  查看详情  请求参数，返回参数等等。
