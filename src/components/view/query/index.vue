<template>
  <el-container class="query">
    <el-aside width="140px">
      <el-menu
        default-active="map"
        class="el-menu-vertical-demo"
        @select="handle"
      >
        <el-menu-item index="map">
          <i class="el-icon-menu"></i>
          <span slot="title">查看图谱</span>
        </el-menu-item>
        <el-menu-item index="tem">
          <i class="el-icon-menu"></i>
          <span slot="title">查看温度曲线</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <component :is="queryType"/>
  </el-container>

</template>


<script>
import queryMap from './queryMap'
import queryTem from './queryTem'

  export default {
    name: '',
    components: {
      'query-map': queryMap,
      'query-tem': queryTem
    },
    data() {
      return {
        id: 'map',
        formInline: {
          user: '',
          region: ''
        }
      };
    },
    methods: {
      handle(key) {
        this.id = key;
      },
    },
    computed: {
      queryType() {
        return `query-${this.id}`;
      }
    }
  };
</script>

<style lang="scss">
  .query{
    .el-form{
      border-bottom: 1px solid #e6e6e6;
    }
    .el-menu-item{
      padding: 0!important;
    }
    .el-menu{
      border: 0;
    }
    .el-aside{
      border-right: solid 1px #e6e6e6;
    }
    .el-container{
      margin-left: 20px;
    }
  }
</style>
