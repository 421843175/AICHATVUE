<template>
    <div class="seller-container">
      <!-- 左侧导航 -->
      <div class="sidebar">
        <el-menu
          default-active="1"
          class="seller-menu"
          @select="handleMenuSelect"
        >
  
          <el-menu-item index="1">
            <i class="el-icon-question"></i>
            <span>账户管理</span>
          </el-menu-item>
 


          <el-menu-item index="2">
            <i class="el-icon-s-home"></i>
            <span>返回主页</span>
          </el-menu-item>
        </el-menu>
      </div>
  
      <!-- 右侧内容 -->
      <div class="content">

        <!-- 账户管理 -->
        <div v-show="activeMenu === '1'" class="qa-manage">
            <SetAccount></SetAccount>
        </div>
   
      </div>
    </div>
  </template>
  
  <script>
import SetAccount from './setting/SetAccount.vue'

  export default {
    data() {
      return {
        activeMenu: '1', // 当前选中菜单
        // 原有数据保持不变...
      }
    },
    methods: {
      handleMenuSelect(index) {
        if(index==2) this.$router.push("/")
        this.activeMenu = index
      },
      // 原有方法保持不变...
    },
    components:{
      SetAccount
    }
  }
  </script>
  
  <style >
  .seller-container {
    display: flex;
    min-height: 100vh;
    background: #f5f7fa;
  }
  
  .sidebar {
    width: 200px;
    background: #fff;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  }
  
  .seller-menu {
    border-right: none;
  }
  
  .seller-menu .el-menu-item {
    height: 56px;
    line-height: 56px;
    font-size: 14px;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
  
  .goods-manage {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* 调整原有样式 */
  .goods-card {
    margin-bottom: 15px;
  }
  
  .qa-manage,
  .ai-setting {
    background: #fff;
    padding: 30px;
    min-height: 500px;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .el-alert {
    margin: 20px;
  }
  </style>