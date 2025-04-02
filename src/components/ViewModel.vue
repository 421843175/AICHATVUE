<script  >
export default {
  data() {
    return {
      layerList: [],
      model:{},
      data:['默认','愤怒','难过','生气','思考','笑1','笑2','笑3','震惊','自信'],
      emojo:[
      {
        "src": "/static/img/a默认.45987cd.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/思考.4b31f79.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/愤怒.c77ac3f.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/生气.a506aa6.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/笑1.4b6da48.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/笑2.b9a6048.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/笑3.5943c36.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/自信.89df0f4.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/难过.3c1bc7e.png",
        "width": 1158,
        "height": 1287
      },
      {
        "src": "/static/img/震惊.08193a1.png",
        "width": 1158,
        "height": 1287
      }
    ],
    }
  },
  watch: {
  type: {
    immediate: true, // 初始化时立即执行
    handler(newVal) {
      console.log('收到新情绪ID:', newVal)
      this.handleChange(newVal)
    }
  }
},
  props: {
    type: {
      type: Number,
      default: 0
    },
    currentTitle:{
      type:String,
    }
  },

  methods: {
    handleChange(value) {
      console.log("value=",value)
      let d =  this.model.find(item=>{
        console.log("itemai=",item)
        if(item.indexOf(this.data[value]) > -1){
          return item
        }
      })
      this.layerList.forEach(item=>{
        if(item.category === "d_model" ){
          item.image = d
        }
      })
      console.log(`selected ${value}`)
    },
    getModel(merchant){
    this.$http.get(this.$constant.baseURL + "/model/getMerchantModel",{merchant}).then(response => {
              if(response.data.code==200){
              console.log("获取的人物信息:",response.data.data)
              if(response.data.data==null) {
                this.layerList=null;
                this.model=null;
              }
              this.layerList = JSON.parse(response.data.data.layers) || []
              this.model = this.emojo.map(item=>item.src)
                    // TODO: 这里传的是表情ID 0 默认 1 愤怒
              this.handleChange(this.$props.type)
            }
    })
  }
  },

  mounted() {
    this.getModel(this.currentTitle)

  }
}
</script>

<template>
<div class="containers" style="transform: scale(0.7)">
  <!-- <div>预览</div> -->
<!--  <div>-->
<!--    <div @click="handleChange(index)" v-for="(item,index) in data" :key="item">{{item}}</div>-->
<!--  </div>-->
  <div  class="target"
        :data-id="layer.id"
        :data-type="layer.category"
        :style="layer.style" :key="layer.id" v-for="(layer) in layerList">
    <img
        style="width: 100%;height: 100%;" :src="layer.image" alt="">
  </div>
</div>
</template>

<style scoped>
.containers{
  width: 800px;
  height: 800px;
  position: relative;
}

.target{
  position: absolute;
  left: 0;
  top: 0;
  width: 450px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
</style>