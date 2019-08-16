<template>
  <div class="home_page">
    <div class="top">
      <div v-for="(item, index) in menu" :key="index" @click="routeTo(item.name)">{{ item.title }}</div>
    </div>
    <!--<marquee behavior="alternate" style="font-size:30px;font-weight:600;margin-top:50px;color:black;border:1px solid black;">此为滚动内容</marquee>-->
    <!--<div class="bottom">-->
      <!--<div>-->
        <!--<v-charts :options="first" />-->
      <!--</div>-->
      <!--<div>-->
        <!--<v-charts :options="first" />-->
      <!--</div>-->
      <!--<div>-->
        <!--<v-charts :options="first" />-->
      <!--</div>-->
    <!--</div>-->
  </div>

</template>

<script>
import vueECharts from 'vue-echarts'

export default {
  name: "homePage",
  data() {
    return {
      menu: [
        {
          title: '台账维护',
          name: 'account'
        },
        {
          title: '图谱录入',
          name: 'map'
        },
        {
          title: '查询统计',
          name: 'query'
        }
      ]
    };
  },
  components: {
    'v-charts': vueECharts
  },
  methods: {
    routeTo(val) {
      this.$router.push({ name: val })
    }
  },
  computed: {
    first(){
      return  {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  }
};
</script>

<style lang="scss">
  .home_page{
    height: 100%;
    .top{
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 100%;
      div{
        width: 25%;
        line-height: 200px;
        text-align: center;
        font-size: 30px;
        border-radius: 10px;
        background: #33475a;
        color: #fff;
      }
    }
    .middle{
      margin-top: 100px
    }
    .bottom{
      display: flex;
      justify-content: space-around;
      div{
        width: 500px;
        height: 400px;
      }
    }
  }
  .home_page .top div:hover{
    cursor: pointer;
  }
</style>
