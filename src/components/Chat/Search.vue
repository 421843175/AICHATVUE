<template>
    <div style="padding:0 5% 0 5%;">
      <div class="custom-input" style="width: 100%;margin-top: 10%;">
        <el-input
          placeholder="搜索最近联系人"
          prefix-icon="el-icon-search"
          v-model="searchinput"
          class="searchInput"
          @input="handleSearch"
          clearable
        >
          <template #append>
            <el-button @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div v-if="searchResults.length > 0" class="search-results">
        <div 
          v-for="(item, index) in searchResults" 
          :key="index" 
          class="search-item"
          @click="selectFriend(item)"
        >
          <el-avatar :src="item.head" size="small"></el-avatar>
          <span class="username">{{ item.nickname }}</span>
          <span class="last-msg">
            {{ 
    item.messageEnd 
      ? (item.messageEnd.length > 10 
          ? item.messageEnd.slice(0,10) + '...' 
          : item.messageEnd)
      : '暂无聊天记录'
  }}
          </span>
        </div>
      </div>
      <div v-else-if="searchinput" class="empty-tips">
        未找到匹配的联系人
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Search",
    data() {
      return {
        searchinput: "",
        searchResults: [],
        searchTimer: null
      }
    },
    methods: {
      handleSearch() {
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
          if (this.searchinput.trim()) {
            this.$http.get(this.$constant.baseURL +'/chat/searchFriend', {
            
                keyword: this.searchinput,
                usertoken: localStorage.getItem('usertoken')
              
            }).then(res => {
              console.log("search:",res)
              if (res.data.code === 200) {
                this.searchResults = res.data.data;
              }
            });
          } else {
            this.searchResults = [];
          }
        }, 300);
      },
      
      selectFriend(item) {
        console.log(item)
        this.$emit('friendselected', item);
        this.searchinput = "";
        this.searchResults = [];
      }
    }
  }
  </script>
  
  <style scoped>
  .search-results {
    margin-top: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .search-item {
    padding: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
  }
  
  .search-item:hover {
    background-color: #f5f7fa;
  }
  
  .username {
    margin-left: 12px;
    flex: 1;
  }
  
  .last-msg {
    color: #909399;
    font-size: 12px;
    margin-left: 15px;
  }
  
  .empty-tips {
    text-align: center;
    color: #909399;
    padding: 20px;
  }
  </style>