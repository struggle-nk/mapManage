<template>
  <div class="map">
    <h1 class="w-c">图谱录入</h1>
    <div class="content">
      <div class="top">
        <p>图谱归档</p>
        <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline">
          <el-form-item label="图片目录" prop="dirname">
            <el-input v-model="formInline.dirname" placeholder="请输入图片目录" disabled></el-input>
          </el-form-item>
          <el-form-item label="GPS文件位置" prop="gpsfile" >
            <el-input v-model="formInline.gpsfile" placeholder="请输入GPS文件位置" disabled></el-input>
          </el-form-item>
          <el-form-item label="设备文件" prop="devfile" >
            <el-input v-model="formInline.devfile" placeholder="请输入设备文件" disabled></el-input>
          </el-form-item>
          <el-form-item label="位置误差（小数）" prop="posdiff">
            <el-input v-model="formInline.posdiff" placeholder="请输入时间误差 0.04"></el-input>
          </el-form-item>
          <el-form-item label="时间误差（秒）" prop="timediff">
            <el-input v-model="formInline.timediff" placeholder="请输入时间误差"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('formInline')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom">
        <p>数据录入</p>
        <div class="wrap">
          <el-row class="head">
            <el-col v-for="(item, key) in thead" :key="key" :span="item.span">{{ item.name }}<div class="grid-content bg-purple"></div></el-col>
          </el-row>
          <el-form :model="infoForm">
            <el-row class="duty" v-for="(item, index) in infoForm.duty" :key="index">
              <el-col :span="1">{{ index + 1 }}</el-col>

              <el-col :span="thead[1].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['kv']" disabled></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[2].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['linename']" disabled></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[3].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['tower']" disabled></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[4].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['measuredate']" disabled></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[5].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['measuretime']" disabled></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[6].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['staff']" disabled></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[7].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['deviceinfo']" :disabled="bol"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[8].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['temperature']" :disabled="bol"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[9].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['humidity']" :disabled="bol"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[10].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['rtempa']" :disabled="bol"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[11].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['rtempb']" :disabled="bol"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[12].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['rtempc']" :disabled="bol"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[13].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['current']" :disabled="bol"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[14].span">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <el-input v-model="item['status']" :disabled="bol"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="thead[15].span" class="imgShow">
                <div class="grid-content bg-purple-light">
                  <el-form-item>
                    <div class="imgShowC" v-for="(index, key) in item['picmap']" :key="key">
                      <a :href="index | imgUrl" :title="index" target="_blank">{{ index | strCut }}</a>
                    </div  >
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="editData">{{ edit }}</el-button>
        <el-button type="primary" @click="onSubmitData">归档</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import thead from './thead'
  import _ from 'lodash'

  export default {
    name: 'map',
    data() {
      return {
        thead,
        bol: true,
        formInline: {
          dirname: 'E:\\IR\\Original',
          gpsfile: 'E:\\IR\\Original\\location.txt',
          devfile: 'E:\\temp\\dist\\devGPSinfo.xls',
          posdiff: '',
          timediff: '',
        },
        rules: {
          dirname: [
            { required: true, message: '请输入图片目录', trigger: 'blur' },
          ],
          gpsfile: [
            { required: true, message: '请输入GPS文件位置', trigger: 'blur' }
          ],
          devfile: [
            { required: true, message: '请输入设备文件', trigger: 'blur' }
          ],
          posdiff: [
            { required: true, message: '请输入位置误差', trigger: 'blur' }
          ],
          timediff: [
            { required: true, message: '请输入时间误差', trigger: 'blur' }
          ],
          dstdir: [
            { required: true, message: '请输入归档目录', trigger: 'blur' }
          ]
        },
        edit: '编辑',
        infoForm:{
          duty: [
            {
              kv: '',
              linename: '',
              tower: '',
              measuredate: '',
              measuretime: '',
              staff: '',
              humidity: '',
              deviceinfo: '',
              temperature: '',
              rtempa: '',
              rtempb: '',
              rtempc: '',
              current: '',
              status: '',
              picmap: []
            }
          ]
        },
        form: [],
      };
    },
    methods: {
      editData(){
        if (this.bol){
          this.bol = false;
          this.edit = '取消';
          return;
        }
        this.bol = true;
        this.edit = '编辑'
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getMap();
          } else {
            return false;
          }
        });
      },
      /*
      * 查询图谱表格接口  map
      * */
      getMap(){
        let _this = this;
        this.$ajax({
          method: 'post',
          url: this.$apiUrl.map,
          params: _this.formInline
        })
        .then(function (response) {
          if (response.data.code === 0){
            _this.form = response.data.data;
            _this.infoForm.duty = _.cloneDeep(_this.form);
            console.log(_this.infoForm.duty);
          } else {
            _this.$message.error(response.data.message);
          }
        })
      },
      /*
      * 点击归档后执行的函数
      * */
      onSubmitData(){
        // 调用归档接口
        this.putPicMap();
      },
      /*
      * 图谱归档接口  picmap
      * */
      putPicMap(){
        let _this = this;
        if (_.isEqual(this.infoForm.duty, this.form)){
          return;
        }
        this.$ajax({
          method: 'post',
          url: this.$apiUrl.picmap,
          data: JSON.stringify(this.infoForm.duty)
        })
        .then(function (response) {
          if (response.data.code === 0) {
          } else {
            _this.$message.error(response.data.message);
          }

        })
      },
    },
    filters: {
      strCut(str) {
        return str.substring(str.lastIndexOf('\\') + 1).split('.')[0];
      },
      imgUrl(url){
        return 'static'+ url.replace(/\\/g, '/').replace(/#/g, "%23").split('static')[1];
      }
    }
  };
</script>

<style lang="scss">
  .map{
    height: 100%;
    $borderColor: #e0e0e0;
    .content{
      height: calc(100% - 19px);
      padding: 0 2%;
    }
    .top{
      p{
        font-size: 22px;
        padding: 30px 0;
      }
    }
    .bottom{
      height: calc(100% - 330px);
      overflow: scroll;
      p{
        font-size: 22px;
        padding: 30px 0;
      }
    }
    .btn{
      text-align: right;
      padding-top: 20px;
    }
    .wrap{
      width: 1760px;
      border: 1px solid $borderColor;
      .head{
        height: 40px;
        border-bottom: 1px solid $borderColor;
        text-align: center;
        .el-col{
          border-right: 1px solid $borderColor;
          line-height: 40px;
        }
        .el-col:last-child{
          border: none;
        }
      }
      .duty{
        height: 70px;
        border-bottom: 1px solid $borderColor;
        text-align: center;
        .imgShow{
          line-height: 20px;
          .imgShowC{
            font-size: 12px;
            height: 20px;
          }
        }
        .el-col{
          padding: 5px 0;
          border-right: 1px solid $borderColor;
          line-height: 60px;
          .el-form-item__content{
            line-height: 20px;
          }
          .el-input{
            .el-input__inner{
              text-align: center;
              border: none;
              background: none;
              height: 60px;
            }
          }
        }
        .el-col:last-child{
          border: none;
        }
        .el-form-item{
          margin: 0;
        }
        .el-form-item__error {
          color: #f56c6c;
          font-size: 12px;
          position: absolute;
          top: 65%;
          width: 100%;
          text-align: center;
        }
      }
      .duty:last-child{
        border: none;
      }
      a{
        color: #5c85cb;
        padding:0 10px;
        border-right: 1px solid #e0e0e0;
      }
      a:last-child{
        border-right: 0;
      }
    }
    .w-c{
      color: black;border-left:1px solid black; padding-left: 10px;
    }
  }
</style>

