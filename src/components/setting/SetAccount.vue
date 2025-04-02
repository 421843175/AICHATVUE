<template>
  <div class="account-manage">
 <!-- 搜索栏 -->
 <el-row class="operation-bar" type="flex" align="middle">
      <el-col :span="6">
        <el-input
          v-model="searchKeyword"
          placeholder="输入用户名或昵称搜索"
          clearable
          @input="handleSearch"
          @clear="handleSearch"
        >
   
        </el-input>
      </el-col>
    </el-row>



    <!-- 数据表格 -->
    <el-table :data="filteredData" v-loading="loading" style="width: 100%"  :default-sort="{prop: 'logintime', order: 'descending'}">
      <el-table-column prop="id" label="ID" width="180" sortable :sort-method="roleSort"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="nick" label="昵称"></el-table-column>
      <el-table-column label="头像" width="100">
        <template slot-scope="{row}">
          <el-avatar :size="40" :src="row.head" shape="circle"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="role" label="角色" width="120" sortable :sort-method="roleSort">
        <template slot-scope="{row}">
          <el-tag 
            :style="{
              backgroundColor: row.role === 0 ? '#e1f3d8' : '#e6f7ff',
              color: row.role === 0 ? '#3d8c47' : '#1a73e8',
              borderColor: row.role === 0 ? '#c2e7b0' : '#b3d8ff'
            }"
            effect="plain"
          >
            {{ roleMap[row.role] }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 登录时间列 -->
      <el-table-column prop="logintime" label="最后登录时间" width="180" sortable :sort-method="timeSort">
        <template slot-scope="{row}">
          {{ formatTime(row.logintime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AccountManage",
  data() {
    return {
      loading: false,
      tableData: [],
      roleMap: {
        0: "卖家",
        1: "买家",
        2: "买家"
      },
      searchKeyword: '',    
      originalData: [],    
      filteredData: [],      
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 时间格式化方法
    formatTime(timestamp) {
      if (!timestamp) return '从未登录';

      const date = new Date(timestamp);
      if (isNaN(date)) return '无效时间';

      // 补零函数
      const padZero = n => n.toString().padStart(2, '0');

      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      const hours = padZero(date.getHours());
      const minutes = padZero(date.getMinutes());

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    // 加载账户数据
    async loadData() {
      this.loading = true;
      try {
        const res = await this.$http.get(this.$constant.baseURL + '/customer/list', {
  
            usertoken: localStorage.getItem('usertoken')
          
        });
        if (res.data.code === 200) {
          this.originalData = res.data.data.map(item => ({
            ...item,
            logintime: item.logintime ? new Date(item.logintime).getTime() : null
          }));
          this.filteredData = [...this.originalData];
          this.handleSearch(); // 初始化时应用可能的搜索词
        }
      } finally {
        this.loading = false;
      }
    },
    // 删除账户
    async handleDelete(id) {
      try {
        await this.$confirm('确认删除该账户？此操作不可恢复', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        const res = await this.$http.post(
          this.$constant.baseURL + '/customer/delete',
          {
            id: id,
            usertoken: localStorage.getItem('usertoken')
          }
        );

        if (res.data.code === 200) {
          this.$message.success('删除成功');
          this.loadData(); // 刷新列表
        }
      } catch (error) {
        // 取消删除不做操作
      }
    },
     // 处理搜索
     handleSearch() {
      const keyword = this.searchKeyword.toLowerCase();
      if (!keyword) {
        this.filteredData = [...this.originalData];
        return;
      }

      this.filteredData = this.originalData.filter(item => {
        return (
          item.username.toLowerCase().includes(keyword) ||
          (item.nick && item.nick.toLowerCase().includes(keyword))
        );
      });
    },
  }
};
</script>

<style scoped>
.account-manage {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}

/* 添加自定义标签样式 */
.el-tag {
  border-radius: 12px;
  padding: 0 10px;
  height: 26px;
  line-height: 24px;
}

/* 浅绿色标签 */
.light-green-tag {
  background-color: #e1f3d8 !important;
  color: #3d8c47 !important;
  border-color: #c2e7b0 !important;
}

/* 浅蓝色标签 */
.light-blue-tag {
  background-color: #e6f7ff !important;
  color: #1a73e8 !important;
  border-color: #b3d8ff !important;
}

/* 操作栏样式 */
.operation-bar {
  margin-bottom: 20px;
}

.el-icon-search {
  color: #909399;
  margin-right: 8px;
}
</style>