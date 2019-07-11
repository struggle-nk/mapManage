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
          <el-form-item label="测温日期" prop="Measuredate">
            <el-date-picker type="date" placeholder="请选择测温日期" v-model="formInline.Measuredate" value-format="yyyyMMdd" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="Staff">
            <el-input v-model="formInline.Staff" placeholder="请输入状态"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formInline')">查询图谱</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-carousel :autoplay="false" arrow="always" indicator-position="none">
          <el-carousel-item v-for="(item, key) in img" :key="key">
            <img :src="item" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
</template>

<script>

  export default {
    name: '',
    data() {
      return {
        // 请求接口时参数
        formInline: {
          kv: '',
          linename: '',
          tower: '',
          Measuredate: '',
          Measuretime: '',
          Staff: ''
        },
        rules: {
          kv: [
            { required: true, message: '请输入电压等级', trigger: 'blur' },
          ],
          linename: [
            { required: true, message: '请输入线路名称', trigger: 'blur' }
          ],
          tower: [
            { required: true, message: '请输入杆塔号', trigger: 'blur' }
          ],
          Measuredate: [
            { required: true, message: '请选择测温日期', trigger: 'blur' }
          ],
          Staff: [
            { required: true, message: '请输入状态', trigger: 'blur' }
          ]
        },
        img: [
        ]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.$apiUrl.picmap);
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
              _this.formInline = response.data.data;
            } else {
              // 接口返回code不为0时提示信息
              _this.$message.error(response.data.message)
            }

          })
      }
    },
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
