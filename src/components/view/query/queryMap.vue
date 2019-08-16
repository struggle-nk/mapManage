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
        <el-form-item label="测温日期" prop="measuredate">
          <el-date-picker type="date" placeholder="请选择测温日期" v-model="formInline.measuredate" value-format="yyyyMMdd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="staff">
          <el-input v-model="formInline.staff" placeholder="请输入状态"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formInline')">查询图谱</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-carousel :autoplay="false" arrow="always" indicator-position="none">
        <el-carousel-item v-for="(item, key) in img" :key="key">
          <img :src="item | imgUrl" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: '',
    data() {
      return {
        // 请求接口时参数
        formInline: {
          kv: '',
          linename: '',
          tower: '',
          measuredate: '',
          measuretime: '',
          staff: ''
        },
        rules: {
          kv: [
            { required: false, message: '请输入电压等级', trigger: 'blur' },
          ],
          linename: [
            { required: false, message: '请输入线路名称', trigger: 'blur' }
          ],
          tower: [
            { required: false, message: '请输入杆塔号', trigger: 'blur' }
          ],
          measuredate: [
            { required: false, message: '请选择测温日期', trigger: 'blur' }
          ],
          staff: [
            { required: false, message: '请输入状态', trigger: 'blur' }
          ]
        },
        img: [
        ]
      };
    },
    methods: {
      submitForm(formName) {
        let one = false;
        this.$refs[formName].validate((valid) => {
          _.forEach(this.formInline, (item)=> {
            if (item) {
              one = true;
            }
          });
          if (!one) {
            this.open();
          }
          if (valid&&one) {
            this.getPicMap();
          } else {
            return false;
          }
        });
      },
      // 查询图谱接口 map
      getPicMap(){
        let _this = this;
        this.$ajax({
          method: 'get',
          url: this.$apiUrl.picmap,
          params: _this.formInline
        })
        .then(function (response) {
          if (response.data.code === 0) {
            _this.img = response.data.data;
          } else {
            // 接口返回code不为0时提示信息
            _this.$message.error(response.data.message)
          }

        })
      },
      open() {
        this.$alert('以上筛选条件请至少填入一个', '友情提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    filters: {
      imgUrl(url){
        return 'static'+ url.replace(/\\/g, '/').replace(/#/g, "%23").split('static')[1];
      }
    }
  };
</script>
<style lang="scss">
  .el-carousel__container{
    width: 640px;
    height: 480px;
    margin: 160px 0 0 160px;
    img{
      width: 640px;
    }
  }
</style>

