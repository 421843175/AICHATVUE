<template>
    <div style="overflow: hidden;  margin-top: 60px;">
    <div class="center">
        <div class="logon">
            <div :class="overlaylong">
                <el-form ref="form" :model="form" 
                label-width="80px"  :rules="rules">
                <div class="overlaylong-Signin" v-if="disfiex == 0">
                    <h2 class="overlaylongH2">登录页</h2>
                    
                    <el-form-item  prop="username">
                        <el-input placeholder="账号"  v-model="form.username" style="margin-left: -20%;"></el-input>
                    </el-form-item>
                    <el-form-item prop="passwd" >
                        <el-input placeholder="密码" type="password"  v-model="form.passwd" style="margin-left: -20%;"></el-input>
                    </el-form-item>
                    <!-- TODO: 这里完善登录逻辑 -->
                    <el-button class="inupbutton" @click="submitLogin">登录</el-button>

                </div>


                <div class="overlaylong-Signup" v-if="disfiex == 1">
         
                    <h2 class="overlaylongH2">注册账户</h2>
                    <div >
                        <el-radio v-model="form.role" label="1">我是卖家</el-radio>
                       &nbsp;&nbsp; &nbsp; &nbsp;  <el-radio v-model="form.role" label="2">我是买家</el-radio>
                    </div>
                    
                 <el-form-item  label="昵称" >
                     昵称:      <el-input placeholder="昵称"  v-model="form.nick" style="margin-left: -20%;"></el-input>
                    </el-form-item>
                 
                    <el-form-item label="账号">
                     账号:   <el-input placeholder="账号"  v-model="form.username" style="margin-left: -20%;"></el-input>
                    </el-form-item>

                    <el-form-item prop="password" label="密码">
                      密码:  <el-input placeholder="密码" type="password"  v-model="form.password" style="margin-left: -20%;"></el-input>
                    </el-form-item>

                    <el-form-item prop="repasswd" label="确认密码">
                      确认:  <el-input placeholder="确认密码"  type="password"  v-model="form.repasswd" style="margin-left: -20%;"></el-input>
                    </el-form-item>
                    <!-- TODO: 这里完善注册逻辑 -->
                    <el-button class="inupbutton" @click="submitRegister">注册</el-button>
              
                </div>
            </el-form>

            </div>
            <div :class="overlaytitle">
                <div class="overlaytitle-Signin" v-if="disfiex == 0">
                    <h2 class="overlaytitleH2">人工智能客服系统</h2>
                    <p class="overlaytitleP">
                        点击这里开始注册
                    </p>
                    
                    <div class="buttongohs" @click="Signin">去注册</div>
                </div>



                <div class="overlaytitle-Signup" v-if="disfiex == 1">
                    <h2 class="overlaytitleH2">人工智能客服系统</h2>
                    <p class="overlaytitleP">如果你有账户请开始登录</p>
                    <div class="buttongohs" @click="Signup">去登陆</div>
                </div>
            </div>
        </div>
</div>
    </div>
</template>

<script>

export default {
    data () {
        var validatePass2 = (rule, value, callback) => {
            console.log("rule=",rule,",value=",value,",callback=",callback)
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            overlaylong: 'overlaylong',
            overlaytitle: 'overlaytitle',
            disfiex: 0,
            form:{
                nick:"",
                username:"",
                password:"",
                repasswd:"",
                role: "2"
            },
            rules: {
                username:[
                    {required:true,message: '请输入账号', trigger: 'blur'}
                ],
                passwd: [  // 增加密码字段的验证规则
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                repasswd: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        }
       
    }, 

    methods: {
        submitRegister() {
  this.$refs.form.validate(valid => {
    if (valid) {
      // 提交逻辑


      console.log("执行提交");

      let user = {
          username: this.form.username.trim(),
          password: this.$common.encrypt(this.form.password.trim()),
          nick:this.form.nick.trim(),
          role:this.form.role
        };

      this.$http.post(this.$constant.baseURL + "/user/register",user).then((res)=>{
        if(res.data.code==200){
            this.$message({
              message: res.data.message,
              type: "success"
            });

            this.form = {
                nick: "",
                username: "",
                password: "",
                repasswd: "",
                role: 2
                };
            //转入登录
            this.disfiex=0;
        }
        console.log(res)
      }).catch((error)=>{
        this.$message({
              message: error.message,
              type: "error"
            });
      })

    } else {
      console.log('验证失败');
    }
  });
},


// 登录
submitLogin() {
  this.$refs.form.validate(valid => {
    console.log("执行提交登录")
    if (valid) {
        let user = {
          username: this.form.username.trim(),
          password: this.$common.encrypt(this.form.password.trim()),
        };

      // 提交逻辑
      this.$http.post(this.$constant.baseURL + "/user/login",user).then((res)=>{
            if(res.data.code==200){
                this.$message({
                    message: "登录成功!",
                    type: "success"
                });
                //存入cookie
                localStorage.setItem("usertoken", res.data.data);
                this.$router.push("/");
            }
    
    }).catch((error)=>{
        this.$message({
              message: error.message,
              type: "error"
            });
      })
    } else {
      console.log('验证失败');
    }
  });
},
        Signin () {
            this.overlaylong = "overlaylongleft"
            this.overlaytitle = "overlaytitleright"
            setTimeout(() => {
                this.disfiex = 1
            }, 200)
        },
         Signup () {
            this.overlaylong = "overlaylongright"
            this.overlaytitle = "overlaytitleleft"

            setTimeout(() => {
                this.disfiex = 0
            }, 200)
        }
    }
}



</script>
<style>
.center {
    width: 1920px;
    height: 550px;
    margin-left: 20%;
    display: flex;
    flex-direction: column;
}

h1 {
    font-size: 30px;
    color: black;
}

.logon {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    /* position: relative;
		overflow: hidden; */
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    margin-top: 20px;
    display: flex;
    background: -webkit-linear-gradient(right, #4284db, #29eac4);
}

.overlaylong {
    border-radius: 10px 0 0 10px;
    width: 50%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlaylongleft {
    border-radius: 0px 10px 10px 0px;
    width: 50%;
    height: 100%;
    background-color: #fff;
    transform: translateX(100%);
    transition: transform 0.6s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlaylongright {
    border-radius: 10px 0 0 10px;
    width: 50%;
    height: 100%;
    background-color: #fff;
    transform: translateX(0%);
    transition: transform 0.6s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlaytitle {
    border-radius: 0px 10px 10px 0px;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}


.overlaytitleH2 {
    font-size: 30px;
    color: #fff;
    margin-top: 20px;
}

.overlaytitleP {
    font-size: 15px;
    color: #fff;
    margin-top: 20px;
}

.overlaytitleleft {
    border-radius: 0px 10px 10px 0px;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(0%);
    transition: transform 0.6s ease-in-out;
}

.overlaytitleright {
    border-radius: 0px 10px 10px 0px;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-100%);
    transition: transform 0.6s ease-in-out;
}

.overlaytitle-Signin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.overlaytitle-Signup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.buttongohs {
    width: 180px;
    height: 40px;
    border-radius: 50px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 15px;
    text-align: center;
    line-height: 40px;
    margin-top: 40px;
}

.overlaylongH2 {
    font-size: 25px;
    color: black;
    /* width: 250px; */
}

.overlaylong-Signin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.overlaylong-Signup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 10px 0;
    /* width: 240px; */
}

h3 {
    font-size: 10px;
    margin-top: 10px;
    cursor: pointer;
}

.inupbutton {
    background-color: #29eac4;
    border: none;
    width: 180px;
    height: 40px;
    border-radius: 50px;
    font-size: 15px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    margin-top: 30px;
    cursor: pointer;
    
    padding:0px;
}

.el-form-item__error {
    margin-left: -80%;
  color: #ff4949 !important; /* 强制覆盖继承样式 */
  font-size : 13px;
}



/* 新增表单样式 */
.el-form-item__label {
    color: #606266 !important;  /* 确保标签可见 */
    padding-right: 12px;       /* 增加标签右边距 */
    margin-top:8px;
}

.form-input {
    width: 220px;  /* 固定输入框宽度 */
    /* 移除原来的margin-left */
}

/* 调整错误提示位置 */
.el-form-item__error {
    left: 100px;   /* 对齐标签宽度 */
    margin-top: 2px;
}

/* 保持原有其他样式 */
</style>



