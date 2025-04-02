<template>
    <div class="bigchat">




        <div v-if="isHide == 1" style="text-align:  center;margin-top: 30%;">
            没有聊天 点击一个聊天开始
        </div>
        <div v-else>

            <div style="position:relative">

                <!-- 聊天窗口 -->
                <div class="messager-container" v-if="!isHide">

                    <!-- 展示商品 + 猜你想问 -->
                    <div v-if="currentGood != null && currentGood.name != null" class="consultation-bar">
                        <!-- 商品卡片 -->
                        <div class="goods-card">
                            <img :src="currentGood.src" class="goods-image">
                            <div class="goods-info">
                                <span>{{ currentGood.name }}</span>
                                <span class="price">￥{{ currentGood.price }}</span>
                            </div>
                        </div>
                        <!-- 猜你想问 -->
                        <div class="suggestions-wrapper" v-if="suggestions.length > 0">
                            <div class="suggestions-container">
                                <div class="suggestions-header">
                                    <span>猜你想问:</span>
                                    <el-button @click="refreshSuggestions" type="text" style="margin-right: 4%;">
                                        换一批
                                    </el-button>
                                </div>
                                <div class="suggestions-list">
                                    <el-tag v-for="(item, index) in suggestions" :key="index"
                                        @click="sendSuggestion(item.question)" class="suggestion-item">
                                        {{ item.question }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>






                    <div v-for="(msg, index) in messages" :key="index" class="message-wrapper"
                        :class="{ 'self-message': msg.isSelf }">
                        <!-- 头像 -->
                        <div class="avatar">
                            <img :src="msg.avatar" v-if="msg.avatar">
                            <div v-else class="default-avatar">{{ msg.sender.charAt(0) }}</div>
                        </div>

                        <!-- 消息气泡 -->
                        <div class="bubble">
                            <div class="content">{{ msg.content }}</div>
                            <span class="time">{{ msg.time }}</span>
                        </div>
                    </div>
                </div>


                <div style="position: absolute;left:0;top: 60vh;z-index: 5;">

                    <!-- 组件管理 TODO: 聊天工具栏 -->
                    <div class="emojo">
                        <div class="spanemjoy">
                    
                            <span >
                                <svg t="1741597958730" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2812" width="24" height="24">
                                    <path
                                        d="M682.666667 554.666667v21.333333c0 81.066667-68.266667 149.333333-149.333334 149.333333S384 657.066667 384 576V554.666667h42.666667v21.333333c0 59.733333 46.933333 106.666667 106.666666 106.666667s106.666667-46.933333 106.666667-106.666667V554.666667h42.666667z m-149.333334 341.333333C332.8 896 170.666667 733.866667 170.666667 533.333333S332.8 170.666667 533.333333 170.666667 896 332.8 896 533.333333 733.866667 896 533.333333 896z m0-42.666667c174.933333 0 320-145.066667 320-320S708.266667 213.333333 533.333333 213.333333 213.333333 358.4 213.333333 533.333333 358.4 853.333333 533.333333 853.333333zM469.333333 384v85.333333h-42.666666V384h42.666666z m170.666667 0v85.333333h-42.666667V384h42.666667z"
                                        fill="#444444" p-id="2813"></path>
                                </svg>
                            </span>

                            <span  >
                                <svg t="1741598064293" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1518" width="24" height="24">
                                    <path
                                        d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"
                                        fill="#000000" p-id="1519"></path>
                                </svg>
                            </span>
                            <span >
                                <svg t="1741598122861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4385" width="24" height="24">
                                    <path
                                        d="M896 608a32 32 0 0 1 31.850667 28.928L928 640v96c0 115.946667-93.312 210.133333-209.450667 213.248l-5.909333 0.085333h-401.28c-116.885333 0-212.138667-92.288-215.274667-207.466666L96 736V640a32 32 0 0 1 63.850667-3.072L160 640v96c0 80.704 64.96 146.602667 146.261333 149.248l5.12 0.085333h401.258667c81.962667 0 148.586667-64.234667 151.274667-144.298666l0.085333-5.034667V640a32 32 0 0 1 32-32zM503.978667 123.370667a32 32 0 0 1 34.752-1.706667l2.624 1.706667 266.666666 192a32 32 0 0 1-34.794666 53.610666l-2.581334-1.685333L522.666667 188.757333l-247.978667 178.56a32 32 0 0 1-42.730667-4.864l-1.92-2.432a32 32 0 0 1 4.842667-42.730666l2.432-1.92 266.666667-192z"
                                        fill="#262626" p-id="4386"></path>
                                    <path
                                        d="M522.666667 704a32 32 0 0 1-32-32v-490.666667a32 32 0 0 1 64 0v490.666667a32 32 0 0 1-32 32z"
                                        fill="#262626" p-id="4387"></path>
                                </svg>
                            </span>
                            <span >
                                <svg t="1741598152103" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="5448" width="24" height="24">
                                    <path
                                        d="M779.7 588.6c-23.2 0-45.3 4.4-65.7 12.5L282.9 108.3c-10.2-11.6-27.9-12.8-39.5-2.6-11.6 10.2-12.8 27.9-2.6 39.5l424.4 485.1c-39.3 32.8-64.3 82.2-64.3 137.2 0 98.6 80.2 178.8 178.8 178.8 98.6 0 178.8-80.2 178.8-178.8s-80.2-178.9-178.8-178.9z m0 301.7c-67.7 0-122.8-55.1-122.8-122.8 0-67.7 55.1-122.8 122.8-122.8 67.7 0 122.8 55.1 122.8 122.8 0 67.7-55.1 122.8-122.8 122.8z"
                                        fill="" p-id="5449"></path>
                                    <path
                                        d="M779.7 105.6c-11.6-10.2-29.3-9-39.5 2.6L309 601.1c-20.3-8.1-42.5-12.5-65.7-12.5-98.6 0-178.8 80.2-178.8 178.8s80.2 178.8 178.8 178.8c98.6 0 178.8-80.2 178.8-178.8 0-55.1-25-104.4-64.3-137.2l424.4-485.1c10.3-11.6 9.1-29.3-2.5-39.5zM243.4 890.3c-67.7 0-122.8-55.1-122.8-122.8 0-67.7 55.1-122.8 122.8-122.8 67.7 0 122.8 55.1 122.8 122.8 0 67.7-55.1 122.8-122.8 122.8z"
                                        fill="" p-id="5450"></path>
                                </svg>
                            </span>
                        </div>
                        <div style="position:relative;right:-10vw;overflow-x: hidden;">{{ num }}/500</div>

                    </div>


                    <div style="margin-top: 1%;margin-left: -2%; ">
                        <el-input type="textarea" resize="none" class="inputStyle" style="width: 70vw;"
                            v-model="chatTest">
                        </el-input>
                    </div>

                    <!-- 发送按钮和评价窗口 -->
                    <div style="position: absolute; right: 3vw;bottom: -15vh;">
                        <!-- 评分按钮 -->
                        <span @click="dialogVisible = true" style="margin-right: 30px;
                        vertical-align: middle;
                        cursor: pointer;">
                            <svg t="1743143485353" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3272" width="24" height="24">
                                <path
                                    d="M883.463379 360.628706c0-16.474353 13.402353-29.816471 29.936941-29.816471 16.564706 0 29.936941 13.342118 29.936941 29.816471V994.183529c0 16.474353-13.402353 29.846588-29.936941 29.846589H44.988085A29.906824 29.906824 0 0 1 15.051144 994.183529V98.876235c0-16.474353 13.402353-29.816471 29.936941-29.81647h660.871529c16.564706 0 29.967059 13.342118 29.967059 29.81647 0 16.504471-13.402353 29.846588-29.967059 29.846589H74.985261v835.553882h808.508235V360.628706zM224.669967 576.391529a29.906824 29.906824 0 0 1-29.936941-29.846588c0-16.474353 13.402353-29.846588 29.936941-29.846588h375.506824c16.564706 0 29.936941 13.372235 29.936941 29.816471 0 16.504471-13.402353 29.876706-29.936941 29.876705H224.669967z m0-179.049411a29.906824 29.906824 0 0 1-29.936941-29.846589c0-16.474353 13.402353-29.846588 29.936941-29.846588h276.690824c16.564706 0 29.936941 13.372235 29.936941 29.816471 0 16.504471-13.402353 29.876706-29.936941 29.876706H224.669967z m0 358.098823a29.906824 29.906824 0 0 1-29.936941-29.846588c0-16.474353 13.402353-29.846588 29.936941-29.846588h471.792941c16.564706 0 29.967059 13.372235 29.967059 29.81647 0 16.504471-13.432471 29.876706-29.967059 29.876706H224.669967zM956.829967 9.788235a30.027294 30.027294 0 0 1 42.255059-2.048 29.756235 29.756235 0 0 1 2.108235 42.164706L664.688791 419.779765a30.027294 30.027294 0 0 1-42.285177 2.078117 29.756235 29.756235 0 0 1-2.108235-42.164706L956.829967 9.788235z"
                                    fill="#7F7F7F" p-id="3273"></path>
                            </svg>
                        </span>

                        <el-button type="primary" round size="small" @click="send">发送</el-button>

                    </div>
                </div>

            </div>
        </div>


        <!-- 评分窗口 -->
        <el-dialog title="服务评价" :visible.sync="dialogVisible" width="30%" center @closed="handleDialogClose">
            <div class="rating-dialog">
                <div class="rating-section">
                    <span>评分：</span>
                    <el-rate style="text-align: center;" v-model="score.value"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']" allow-half show-text>
                        <template #default="{ value }">
                            <span class="rate-text">{{ value }} 星</span>
                        </template>
                    </el-rate>
                </div>

                <div class="comment-section">
                    <el-input type="textarea" :rows="4" placeholder="请输入评价内容（可选）" v-model="score.comment"
                        maxlength="200" show-word-limit>
                    </el-input>
                </div>

                <div class="dialog-footer" style="text-align: center;">
                    <el-button type="primary" @click="submitScore" :disabled="this.score.value === 0">
                        提交评价
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Chat",
    data() {
        return {
            chatTest: "",

            // 用this.messages.push()
            messages: [
                // {
                //     sender: 'B',
                //     content: '这是一条收到的消息',
                //     time: '10:30',
                //     avatar: '', 
                //     isSelf: false
                // },
                // {
                //     sender: '我',
                //     content: '这是一条发送的消息',
                //     time: '10:31',
                //     avatar: '',
                //     isSelf: true
                // }
            ],


            suggestions: [
                // { question: "退货需要什么条件？" },
                // { question: "如何查询会员积分？" },
                // { question: "每天的营业时间是？" },
                // { question: "商品缺货何时补货？" },
                // { question: "商品缺货何时补货？" },
                // { question: "商品缺货何时补货？" }
            ],
            currentGood: null, // 新增商品数据字段
            dialogVisible: false,

            score: {
                value: 0,
                comment: ""
            }
        }
    },
    computed: {
        num: {
            get() {
                return this.chatTest.length;
            }
        },

    },
    methods: {
        send() {

            // XSS 
            this.chatTest = this.chatTest
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            //发送消息
            console.log("发送了:", this.chatTest)


            this.$emit("sendchat", this.chatTest)

            var d = new Date();
            //记录
            const newMsg = {
                sender: '我',
                content: this.chatTest,
                time: d.getHours() + ":" + d.getMinutes(),
                avatar: '',
                isSelf: true
            }
            this.messages.push(newMsg)
            // 清空输入框
            this.chatTest = ""
            // 



        },
        toMessage(data, currentTitle) {
            console.log("方法被调用:", data, ":::", currentTitle)
            if (data.sender == currentTitle) {
                this.messages.push(data)

                //  滚到底部
                this.$nextTick(() => {
                    const container = document.querySelector('.messager-container');
                    container.scrollTop = container.scrollHeight;
                });

            }
        },
        //获取历史
        getHistory(receiver) {
            const usertoken = localStorage.getItem("usertoken");
            this.$http.get(this.$constant.baseURL + "/chat/getHistory", { usertoken, receiver }).then((res) => {
                if (res.data.code === 200) {
                    // 清空当前消息
                    this.messages = [];
                    // 转换数据格式
                    res.data.data.forEach(msg => {
                        this.messages.push({
                            sender: msg.sender,
                            content: msg.content,
                            time: msg.time,
                            isSelf: msg.isSelf,
                            avatar: '' // 可添加头像字段
                        });
                    });
                }
            })
        },
        async loadCurrentGood(currentTitle) {
            try {
                const usertoken = localStorage.getItem("usertoken");

                const username2 = currentTitle;
                const res = await this.$http.get(this.$constant.baseURL + "/goods/consultant", {
                    usertoken: usertoken,
                    username2: username2
                });

                if (res.data.code === 200) {
                    this.currentGood = res.data.data;
                    console.log("currentGoods:", this.currentGood)
                    await this.loadSuggestions();
                }
            } catch (error) {
                console.error("获取商品失败:", error);
            }
        },

        //获取推荐问题
        async loadSuggestions() {
            console.log("走了")
            try {
                if (this.currentGood.merchant != null && this.currentGood.id != null) {
                    const res = await this.$http.get(this.$constant.baseURL + "/reply/suggestions", {

                        merchant: this.currentGood.merchant,
                        goodsId: this.currentGood.id

                    });

                    if (res.data.code === 200) {
                        this.suggestions = res.data.data
                            .map(item => ({ question: item.question }));

                        console.log("suggestions:", this.suggestions)
                    }
                }
            } catch (error) {
                console.error('获取推荐问题失败:', error);

            }
        },

        // 换一批问题
        async refreshSuggestions() {
            await this.loadSuggestions();
        },

        // 回答问题
        async sendSuggestion(question) {
            // 发送用户问题
            this.chatTest = question;

            //走send方法
            this.send();

            try {
                // 获取答案
                // const answer = await this.getAnswerFromAPI(question);

                // 添加机器人回复
                // this.addBotMessage(answer);


            } catch (error) {
                console.error('获取答案失败:', error);
                this.addBotMessage('暂时无法回答该问题，请稍后再试');
            }
        },

        async getAnswerFromAPI(question) {

            const usertoken = localStorage.getItem("usertoken");
            const res = await this.$http.get(this.$constant.baseURL + "/reply/answer", {
                question: question,
                merchant: this.currentGood.merchant,
                usertoken: usertoken
            });

            if (res.data.code === 200) {
                return res.data.data;
            }
            throw new Error('未找到相关答案');
        },

        // addBotMessage(content) {
        //     const d = new Date();
        //     this.messages.push({
        //         sender: this.currentTitle,
        //         content: content,
        //         time: d.getHours() + ":" + d.getMinutes(),
        //         avatar: '',
        //         isSelf: false
        //     });

        //     // 自动滚动到底部
        //     this.$nextTick(() => {
        //         const container = document.querySelector('.messager-container');
        //         container.scrollTop = container.scrollHeight;
        //     });
        // }
        async submitScore() {
            try {
                const usertoken = localStorage.getItem("usertoken")
                const request={
                    merchant: this.currentTitle,
                    username: usertoken, // 需要实现获取用户名的方法
                    score: this.score.value,
                    content: this.score.comment
                }
                const res = await this.$http.post(this.$constant.baseURL + "/evaluate/submit", request)

                if (res.data.code === 200) {
                    this.$message.success('评价提交成功！')
                    this.dialogVisible = false
                }

            } catch (error) {
                console.error('评价提交失败:', error)
                this.$message.error(error)
            }
        },

        // 关闭弹窗重置数据
        handleDialogClose() {
            this.score.value = 0
            this.score.comment = ''
        },

    },
    props: ['isHide', 'message', 'contant', 'currentTitle'],

}

</script>

<style>
.emojo {
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.spanemjoy span {
    cursor: pointer;
}

.el-textarea__inner {
    width: 100% !important;
    background-color: transparent !important;
    border: 0 !important;
    font-size: 16px !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}



/* //消息 */


.message-wrapper {
    display: flex;
    margin: 15px 0;
    max-width: 80%;
}

/* 对方消息样式 */
.message-wrapper:not(.self-message) {
    flex-direction: row;
    align-items: flex-start;
    margin-right: auto;

    .avatar {
        margin-right: 12px;
    }

    .bubble {
        background: #fff;
        border-radius: 5px 15px 15px 5px;

        &::before {
            content: "";
            position: absolute;
            left: -8px;
            top: 10px;
            border: 8px solid transparent;
            border-right-color: #fff;
        }
    }
}

/* 自己消息样式 */
.self-message {
    flex-direction: row-reverse;
    margin-left: auto;

    .avatar {
        margin-left: 12px;
    }

    .bubble {
        background: #95ec69;
        border-radius: 15px 5px 5px 15px;

        &::before {
            content: "";
            position: absolute;
            right: -8px;
            top: 10px;
            border: 8px solid transparent;
            border-left-color: #95ec69;
        }
    }
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    flex-shrink: 0;
    background: #eee;

    .default-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-weight: bold;
    }
}

.bubble {
    position: relative;
    padding: 12px;
    min-width: 60px;
    max-width: 80%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    .content {
        word-break: break-word;
        line-height: 1.5;
    }

    .time {
        display: block;
        font-size: 12px;
        color: #666;
        text-align: right;
        margin-top: 5px;
    }
}

.input-area {
    border-top: 1px solid #e0e0e0;
    padding: 15px;
    background: #fff;

    .action-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        .counter {
            font-size: 12px;
            color: #999;
        }
    }
}

.messager-container {
    height: calc(100vh - 300px);
    /* 总高度减去输入区高度 */
    overflow-y: auto;
    /* 垂直滚动 */
    padding: 0 15px;
    scroll-behavior: smooth;
    overflow-anchor: auto;

}



/* 猜你想问 */
.suggestions-container {
    padding: 12px;

    border-radius: 8px;
    margin-bottom: 16px;

}

.suggestions-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.suggestions-header span {
    font-size: 14px;
    color: #666;
    flex: 1;
}

.refresh-btn {
    padding: 0;
    color: #409EFF;
}

.suggestions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.suggestion-item {
    cursor: pointer;
    transition: all 0.3s;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.suggestion-item:hover {
    background: #ecf5ff;
    border-color: #c6e2ff;
}


.consultation-bar {
    display: flex;
    /* 改为弹性布局 */
    gap: 20px;
    margin-bottom: 20px;
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 40vw;
}

/* 商品卡片 */
.goods-card {

    flex: 0 0 200px;
    /* 固定宽度 */
}

.suggestions-wrapper {
    flex: 1;
    min-width: 0;
    /* 防止内容溢出 */
    position: relative;
    z-index: 10;
}

.goods-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 10px;
}

.goods-info h4 {
    margin: 0 0 8px;
    font-size: 14px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    overflow: hidden;
}

.price {
    color: #e4393c;
    font-size: 16px;
    font-weight: bold;
}

/* 调整猜你想问 */
.suggestions-container {
    width: 100%;
    margin: 0;
}

.suggestions-list {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.bigchat {
    position: relative;
}




</style>