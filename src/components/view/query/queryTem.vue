<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline" :rules="rules">
        <el-form-item label="电压等级" prop="kv">
          <el-input v-model="formInline.kv" placeholder="请输入电压等级"></el-input>
        </el-form-item>
        <el-form-item label="线路名称" prop="linename">
          <el-input v-model="formInline.linename" placeholder="请输入线路名称"></el-input>
        </el-form-item>
        <el-form-item label="杆塔号" prop="tower">
          <el-input v-model="formInline.tower" placeholder="请输入杆塔号"></el-input>
        </el-form-item>
        <el-form-item label="请选择开始日期">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="daterange"
              value-format="yyyyMMdd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formInline')">查询温度曲线</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div class="charts">
        <div>
          <div class="title">{{ title }}</div>
          <v-charts id="chart" :options="option" />
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            border
            style="width: 500px">
            <el-table-column
              prop="measuredate"
              label="日期"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="temperature"
              label="温度"
              align="center"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="rtempb"
              align="center"
              label="A相温度"
              width="80">
            </el-table-column>
              <el-table-column
                prop="rtempa"
                label="B相温度"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="rtempc"
                align="center"
                label="C相温度"
                width="80">
              </el-table-column>
                <el-table-column
                  prop="current"
                  align="center"
                  label="负荷电流"
                  width="80"
                >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import vCharts from 'vue-echarts';

  export default {
    name: '',
    data() {
      return {
        title: '110KV明湖塔3号线',
        formInline: {
          kv: '',
          linename: '',
          tower: '',
        },
        value1: '',
        rules: {
          kv: [
            { required: true, message: '请输入电压等级', trigger: 'blur' },
          ],
          linename: [
            { required: true, message: '请输入线路名称', trigger: 'blur' }
          ],
          tower: [
            { required: true, message: '请输入杆塔号', trigger: 'blur' }
          ]
        },
        tableData: [{
          current: '14',
          temperature: '26',
          measuredate: '20190610',
          rtempb: '14',
          rtempc: '12',
          rtempa: '43'
        }, {
          current: '14',
          temperature: '26',
          measuredate: '20190610',
          rtempb: '14',
          rtempc: '12',
          rtempa: '43'
        },
          {
            current: '14',
            temperature: '26',
            measuredate: '20190610',
            rtempb: '14',
            rtempc: '12',
            rtempa: '43'
          }, {
          current: '14',
          temperature: '26',
          measuredate: '20190610',
          rtempb: '14',
          rtempc: '12',
          rtempa: '43'
        }, {
          current: '14',
          temperature: '26',
          measuredate: '20190610',
          rtempb: '14',
          rtempc: '12',
          rtempa: '43'
        }]
      };
    },
    components: {
      'v-charts': vCharts
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 校验通过后调用温度曲线接口
            this.getPicMapInfo();
          } else {
            return false;
          }
        });
      },
      // 查询温度曲线接口  picmapinfo
      getPicMapInfo(){
        this.formInline.startdate = this.value1[0];
        this.formInline.enddate = this.value1[1];
        this.$ajax({
          // 方式
          method: 'post',
          // 路径
          url: this.$apiUrl.picmapinfo,
          // 参数
          params: this.$params.stringify(this.formInline)
        })
          .then(function (response) {
            if (response.data.code === '0'){
              this.tableData = response.data.data;
              // 标题数据
              this.title = response.data.title;
            } else {
              // 接口返回code返回不为0时提示信息
              this.$message.error(response.data.message);
            }

          })
      },
    },
    computed: {
      option(){
        return  {
          color: ['yellow', 'green', 'red', 'skyblue', 'blue'],
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            axisTick:{
              show:false
            },
            type: 'category',
            data: [
              this.tableData[0].measuredate,
              this.tableData[1].measuredate,
              this.tableData[2].measuredate,
              this.tableData[3].measuredate,
              this.tableData[4].measuredate
            ]
          },
          legend: {
            data:['A相温度','B相温度','C相温度','温度','负荷电流']
          },
          yAxis: [
            {
              type: 'value',
              name: '温度',
              axisLine: {
                show:false
              },
              axisTick:{
                show:false
              }
            },
            {
              type: 'value',
              name: '负荷电流',
              axisLine: {
                show:false
              },
              axisTick:{
                show:false
              }
            }
          ],
          series: [
            {
              name: 'A相温度',
              data: [
                this.tableData[0].rtempa,
                this.tableData[1].rtempa,
                this.tableData[2].rtempa,
                this.tableData[3].rtempa,
                this.tableData[4].rtempa
              ],
              type: 'line',
              symbolSize: 10,
              symbol: 'circle',
              yAxisIndex: 0,
              lineStyle:{
                width: 2
              },
            },
            {
              name: 'B相温度',
              symbol: 'circle',
              symbolSize: 12,
              data: [
                this.tableData[0].rtempb,
                this.tableData[1].rtempb,
                this.tableData[2].rtempb,
                this.tableData[3].rtempb,
                this.tableData[4].rtempb
              ],
              type: 'line',
              yAxisIndex: 1,
              lineStyle:{
                width: 2,
                type:'dotted'
              },
            },
            {
              name: 'C相温度',
              symbol: 'circle',
              symbolSize: 12,
              data: [
                this.tableData[0].rtempc,
                this.tableData[1].rtempc,
                this.tableData[2].rtempc,
                this.tableData[3].rtempc,
                this.tableData[4].rtempc
              ],
              type: 'line',
              yAxisIndex: 1,
              lineStyle:{
                width: 2
              },
            },
            {
              name: '温度',
              symbol: 'circle',
              symbolSize: 12,
              data: [
                this.tableData[0].temperature,
                this.tableData[1].temperature,
                this.tableData[2].temperature,
                this.tableData[3].temperature,
                this.tableData[4].temperature
              ],
              type: 'line',
              yAxisIndex: 0,
              lineStyle:{
                width:2
              },
            },
            {
              name: '负荷电流',
              symbol: 'circle',
              symbolSize: 12,
              data: [
                this.tableData[0].current,
                this.tableData[1].current,
                this.tableData[2].current,
                this.tableData[3].current,
                this.tableData[4].current
              ],
              type: 'line',
              yAxisIndex: 1,
              lineStyle:{
                width:2,
                type:'dotted'  //'dotted'虚线 'solid'实线
              },
            }
          ]
        }
      }
    }
  };
</script>
<style lang="scss">
  .charts{
    display: flex;
    padding-top: 60px;
    .title{
      padding: 20px;
      text-align: center;
      font-size: 24px;
    }
    .table{
      padding: 125px 0 0 50px;
    }
    #chart{
      width: 600px;
      height: 400px;
    }
  }

</style>
