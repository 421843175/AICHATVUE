<template>
    <div class="bigdiv">

        <div class="welcome">
        <div class="one">
        <el-dropdown>
            <span style="color:black">欢迎&nbsp;&nbsp;&nbsp;
                <span style="color: rgb(236, 121, 73);cursor: pointer;">{{ nick }}<i
                    class="el-icon-arrow-down el-icon--right"></i></span></span> 
            <el-dropdown-menu slot="dropdown">
               <div class="headinfo">
                    <el-row>
                        <el-col :span="8">
                            <img style="border-radius: 60%;"
                             :src="this.head" width="100%" height="100%">
                        </el-col>
                        <el-col :span="16">

                            <div class="nick">{{ nick }}</div>
                            <div style="margin-top: 3%;margin-left: 8%;">
                                <span style="cursor: pointer;" @click="account">账号管理</span>&nbsp;&nbsp;
                                <span style="color: rgb(229,229,229);">|</span>&nbsp; &nbsp;
                                <span style="cursor: pointer;" @click="back">退出</span></div>
                        </el-col>
                    </el-row>
               </div>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div class="two">
        <!-- 卖家 -->
            <span style="cursor: pointer;" @click="toChat(1)">
                <svg style="margin-top: 2px;" t="1742541488425" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2473" width="24" height="24"><path d="M381.7 985.3c-10.2 0-20.4-3.9-28.3-11.7-15.6-15.6-15.6-40.9 0-56.5L496 774.5c39-39 90.9-60.5 146.1-60.5h136.2c91.4 0 165.7-74.3 165.8-165.7V284.4c0-91.4-74.4-165.8-165.8-165.8H245.7c-91.4 0-165.8 74.4-165.8 165.8v263.9c0 91.4 74.4 165.7 165.8 165.7h74.4c22.1 0 40 17.9 40 40s-17.9 40-40 40h-74.4C110.2 793.9 0 683.7 0 548.3V284.4C0 148.9 110.2 38.7 245.7 38.7h532.6c135.5 0 245.7 110.2 245.7 245.7v263.9C1024 683.8 913.8 794 778.3 794H642.2c-33.8 0-65.7 13.2-89.6 37.1L410 973.6c-7.8 7.8-18 11.7-28.3 11.7z" fill="#707070" p-id="2474"></path><path d="M322.965 425.019m-50.6 0a50.6 50.6 0 1 0 101.2 0 50.6 50.6 0 1 0-101.2 0Z" fill="#707070" p-id="2475"></path><path d="M512.065 425.019m-50.6 0a50.6 50.6 0 1 0 101.2 0 50.6 50.6 0 1 0-101.2 0Z" fill="#707070" p-id="2476"></path><path d="M701.165 425.019m-50.6 0a50.6 50.6 0 1 0 101.2 0 50.6 50.6 0 1 0-101.2 0Z" fill="#707070" p-id="2477"></path></svg>
            </span>
            <!-- 客服 -->
            <span  style="margin-left: 10px; cursor: pointer;" @click="toChat(0)">
                <svg t="1742541562935" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3603" width="24" height="24"><path d="M190.591634 960.526793c-17.717453 0-31.994625-14.277171-31.994625-31.994625 0-69.493701 82.050731-119.721821 226.370569-139.847472l0-9.63279c-97.876029-74.998152-97.876029-213.985554-97.876029-298.616496 0-139.675458 82.222745-223.102301 219.834033-223.102301l7.396607 0c137.611288 0 219.834033 83.426844 219.834033 223.102301 0 10.320847-0.172014 20.641693-0.344028 31.306568-0.516042 17.717453-14.965228 31.650596-32.854695 31.134554-17.717453-0.516042-31.650596-15.137242-31.134554-32.854695 0.344028-9.976818 0.344028-19.781623 0.344028-29.586427 0-105.616664-52.464304-159.113052-155.844784-159.113052l-7.396607 0c-103.38048 0-155.844784 53.496388-155.844784 159.113052 0 102.176382 6.364522 206.244919 83.082815 255.096926 9.288762 5.84848 14.793214 15.997312 14.793214 27.006215L448.956828 817.067025c0 16.341341-12.385016 30.102469-28.554342 31.82261-128.494541 13.589115-197.816227 51.260205-197.816227 79.642533C222.586259 946.077608 208.137074 960.526793 190.591634 960.526793z" fill="#575B66" p-id="3604"></path><path d="M833.752394 960.526793c-17.717453 0-31.994625-14.277171-31.994625-31.994625 0-28.554342-69.321687-66.053418-197.816227-79.642533-16.341341-1.720141-28.726356-15.48127-28.726356-31.82261l0-54.700487c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 26.318159c144.319839 19.953637 226.370569 70.353771 226.370569 139.847472C865.747018 946.077608 851.469847 960.526793 833.752394 960.526793z" fill="#575B66" p-id="3605"></path><path d="M612.198219 673.435243c-44.035612 0-76.890307-4.472367-77.750378-4.644381-15.825298-4.816395-25.286074-20.813707-21.845792-37.155048 3.268268-16.169326 18.40551-26.834201 34.918864-25.286074 79.814547 8.77272 201.600538 1.204099 222.930287-43.175542 7.568621-15.825298 26.662187-22.705863 42.659499-14.965228 15.997312 7.568621 22.705863 26.834201 14.965228 42.659499C794.705191 660.36217 687.368386 673.435243 612.198219 673.435243z" fill="#575B66" p-id="3606"></path><path d="M896.021502 639.892491c-17.717453 0-31.994625-14.277171-31.994625-31.994625l0-111.809172-42.831514-15.309256c-12.729044-4.472367-21.32975-16.685369-21.32975-30.102469 0-160.489165-129.182597-291.219889-287.951621-291.219889-158.769024 0-287.951621 130.730724-287.951621 291.219889 0 10.320847-4.988409 19.953637-13.417101 25.974131l-18.577524 13.245087 0 118.00168c0 17.717453-14.277171 31.994625-31.994625 31.994625s-31.994625-14.277171-31.994625-31.994625l0-134.34302c0-10.320847 4.988409-19.953637 13.417101-25.974131l18.921552-13.589115C169.089871 245.980178 323.386528 95.639845 511.913993 95.639845c186.463296 0 339.555854 147.072065 351.252814 332.331262l43.51957 15.48127c12.729044 4.472367 21.32975 16.685369 21.32975 30.102469l0 134.34302C928.016126 625.61532 913.738955 639.892491 896.021502 639.892491z" fill="#575B66" p-id="3607"></path></svg>
            </span>
            <!-- 卖家设置 -->
            <span v-if="this.role==1"  style="margin-left: 10px; cursor: pointer;" @click="toSetting">
                <svg t="1743063658931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2425" width="24" height="24"><path d="M919.6 405.6l-57.2-8c-12.7-1.8-23-10.4-28-22.1-11.3-26.7-25.7-51.7-42.9-74.5-7.7-10.2-10-23.5-5.2-35.3l21.7-53.5c6.7-16.4 0.2-35.3-15.2-44.1L669.1 96.6c-15.4-8.9-34.9-5.1-45.8 8.9l-35.4 45.3c-7.9 10.2-20.7 14.9-33.5 13.3-14-1.8-28.3-2.8-42.8-2.8-14.5 0-28.8 1-42.8 2.8-12.8 1.6-25.6-3.1-33.5-13.3l-35.4-45.3c-10.9-14-30.4-17.8-45.8-8.9L230.4 168c-15.4 8.9-21.8 27.7-15.2 44.1l21.7 53.5c4.8 11.9 2.5 25.1-5.2 35.3-17.2 22.8-31.7 47.8-42.9 74.5-5 11.8-15.3 20.4-28 22.1l-57.2 8C86 408 72.9 423 72.9 440.8v142.9c0 17.7 13.1 32.7 30.6 35.2l57.2 8c12.7 1.8 23 10.4 28 22.1 11.3 26.7 25.7 51.7 42.9 74.5 7.7 10.2 10 23.5 5.2 35.3l-21.7 53.5c-6.7 16.4-0.2 35.3 15.2 44.1L354 927.8c15.4 8.9 34.9 5.1 45.8-8.9l35.4-45.3c7.9-10.2 20.7-14.9 33.5-13.3 14 1.8 28.3 2.8 42.8 2.8 14.5 0 28.8-1 42.8-2.8 12.8-1.6 25.6 3.1 33.5 13.3l35.4 45.3c10.9 14 30.4 17.8 45.8 8.9l123.7-71.4c15.4-8.9 21.8-27.7 15.2-44.1l-21.7-53.5c-4.8-11.8-2.5-25.1 5.2-35.3 17.2-22.8 31.7-47.8 42.9-74.5 5-11.8 15.3-20.4 28-22.1l57.2-8c17.6-2.5 30.6-17.5 30.6-35.2V440.8c0.2-17.8-12.9-32.8-30.5-35.2z m-408 245.5c-76.7 0-138.9-62.2-138.9-138.9s62.2-138.9 138.9-138.9 138.9 62.2 138.9 138.9-62.2 138.9-138.9 138.9z" fill="" p-id="2426"></path></svg>
            </span>

                   <!-- 客服设置 -->
            <span v-if="this.role==0"  style="margin-left: 10px; cursor: pointer;" @click="toSetting">
                <svg t="1743063658931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2425" width="24" height="24"><path d="M919.6 405.6l-57.2-8c-12.7-1.8-23-10.4-28-22.1-11.3-26.7-25.7-51.7-42.9-74.5-7.7-10.2-10-23.5-5.2-35.3l21.7-53.5c6.7-16.4 0.2-35.3-15.2-44.1L669.1 96.6c-15.4-8.9-34.9-5.1-45.8 8.9l-35.4 45.3c-7.9 10.2-20.7 14.9-33.5 13.3-14-1.8-28.3-2.8-42.8-2.8-14.5 0-28.8 1-42.8 2.8-12.8 1.6-25.6-3.1-33.5-13.3l-35.4-45.3c-10.9-14-30.4-17.8-45.8-8.9L230.4 168c-15.4 8.9-21.8 27.7-15.2 44.1l21.7 53.5c4.8 11.9 2.5 25.1-5.2 35.3-17.2 22.8-31.7 47.8-42.9 74.5-5 11.8-15.3 20.4-28 22.1l-57.2 8C86 408 72.9 423 72.9 440.8v142.9c0 17.7 13.1 32.7 30.6 35.2l57.2 8c12.7 1.8 23 10.4 28 22.1 11.3 26.7 25.7 51.7 42.9 74.5 7.7 10.2 10 23.5 5.2 35.3l-21.7 53.5c-6.7 16.4-0.2 35.3 15.2 44.1L354 927.8c15.4 8.9 34.9 5.1 45.8-8.9l35.4-45.3c7.9-10.2 20.7-14.9 33.5-13.3 14 1.8 28.3 2.8 42.8 2.8 14.5 0 28.8-1 42.8-2.8 12.8-1.6 25.6 3.1 33.5 13.3l35.4 45.3c10.9 14 30.4 17.8 45.8 8.9l123.7-71.4c15.4-8.9 21.8-27.7 15.2-44.1l-21.7-53.5c-4.8-11.8-2.5-25.1 5.2-35.3 17.2-22.8 31.7-47.8 42.9-74.5 5-11.8 15.3-20.4 28-22.1l57.2-8c17.6-2.5 30.6-17.5 30.6-35.2V440.8c0.2-17.8-12.9-32.8-30.5-35.2z m-408 245.5c-76.7 0-138.9-62.2-138.9-138.9s62.2-138.9 138.9-138.9 138.9 62.2 138.9 138.9-62.2 138.9-138.9 138.9z" fill="" p-id="2426"></path></svg>
            </span>
    </div>
    </div>

        <div class="shops">
            <span class="shopone" v-for="(item, index) in goods" :key="index">
                <el-card style="cursor: pointer;" @click.native="contantMerchant(item)">
                    <img :src="item.src" class="image" style="padding: -20px;width: 300px;height: 300px;">
                    <div>
                        <span class="text-wrap">{{ item.name }}</span>
                        <div class="bottom clearfix">
                            <span class="price">￥
                                <span style="font-size: 28px;">{{ item.price }}</span></span>

                        </div>
                    </div>
                </el-card>
            </span>
            <!-- <span class="shopone"></span>
        <span class="shopone"></span>
        <span class="shopone">2</span>
        <span class="shopone">2</span>
        <span class="shopone"></span>
        <span class="shopone"></span>
        <span class="shopone"></span>
        <span class="shopone"></span>
        <span class="shopone"></span>
        <span class="shopone"></span>
        <span class="shopone"></span> -->
        </div>

        <Account  :visible="accountDialogVisible"
        @close="cancelAccount"></Account>
    </div>
</template>

<script>
import Account from './Chat/Account.vue'

export default {
    name: 'Shops',
    components:{
        Account
    },
    data() {
        return {
            nick: "",
            head:"",
            role: 2,//角色 默认买家
            goods: [
                // {
                //     src: "https://picsum.photos/200/200?random=1",
                //     name: "3Dmax日漫Q版换装模型套装（含10套服装+5种发型）",
                //     price: 68
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=2",
                //     name: "Blender卡通角色建模素材包-校园风系列",
                //     price: 88
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=3",
                //     name: "Maya古风建筑场景模型-江南水乡完整套件",
                //     price: 199
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=4",
                //     name: "ZBrush奇幻生物雕刻模型-龙与魔法生物合集",
                //     price: 158
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=5",
                //     name: "Unity二次元角色控制器+动画资源包",
                //     price: 128
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=6",
                //     name: "Substance Painter材质库-赛博朋克风格贴图合集",
                //     price: 78
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=7",
                //     name: "C4D电商产品展示动画模板-科技电子产品专场",
                //     price: 199
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=8",
                //     name: "Houdini特效工程文件-爆炸与流体特效模板",
                //     price: 299
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=9",
                //     name: "AE MG动画模板包-互联网数据可视化动效合集",
                //     price: 88
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=10",
                //     name: "Premiere转场特效包-200+影视级过渡效果",
                //     price: 68
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=11",
                //     name: "Photoshop笔刷套装-国风水墨绘画工具集",
                //     price: 38
                // },
                // {
                //     src: "https://picsum.photos/200/200?random=12",
                //     name: "DAZ Studio角色模型-现代都市人物角色合集",
                //     price: 158
                // }
            ],
            accountDialogVisible:false
        }
    },
    methods:{
        toChat(num,item){
            console.log("num=",num)



            //TODO:NOTICE 如果用params传参 不能用路由方式 必须用name
           
            if(item!=null)
            this.$router.push({name: 'ChatWeb',query: { id: num,user:item.merchant }})
        else 
        this.$router.push({name: 'ChatWeb',query: { id: num}})
        },
        back(){
            localStorage.removeItem("usertoken");
            this.$message.success('成功注销');
            this.$router.push("/login")
        },
        contantMerchant(item){
            console.log("item=",item)
            const usertoken=localStorage.getItem("usertoken")
            this.$http.post(this.$constant.baseURL + "/goods/toChat",{usertoken,item}).
            then((res)=>{
                if(res.data.code==200){
                    this.toChat(1,item)
                }
            }).catch((err)=>{
                this.$message.error(err.message);
            })
        },

        // 账号管理
        account(){
           this.accountDialogVisible=true
        },

        //关闭Dialog
        cancelAccount(){
            this.accountDialogVisible=false
        },


        //卖家设置页
        toSetting(){
            this.$router.push("/customersetting")
        }    
    },
    created() {
        this.$http.get(this.$constant.baseURL + "/goods/list").then((res) => {
            if (res.data.code == 200) {
                this.goods = res.data.data
            }
        })

        const usertoken = localStorage.getItem("usertoken")
        this.$http.get(this.$constant.baseURL + "/chat/getMy", { usertoken }).then((res) => {
            if (res.data.code == 200) {
                this.nick = res.data.data.nick;
               this.head= res.data.data.head;
               this.role=res.data.data.role;
            }
        })
    }

}

</script>


<style>
* {
    padding: 0;
    margin: 0;
}

.shops {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: 3vw;
}

.shopone {
    /* height: 300px; */
    width: 20vw;
    margin-left: -4px;
    background-color: rgb(255, 255, 255);
    margin-right: 1vw;
    margin-top: 50px
}

.el-card__body {
    padding: 6px !important;
}

.bigdiv {
    background-color: rgb(233, 238, 243);
    /* height: 800px; */
    padding-bottom: 50px;
}

/* 文本换行处理 */
.text-wrap {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    display: block;
    width: 100%;
    font-family: "Microsoft YaHei", "微软雅黑";
    margin-top: 10px;
}

.price {
    color: rgb(219, 125, 88);
    margin-top: 10px;
}


.welcome {
    height: 30px;
    background-color: white;
    line-height: 30px;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;

}

.headinfo{
    height: 30px;
    width: 20vw;

}

.nick{
    margin-left: 8%;
    margin-top: 20px;
    font-weight:bold;
}

.two {
    margin-right: 5vw;
}
</style>