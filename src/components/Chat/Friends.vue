<!-- 使用flex布局 主轴Y 两边贴边然后平分剩余空间 -->
<template>

  <!-- TODO:NOTICE 事件可能被阻止  這裡手动触发 -->
    <div class="friend-item" @click="$emit('click')">
      <el-row type="flex" align="middle" :gutter="12">
        <!-- 头像区域 -->
        <el-col :span="6">
          <el-avatar :size="56" :src="contant.head"></el-avatar>
        </el-col>
        
        <!-- 消息区域 -->
        <el-col :span="18">
          <div class="message-container">
            <!-- 首行：用户名 + 时间 -->
            <div class="header-line">
              <span class="username">{{contant.nickname}}</span>
              <span class="timestamp">{{contant.timestamp!=null?contant.timestamp:""}}</span>
            </div>
            
            <!-- 消息内容 + 未读标记 -->
            <div class="content-line">
              <span class="message-content">{{contant.messageEnd!=null?
              ( contant.messageEnd.length > 10 
        ? contant.messageEnd.slice(0,10) + '...'
        : contant.messageEnd):""}}</span>
              <el-badge 
              v-show="contant.unreadnum!=0"
                :value="contant.unreadnum" 
                :max="99" 
                class="unread-badge" 
                type="danger"
              ></el-badge>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>

<script>
export default {
    name:"Friends",
    data(){
        return {

        }
    },
    props: ['contant'],
    methods:{
      
    }
}
</script>

<style>
.friend-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.message-container {
  display: flex;
  flex-direction: column;
  height: 56px; /* 与头像高度一致 */
}

.header-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.username {
  font-weight: 600;
  color: #333;
}

.timestamp {
  font-size: 12px;
  color: #999;
}

.content-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-content {
  flex: 1;
  color: #666;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-badge {
  margin-left: 8px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .el-avatar {
    width: 44px;
    height: 44px;
  }
  
  .message-container {
    height: 44px;
  }
}
</style>