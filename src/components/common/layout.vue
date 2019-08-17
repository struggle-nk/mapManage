<template>
  <div id="layout">
    <el-container>
      <el-header>
        <h1 class="title" @click="routeTo">电缆终端红外测温图谱管理系统</h1>
      </el-header>
      <el-container>
        <el-main class="layout_main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
    export default {
        name: "layout",
        data(){
          return{}
        },
        methods:{
          routeTo(){
            this.$router.push({name: 'homePage'})
          }
        },
        created(){
        }
    }
</script>

<style lang="scss" scoped>
  #layout{
    height: 100%;
    .el-container{
      height: 100%;
      .el-aside{
        height: 100%;
        ul{
          height: 100%;
          /*li{
            height: 40px;
            line-height: 40px;
          }*/
          /*.el-menu-item-group{
            line-height: 40px;
          }*/
        }
      }
    }

    ::-webkit-scrollbar {/*滚动条整体样式*/
      width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 6px;
    }
    ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 101, 202,0.2);
      background: gray;
    }
    ::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 101, 202,0.2);
      border-radius: 10px;
      background: #EDEDED;
    }
    overflow: hidden;
  }
  .el-header{
    background-color: rgb(48, 65, 86);
    box-shadow: 0 0 10px lightgray;
    padding-right: 0;
    .title{
      font-size: 24px;
      color: white;
      font-weight: bold;
      margin-top: 12px;
      text-align: center;
      cursor: pointer;
    }
  }
  .layout_main{
    background: white;
  }

</style>
