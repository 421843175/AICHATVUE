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
            <i class="el-icon-goods"></i>
            <span>商品管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-question"></i>
            <span>问题管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
            <span>AI形象设置</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-home"></i>
            <span>评价中心</span>
          </el-menu-item>

          <el-menu-item index="5">
            <i class="el-icon-s-home"></i>
            <span>返回主页</span>
          </el-menu-item>
        </el-menu>
      </div>
  
      <!-- 右侧内容 -->
      <div class="content">
        <!-- 商品管理 -->
        <div v-show="activeMenu === '1'" class="goods-manage">
          <!-- 原有商品管理代码 -->
            <GoodsManage></GoodsManage>
        </div>
  
        <!-- 问题管理 -->
        <div v-show="activeMenu === '2'" class="qa-manage">
            <Question></Question>
        </div>
  
        <!-- AI形象设置 -->
        <div v-show="activeMenu === '3'" class="ai-setting">
                <Clothes></Clothes>
        </div>

        <!-- 评价中心  -->
        <div v-show="activeMenu === '4'" class="ai-setting">
                <Evaluate></Evaluate>
        </div>

   
      </div>
    </div>
  </template>
  
  <script>
import GoodsManage from './setting/GoodsManage.vue';
import Question from './setting/Question.vue';
import Clothes from './Clothes.vue';
import Evaluate from './setting/Evaluate.vue';

  export default {
    data() {
      return {
        activeMenu: '1', // 当前选中菜单
        // 原有数据保持不变...
      }
    },
    methods: {
      handleMenuSelect(index) {
        if(index==5) this.$router.push("/")
        this.activeMenu = index
      },
      // 原有方法保持不变...
    },
    components:{
        GoodsManage,
        Question,
        Clothes,
        Evaluate
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