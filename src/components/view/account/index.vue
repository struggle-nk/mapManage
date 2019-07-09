<template>
  <div class="account">
    <h1 class="w-c">台账维护</h1>
    <el-button type="primary" class="addP" @click="addNew">新增</el-button>
    <div class="custom-tree-container">
      <div class="block tree-position">
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
          <el-form :model="editForm">
            <el-form-item label="经度" :label-width="formLabelWidth">
              <el-input v-model="editForm.longtitude" auto-complete="off"></el-input>
            </el-form-item>
           <el-form-item label="纬度" :label-width="formLabelWidth">
              <el-input v-model="editForm.latitude" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit()">保 存</el-button>
          </div>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="dialogFormVisible2">
          <el-form :model="form">
            <el-form-item label="电压等级" :label-width="formLabelWidth2">
              <el-input v-model="form.kv" auto-complete="off"></el-input>
            </el-form-item>
           <el-form-item label="线路名称" :label-width="formLabelWidth2">
              <el-input v-model="form.linename" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="杆塔号" :label-width="formLabelWidth2">
              <el-input v-model="form.tower" auto-complete="off"></el-input>
            </el-form-item>
           <el-form-item label="经度" :label-width="formLabelWidth2">
              <el-input v-model="form.longtitude" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="纬度" :label-width="formLabelWidth2">
              <el-input v-model="form.latitude" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd()">保 存</el-button>
          </div>
        </el-dialog>
        <el-tree
          :data="data4"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
  </div>

</template>

<script>

  let id = 1000;
  export default {
    name: "account",
    data() {
      return {
        dialogFormVisible2: false,
        formLabelWidth: '40px',
        formLabelWidth2: '80px',
        dialogFormVisible: false,
        editForm: {},
        form: {
          kv: '',
          linename: '',
          tower: '',
          latitude: '',
          longtitude: ''
        },
        data4: [{
          "children":[{
            "children":[{
              "linename":"\u660e\u6e56\u7ebf",
              "longtitude":"120.416401",
              "label":"2#\u5854",
              "num":1,
              "kv":"110kV",
              "latitude":"36.130119",
              "tower":"2#\u5854",
              "id":"third4001000"
            },{
              "linename":"\u660e\u6e56\u7ebf",
              "longtitude":"120.4164",
              "label":"3#\u5854",
              "num":2,
              "kv":"110kV",
              "latitude":"36.130119",
              "tower":"3#\u5854",
              "id":"third4001001"
            },{
              "linename":"\u660e\u6e56\u7ebf",
              "longtitude":"120.416404",
              "label":"4#\u5854",
              "num":3,
              "kv":"110kV",
              "latitude":"36.130121",
              "tower":"4#\u5854",
              "id":"third4001002"
            },{
              "linename":"\u660e\u6e56\u7ebf",
              "longtitude":"120.416404",
              "label":"5#\u5854",
              "num":4,
              "kv":"110kV",
              "latitude":"36.130121",
              "tower":"5#\u5854",
              "id":"third4001003"
            },{
              "linename":"\u660e\u6e56\u7ebf",
              "longtitude":"120.4164",
              "label":"6#\u5854",
              "num":5,
              "kv":"110kV",
              "latitude":"36.130119",
              "tower":"6#\u5854",
              "id":"third4001004"
            }],
            "id":"sencond2000",
            "label":"\u660e\u6e56\u7ebf"
          }],
          "id":"first1",
          "label":"110kV"
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      success(cont) {
        this.$message({
          message: cont,
          type: 'success'
        });
      },
      addNew: function(){
        this.dialogFormVisible2 = true;
        this.form = {
          kv: '',
          linename: '',
          tower: '',
          latitude: '',
          longtitude: ''
        }
      },
      /*
      * 新增台账接口
      * */
      saveAdd: function(){
        let _this = this;
        this.$ajax({
          method: 'post',
          url: this.$apiUrl.devinfo,
          data: _this.form
        })
          .then(function (response) {
            _this.success(response.data.message)
            _this.getAllList();
            _this.dialogFormVisible2 = false;
            // if (response.data.code === '0'){
            // } else {
            //   _this.$message.error(response.data.message);
            // }
          })
      },
      append(data) { //编辑
        this.dialogFormVisible = true;
        this.editForm = data;
      },
      /*
      * 保存编辑接口
      * */
      saveEdit: function(){
        let _this = this;
        this.$ajax({
          method: 'put',
          url: this.$apiUrl.devinfo,
          params: _this.editForm
        })
          .then(function (response) {
            // if (response.data.code === '0') {
            _this.success(response.data.message)
            _this.dialogFormVisible = false;
            _this.getAllList();
            // } else {
            //   _this.$message.error(response.data.message);
            // }
          })
      },
      /*
      * 删除方法
      * */
      remove(node, data) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确认删除后调用删除接口
          let _this = this;
          this.$ajax({
            method: 'DELETE',
            url: this.$apiUrl.devinfo,
            params: data
          })
            .then(function (response) {
              // if (response.data.code === '0') {
              _this.getAllList();
              _this.success(response.data.message)
              // } else {
              //   _this.$message.error(response.data.message);
              // }
            });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getAllList: function(){ //获取数据列表
        let _this = this;
        this.$ajax({
          method: 'get',
          url: this.$apiUrl.devinfo,
        })
          .then(function (response) {
            // if (response.data.code === '0') {
            _this.success(response.data.message)
            _this.data4 = response.data.data;
            // } else {
            //   this.$message.error(response.data.message);
            // }
          })
      },
      renderContent(h, { node, data, store }) {  //根据标签名的层层嵌套去隐藏
        if(data.id[0] == 't' ){
          return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
            <span>{node.label}</span>
            </span>
            <span>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>编辑</el-button>
          <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
          </span>);
        }else{
          return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
            <span>{node.label}</span>
            </span>
            </span>);
        }
      }
    },
    mounted: function(){
      // 获取台账菜单数据
      this.getAllList();
    }
  };
</script>

<style lang="scss">
  .account{
    .custom-tree-container{
      width: 200px;
    }
  }
  .w-c{
    color: black;border-left:1px solid black; padding-left: 10px;
  }
  .tree-position{
    margin-top: 15px;
  }
  .addP{
    position: absolute;right: 10px;top: 70px;
  }
</style>
