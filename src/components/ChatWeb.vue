<template>
  <el-container style="display: flex;position: absolute;top: 0;left: 0; width: 100%;
overflow-y: hidden;">
    <el-aside width="200px;" style="background-color: rgb(247,248,250)">
      <div class="search-wrapper">
        <div style="display: inline-flex;align-items: center; gap: 8px;float: left;">

          <svg t="1741575110699" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1462" width="32" height="32">
            <path
              d="M523.946667 85.333333C802.773333 85.333333 982.826667 307.541333 982.826667 511.338667c0 242.837333-197.397333 448-458.837334 448-84.16 0-150.464-16.597333-221.610666-55.402667l-88.618667 50.197333c-27.797333 8.426667-50.474667 5.162667-68.010667-9.834666-17.557333-14.997333-25.130667-34.730667-22.72-59.2a19570.688 19570.688 0 0 0 29.653334-106.368C123.008 741.76 64 656.426667 64 511.338667 64 307.541333 245.141333 85.333333 523.946667 85.333333z m-1.28 64C304.064 149.333333 128 317.12 128 522.666667c0 77.354667 24.874667 151.125333 70.634667 213.184l5.397333 7.125333 18.218667 23.509333-36.970667 128.746667a0.32 0.32 0 0 0 0.490667 0.384l113.408-63.829333 26.752 14.592C385.237333 878.72 452.544 896 522.666667 896 741.269333 896 917.333333 728.213333 917.333333 522.666667S741.269333 149.333333 522.666667 149.333333z m-192 320a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667z m182.848 0a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667z m182.869333 0a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667z"
              fill="#515151" p-id="1463">

            </path>
          </svg> <span> 聊天列表 </span>


        </div>
        <!-- 使用清除浮动 -->
        <div style="clear:both;">

          <Search style="width: 80%;"  @friendselected="friendselected"></Search>

        </div>
      </div>
      <div>
        <div v-for="(item, index) in filteredContant" :key="index" :item="item">
          <Friends :contant="item" class="friend" @click="clickFriends(item)"></Friends>
        </div>
      </div>
    </el-aside>
    <el-container style="flex: 1">
      <el-header>
        <el-row><el-col :span="20"> {{ currentNick }}</el-col>
          <el-col :span="4">
            <!-- 功能按键 -->
            <span style="cursor: pointer;" @click="toHome()">
              <svg t="1742546577105" class="icon" viewBox="0 0 1029 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2432" width="24" height="24">
                <path
                  d="M1001.423238 494.592q21.504 20.48 22.528 45.056t-16.384 40.96q-19.456 17.408-45.056 16.384t-40.96-14.336q-5.12-4.096-31.232-28.672t-62.464-58.88-77.824-73.728-78.336-74.24-63.488-60.416-33.792-31.744q-32.768-29.696-64.512-28.672t-62.464 28.672q-10.24 9.216-38.4 35.328t-65.024 60.928-77.824 72.704-75.776 70.656-59.904 55.808-30.208 27.136q-15.36 12.288-40.96 13.312t-44.032-15.36q-20.48-18.432-19.456-44.544t17.408-41.472q6.144-6.144 37.888-35.84t75.776-70.656 94.72-88.064 94.208-88.064 74.752-70.144 36.352-34.304q38.912-37.888 83.968-38.4t76.8 30.208q6.144 5.12 25.6 24.064t47.616 46.08 62.976 60.928 70.656 68.096 70.144 68.096 62.976 60.928 48.128 46.592zM447.439238 346.112q25.6-23.552 61.44-25.088t64.512 25.088q3.072 3.072 18.432 17.408l38.912 35.84q22.528 21.504 50.688 48.128t57.856 53.248q68.608 63.488 153.6 142.336l0 194.56q0 22.528-16.896 39.936t-45.568 18.432l-193.536 0 0-158.72q0-33.792-31.744-33.792l-195.584 0q-17.408 0-24.064 10.24t-6.656 23.552q0 6.144-0.512 31.232t-0.512 53.76l0 73.728-187.392 0q-29.696 0-47.104-13.312t-17.408-37.888l0-203.776q83.968-76.8 152.576-139.264 28.672-26.624 57.344-52.736t52.224-47.616 39.424-36.352 19.968-18.944z"
                  p-id="2433"></path>
              </svg>
            </span>
            <span style="cursor: pointer;" @click="toChat(1)" v-show="this.$route.query.id == 0">
              <svg style="margin-top: 2px;" t="1742541488425" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2473" width="24" height="24">
                <path
                  d="M381.7 985.3c-10.2 0-20.4-3.9-28.3-11.7-15.6-15.6-15.6-40.9 0-56.5L496 774.5c39-39 90.9-60.5 146.1-60.5h136.2c91.4 0 165.7-74.3 165.8-165.7V284.4c0-91.4-74.4-165.8-165.8-165.8H245.7c-91.4 0-165.8 74.4-165.8 165.8v263.9c0 91.4 74.4 165.7 165.8 165.7h74.4c22.1 0 40 17.9 40 40s-17.9 40-40 40h-74.4C110.2 793.9 0 683.7 0 548.3V284.4C0 148.9 110.2 38.7 245.7 38.7h532.6c135.5 0 245.7 110.2 245.7 245.7v263.9C1024 683.8 913.8 794 778.3 794H642.2c-33.8 0-65.7 13.2-89.6 37.1L410 973.6c-7.8 7.8-18 11.7-28.3 11.7z"
                  fill="#707070" p-id="2474"></path>
                <path d="M322.965 425.019m-50.6 0a50.6 50.6 0 1 0 101.2 0 50.6 50.6 0 1 0-101.2 0Z" fill="#707070"
                  p-id="2475"></path>
                <path d="M512.065 425.019m-50.6 0a50.6 50.6 0 1 0 101.2 0 50.6 50.6 0 1 0-101.2 0Z" fill="#707070"
                  p-id="2476"></path>
                <path d="M701.165 425.019m-50.6 0a50.6 50.6 0 1 0 101.2 0 50.6 50.6 0 1 0-101.2 0Z" fill="#707070"
                  p-id="2477"></path>
              </svg>
            </span>
            <span style="margin-left: 10px; cursor: pointer;" @click="toChat(0)" v-show="this.$route.query.id == 1">
              <svg t="1742541562935" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3603" width="24" height="24">
                <path
                  d="M190.591634 960.526793c-17.717453 0-31.994625-14.277171-31.994625-31.994625 0-69.493701 82.050731-119.721821 226.370569-139.847472l0-9.63279c-97.876029-74.998152-97.876029-213.985554-97.876029-298.616496 0-139.675458 82.222745-223.102301 219.834033-223.102301l7.396607 0c137.611288 0 219.834033 83.426844 219.834033 223.102301 0 10.320847-0.172014 20.641693-0.344028 31.306568-0.516042 17.717453-14.965228 31.650596-32.854695 31.134554-17.717453-0.516042-31.650596-15.137242-31.134554-32.854695 0.344028-9.976818 0.344028-19.781623 0.344028-29.586427 0-105.616664-52.464304-159.113052-155.844784-159.113052l-7.396607 0c-103.38048 0-155.844784 53.496388-155.844784 159.113052 0 102.176382 6.364522 206.244919 83.082815 255.096926 9.288762 5.84848 14.793214 15.997312 14.793214 27.006215L448.956828 817.067025c0 16.341341-12.385016 30.102469-28.554342 31.82261-128.494541 13.589115-197.816227 51.260205-197.816227 79.642533C222.586259 946.077608 208.137074 960.526793 190.591634 960.526793z"
                  fill="#575B66" p-id="3604"></path>
                <path
                  d="M833.752394 960.526793c-17.717453 0-31.994625-14.277171-31.994625-31.994625 0-28.554342-69.321687-66.053418-197.816227-79.642533-16.341341-1.720141-28.726356-15.48127-28.726356-31.82261l0-54.700487c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 26.318159c144.319839 19.953637 226.370569 70.353771 226.370569 139.847472C865.747018 946.077608 851.469847 960.526793 833.752394 960.526793z"
                  fill="#575B66" p-id="3605"></path>
                <path
                  d="M612.198219 673.435243c-44.035612 0-76.890307-4.472367-77.750378-4.644381-15.825298-4.816395-25.286074-20.813707-21.845792-37.155048 3.268268-16.169326 18.40551-26.834201 34.918864-25.286074 79.814547 8.77272 201.600538 1.204099 222.930287-43.175542 7.568621-15.825298 26.662187-22.705863 42.659499-14.965228 15.997312 7.568621 22.705863 26.834201 14.965228 42.659499C794.705191 660.36217 687.368386 673.435243 612.198219 673.435243z"
                  fill="#575B66" p-id="3606"></path>
                <path
                  d="M896.021502 639.892491c-17.717453 0-31.994625-14.277171-31.994625-31.994625l0-111.809172-42.831514-15.309256c-12.729044-4.472367-21.32975-16.685369-21.32975-30.102469 0-160.489165-129.182597-291.219889-287.951621-291.219889-158.769024 0-287.951621 130.730724-287.951621 291.219889 0 10.320847-4.988409 19.953637-13.417101 25.974131l-18.577524 13.245087 0 118.00168c0 17.717453-14.277171 31.994625-31.994625 31.994625s-31.994625-14.277171-31.994625-31.994625l0-134.34302c0-10.320847 4.988409-19.953637 13.417101-25.974131l18.921552-13.589115C169.089871 245.980178 323.386528 95.639845 511.913993 95.639845c186.463296 0 339.555854 147.072065 351.252814 332.331262l43.51957 15.48127c12.729044 4.472367 21.32975 16.685369 21.32975 30.102469l0 134.34302C928.016126 625.61532 913.738955 639.892491 896.021502 639.892491z"
                  fill="#575B66" p-id="3607"></path>
              </svg>
            </span>
          </el-col>
        </el-row>

      </el-header>
      <el-main>
        <!-- 调用子组件的方法 -->
        <Chat ref="Message" @sendchat="sendchat" 
        :isHide="currentTitle == '' ? 1 : 0" :contant="contant"
          :currentTitle="currentTitle"
        ></Chat>
      </el-main>
    </el-container>


    <div class="aimodel">
      <ViewModel 
      v-if="currentTitle == '' ? 0 : 1" :type="emotion" style="scale: 0.5;"
      :currentTitle="currentTitle"
      ref="model"
      ></ViewModel>
    </div>
  </el-container>
</template>

<script>
import Search from './Chat/Search.vue';
import Friends from "./Chat/Friends.vue"
import Chat from "./Chat/Chat.vue"
import ViewModel from "./ViewModel.vue"



import { mapActions, mapGetters } from 'vuex'
import axios from 'axios';
export default {
  computed: {
    ...mapGetters('websocket', ['connectionStatus']),

  },
  name: 'ChatWeb',
  components: {
    Search,
    Friends,
    Chat,
    ViewModel
  },
  data() {
    return {
      contant: [

        // {
        //   "username": "陈", 
        //   "timestamp": "2024/04/12 08:15",
        //   "messageEnd": "项目方案已发邮箱，请查收",
        //   "unreadnum": 2,
        //   "head":"https://img.88icon.com/download/jpg/20210107/400b226fbbb6b3d710cf1ceb00add1a1_512_512.jpg!bg",
        //    "isRobot":0
        // },
        // {
        //   "username": "张",
        //   "timestamp": "2024/05/19 21:08",
        //   "messageEnd": "客户反馈意见汇总表需要今天确认",
        //   "unreadnum": 1,
        //   "head":"https://img.88icon.com/download/jpg/20210107/400b226fbbb6b3d710cf1ceb00add1a1_512_512.jpg!bg",
        //    "isRobot":0
        // },
        // {
        //   "username": "李庆",
        //   "timestamp": "2024/06/03 17:32",
        //   "messageEnd": "服务器维护时间改为凌晨2点",
        //   "unreadnum": 0,
        //   "head":"https://img.88icon.com/download/jpg/20210107/400b226fbbb6b3d710cf1ceb00add1a1_512_512.jpg!bg"
        // },
        // {
        //   "username": "王芳",
        //   "timestamp": "2024/07/22 13:45",
        //   "messageEnd": "本周周报最晚明天中午提交",
        //   "unreadnum": 3,
        //   "head":"https://img.88icon.com/download/jpg/20210107/400b226fbbb6b3d710cf1ceb00add1a1_512_512.jpg!bg"
        // },
        // {
        //   "username": "周伦",
        //   "timestamp": "2024/08/09 19:20",
        //   "messageEnd": "新版本测试环境已部署完成",
        //   "unreadnum": 1,
        //   "head":"https://example.com/avatar.png"
        // },
        // {
        //   "username": "林",
        //   "timestamp": "2024/09/14 10:05",
        //   "messageEnd": "财务报销流程有更新，详见附件",
        //   "unreadnum": 0,
        //   "head":"https://example.com/avatar.png"
        // },
      ],
      currentTitle: "",   //当前对话的用户,
      myusername: "",   //自己的username
      receiver: null,
      dataEmo:['默认','愤怒','难过','生气','思考','笑1','笑2','笑3','震惊','自信'],
      emotion:0
    }
  },
  // socket使用计算属性
  computed: {
    socket() {
      return this.$store.state.websocket.socket
    },
    filteredContant() {
      console.log("12")
    const searchComponent = this.$refs.searchComponent;
    const searchKey = (searchComponent && searchComponent.searchinput 
                      && searchComponent.searchinput.toLowerCase()) || '';
    return this.contant.filter(item => 
      item.username.toLowerCase().includes(searchKey)
    );
  }
  },
  // watch: {
  //   // 监听 socket 变化确保绑定
  //   socket(newSocket) {
  //     if (newSocket && !newSocket.onmessage) {
  //       newSocket.onmessage = this.handleMessage
  //     }
  //   }
  // },
  methods: {
    friendselected(item){

      this.clickFriends(item)
    },
    initWebSocket() {
      // 创建新连接
      const newSocket = new WebSocket("ws://localhost:8091/socket.io")

      // 保存到Vuex
      this.$store.commit('websocket/SET_SOCKET', newSocket)
      this.$store.commit('websocket/SET_CONNECTED', false)

      // 基础事件处理
      newSocket.onopen = () => {
        this.$store.commit('websocket/SET_CONNECTED', true)
        this.$message.success("连接成功!")
        this.sendAuth() // 发送认证

        // 绑定消息处理器
        newSocket.onmessage = this.handleMessage
      }

      newSocket.onclose = () => {
        this.$store.commit('websocket/SET_CONNECTED', false)
      }
    },
    clickFriends(item) {
      console.log("点击好友：", item)
      this.currentTitle = item.username;
      // 当前用户昵称
      this.currentNick=item.nickname


      //TODO:测试 发送消息
      //TODO:NOTICE  关键修改：发送 AUTH 认证消息
      // const usertoken = localStorage.getItem("usertoken");
      // const authMessage = {
      //   type: "MSG",  // 必须包含 type 字段
      //   mess: usertoken, // 携带登录凭证，
      //   mymsg: "你好",
      //   to: "B"
      // };
      // this.socket.send(JSON.stringify(authMessage));

      //获取历史记录
      this.$refs.Message.getHistory(this.currentTitle)

      //清空未读消息
      this.clearUnRead(this.currentTitle)

      //获取咨询商品信息
      this.$refs.Message.loadCurrentGood(this.currentTitle)


// 获取它的店铺形象
    this.$refs.model.getModel(this.currentTitle)


    },
    clearUnRead(receiver) {
      const usertoken = localStorage.getItem("usertoken");
      this.$http.get(this.$constant.baseURL + "/chat/clearUnRead", { usertoken, receiver }).then((res) => {
        if (res.data.code === 200) {
          const index = this.contant.findIndex(item =>
            item.username === receiver
          );
          if (index !== -1) {
            this.$set(this.contant[index], 'unreadnum', 0);
          }

        }

      })
    },
    sendAuth() {
      const token = localStorage.getItem("usertoken")
      if (this.socket) {
        this.socket.send(JSON.stringify({
          type: "AUTH",
          token: token
        }))
      }
    },
    handleMessage(event) {
      //TODO:NOTICE 接收消息
      console.log('收到消息:', event.data)

      const data = JSON.parse(event.data)
      console.log('收到消息:', data)
      //判断消息类型
      if (data.type == "message") {
        console.log("message")
        // TODO:NOTICE 父向子通信
        this.$refs.Message.toMessage(data, this.currentTitle); // 调用子组件方法

        //更新历史对话记录
        const myUsername = this.myusername;
        let targetUsername;

        // 确定要更新的联系人用户名


        targetUsername = data.sender; // 接收到的消息


        // 使用findIndex查找联系人

        const index = this.contant.findIndex(item =>
          item.username === targetUsername
        );
        console.log("username=", targetUsername, ",this.contant=", this.contant, ",index=", index)
        var d = new Date();
        if (index !== -1) {
          // 创建新对象保持响应式更新
          const updatedContact = {
            ...this.contant[index],
            messageEnd: data.content,
            timestamp: d.getHours() + ":" + d.getMinutes()
          };


          // 如果不在当前聊天窗口增加未读
          const isCurrentChat = data.sender === this.currentTitle;
          if (!isCurrentChat) {
            updatedContact.unreadnum = (updatedContact.unreadnum || 0) + 1;

            // 发送未读数更新请求
            this.updateRemoteUnread();
          }


          console.log('updata:', updatedContact)
          // 使用Vue.set确保响应式更新
          this.$set(this.contant, index, updatedContact);
        }

        //TODO: 滚动到底部
        this.autoDi()

      }
    },
    async updateRemoteUnread() {

      const usertoken = localStorage.getItem("usertoken");
      this.http.post(this.$constant.baseURL + "/chat/updateUnread", {
        usertoken,
        receiver: this.myusername
      }).then((response) => {
        if (response.data.code === 200) {
          console.error("未读数更新失败:", response.data.msg);
          // 可选：回滚前端计数
        }

      });



    },

    // connect() {
    //   const usertoken = localStorage.getItem("usertoken");
    //   console.log("connect……")
    //   if (usertoken) {
    //     // 向服务器发送上线了
    //     // this.$http.get(this.$constant.baseURL + "/chat/connect",{"usertoken":usertoken}).then((res)=>{
    //     //       console.log(res)
    //     // }).catch((error)=>{

    //     // })

    //     console.log("gogogog")
    //     this.socket = new WebSocket("ws://localhost:8091/socket.io")


    //     this.socket.onopen = () => {

    //       //TODO:NOTICE  关键修改：发送 AUTH 认证消息
    //       const authMessage = {
    //         type: "AUTH",  // 必须包含 type 字段
    //         token: usertoken  // 携带登录凭证
    //       };
    //       this.socket.send(JSON.stringify(authMessage));

    //       console.log("WebSocket 连接成功！");


    //       this.$message({
    //         message: "连接成功!",
    //         type: "success"
    //       });

    //       //  准备获取联系人列表     

    //       this.userFriendInfo(usertoken);
    //     };

    //     this.socket.onmessage = (event) => {
    //       console.log("收到消息：", event.data);

    //   };


    //     this.socket.onerror = (error) => {
    //       console.error("WebSocket 错误：", error);
    //       this.$message({
    //         message: "连接出错!",
    //         type: "error"
    //       });
    //     };

    //     this.socket.onclose = (event) => {
    //       console.log("WebSocket 连接关闭：", event);
    //       this.$message({
    //         message: "连接关闭!",
    //         type: "error"
    //       });
    //     };

    //   }
    // },
    userFriendInfo(usertoken, roleid) {
      console.log("userfriend:",usertoken,roleid)
      // 获取联系人列表
      return this.$http.get(this.$constant.baseURL + "/chat/getFriend", { "usertoken": usertoken, "roleid": roleid }).then(res => {
        if (res.data.code == 200) {
          console.log("res>>", res)

          this.contant = res.data.data
        }
      })
    },

    sendchat(msg) {
      // console.log("主要的:",to,"===",msg)

      //TODO: 发送消息
      // var toUser="B"

      //TODO:转人工逻辑
      
      const usertoken = localStorage.getItem("usertoken");

      if (msg==("转人工")) {
        this.artificial(usertoken,msg)
      }


      //判断对方是否是机器人
      const currentContact = this.contant.find(item =>
        item.username === this.currentTitle
      );




      if (currentContact.isRobot == 1) {
        //是机器人 机器人回复逻辑
        console.log("是机器人")
        this.chatRobot(usertoken, msg);
        // this.autoDi();

      } else {
        this.chatPeople(usertoken, msg)
      }





    },
    //转人工
    artificial(usertoken,msg) {

      // 立即显示用户消息
      const userMsg = {
        sender: this.myusername,
        content: msg,
        time: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        isSelf: true
      };
      this.$refs.Message.toMessage(userMsg, this.currentTitle);


      // this.currentTitle  是对方
      const merchant = this.currentTitle
      this.$http.get(this.$constant.baseURL + "/chat/toArtificial", { usertoken, merchant }).then((res) => {
        if (res.data.code == 200) {
                  this.show(res.data.data)


                  // TODO:设置是非机器人回复方式
                  // 找到对应索引
              const index = this.contant.findIndex(
                item => item.username === this.currentTitle
              );
              
              if (index !== -1) {
                // 创建新对象保持响应式
                const updatedContact = {
                  ...this.contant[index], // 保留原有属性
                  isRobot: 0              // 更新需要修改的字段
                };
                
                // 使用 Vue.set 确保响应式更新
                this.$set(this.contant, index, updatedContact);
                }
      }
      }).catch(err => {
          console.log("err=",err)
      })


    },
//  显示对方的回复
    show(message){
   // 显示机器人回复
   const botMsg = {
            sender: this.currentTitle,
            content: message,
            time: new Date().toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            isSelf: false
          };
          this.$refs.Message.toMessage(botMsg, this.currentTitle);

          // 更新最后消息
          const index = this.contant.findIndex(item =>
            item.username === this.currentTitle
          );
          if (index !== -1) {
            const d = new Date();
            this.$set(this.contant, index, {
              ...this.contant[index],
              messageEnd: message,
              timestamp: `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
            });
          }
    },

    //TODO:NOTICE 自动滚到底部
    autoDi() {
      // 自动滚动到底部
      this.$nextTick(() => {
        const container = document.querySelector('.messager-container');
        container.scrollTop = container.scrollHeight;
      });
    },
    //与真人聊天的逻辑
    chatPeople(usertoken, msg) {
      const sendMessage = {
        type: "MSG",  // 必须包含 type 字段
        token: usertoken, // 携带登录凭证，
        body: msg,
        to: this.currentTitle
      };
      this.socket.send(JSON.stringify(sendMessage));

      //本地更新最后一条
      const index = this.contant.findIndex(item =>
        item.username === this.currentTitle
      );
      if (index !== -1) {
        var d = new Date();
        this.$set(this.contant, index, {
          ...this.contant[index],
          messageEnd: msg,
          timestamp: d.getHours() + ":" + d.getMinutes()
        });
      }

    },


    //与机器人聊天的逻辑
    // 修改chatRobot方法
    chatRobot(usertoken, msg) {
      console.log("与机器人聊天==",usertoken + ":::" + msg)
      // 立即显示用户消息
      const userMsg = {
        sender: this.myusername,
        content: msg,
        time: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        isSelf: true
      };
      this.$refs.Message.toMessage(userMsg, this.currentTitle);

      // 发送HTTP请求

      const receiver = this.currentTitle;
      const content = msg;

      const robot = { usertoken, receiver, content }


      this.$http.post(this.$constant.baseURL + "/chat/robot", robot).then(response => {
        console.log("机器人response=", response)

        // 显示机器人回复
        const botMsg = {
          sender: this.currentTitle,
          // 1 是回复内容
          content: response.data.data[1].content,
          time: new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }),
          isSelf: false
        };
        this.$refs.Message.toMessage(botMsg, this.currentTitle);

        // 更新最后消息
        const index = this.contant.findIndex(item =>
          item.username === this.currentTitle
        );
        if (index !== -1) {
          const d = new Date();
          this.$set(this.contant, index, {
            ...this.contant[index],
            messageEnd: response.data.data[1].content,
            timestamp: `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
          });
        }


        // TODO: 获取判定情绪
        console.log("用户情绪是:"+response.data.data[2])
         this.emotion=this.dataEmo.indexOf(response.data.data[2])
        

      }).catch(error => {
        this.$message.error('机器人服务暂时不可用：', error);
        console.log("error:", error)
        // 回滚用户消息（可选）
        this.messages = this.messages.filter(m => m._id !== userMsg._id);
      });



    },

    toHome() {
      //几个功能按键
      this.$router.push("/")
    },

    toChat(num){
            console.log("num=",num)



            //TODO:NOTICE 如果用params传参 不能用路由方式 必须用name
    
        this.$router.push({name: 'ChatWeb',query: { id: num}})
    },
  },
  async created() {
    //  旧方案
    // this.connect()




    this.initWebSocket();
    //获取联系人列表

    const usertoken = localStorage.getItem("usertoken");

    //看看参数传过来的是什么 1卖家 0客服
    var toroleid = this.$route.query.id

    //设置默认值
    if (toroleid == undefined) toroleid = 1
    console.log("id=", toroleid)

    // 等待请求完成
    await this.userFriendInfo(usertoken, toroleid);

    // 获取自己的信息
    this.$http.get(this.$constant.baseURL + "/chat/getMy", { usertoken }).then((res) => {
      if (res.data.code == 200) {
        this.myusername = res.data.data.username;
      }
    })

    //什么商品触发的
    if (this.$route.query.user != null) {


      //TODO: 传好友关系
      console.log("contant:", this.contant)
      this.receiver = this.$route.query.user;
      const friend = this.contant.find(m => m.username == this.receiver)
      console.log("friend:", friend)

      // const receiver=this.receiver;

      // this.$http.get(this.$constant.baseURL + "/goods/clearUnRead", { usertoken, receiver }).then((res) => {

      // }).catch(err=>{
      //   console.log("err=",err)
      // })
      this.clickFriends(friend)

    }
    

  },
  destroyed(){
    console.log("转机器人");
    const usertoken=localStorage.getItem("usertoken")
    this.$http.get(this.$constant.baseURL + "/chat/toChatRobot", { usertoken }).then((res) => {
        if(res.data.code==200)console.log("成功")

    })
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-header {
  height: 6vh !important;
  /* border-bottom: 1px solid rgb(240,242,245); */
  line-height: 6vh !important;
  padding-left: 3vw;
  font-size: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-header,
.el-footer {
  background-color: #E9EEF3;
  color: #333;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  background-color: rgb(255, 255, 255);
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  height: 90%;
  ;

  overflow: hidden;
}

body>.el-container {
  margin-bottom: 40px;
}



.el-container[style*="display: flex"] {
  height: 100vh;
  flex-direction: row;
}

.friend {
  cursor: pointer;
}

.friend:hover {
  background-color: rgb(230, 233, 237);

}

.search-wrapper {
  position: sticky;
  top: 0;
  background: rgb(248, 247, 250);
  z-index: 10;
  padding: 8px;
}

.aimodel {
  position: absolute;
   z-index: 2;
  bottom: -20vh;
  right: 5vw;
  width: 500px;
  height: 800px;;
  /* border:1px solid red; */
  opacity: 0.9; /* 半透明效果防止完全遮挡 */
  pointer-events: none; /* 允许穿透点击 */

}
</style>