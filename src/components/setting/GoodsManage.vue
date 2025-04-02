<template>
  <div>
    <div class="operation-bar">
      <el-button type="primary" icon="el-icon-plus" @click="openCreateDialog">新增商品</el-button>
    </div>



    <!-- 新增商品弹窗 -->
    <el-dialog title="新增商品" :visible.sync="createVisible" width="40%">
      <el-form :model="createForm" label-width="80px">
        <el-form-item label="商品名称" required>
          <el-input v-model="createForm.name"></el-input>
        </el-form-item>

        <el-form-item label="价格" required>
          <el-input-number v-model="createForm.price" :min="0" :precision="2"></el-input-number>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload class="image-uploader" :action="this.$constant.baseURL + '/upload/goods'" :show-file-list="false"
            :on-success="handleCreateUpload">
            <img v-if="createForm.src" :src="createForm.src" class="upload-image">
            <i v-else class="el-icon-plus uploader-icon"></i>
            <div slot="tip" class="upload-tip">支持JPG/PNG，不超过2MB</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="createVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCreate" :loading="creating">创建商品</el-button>
      </span>
    </el-dialog>




    <!-- 商品列表 -->
    <el-row :gutter="20">
      <el-col v-for="(item, index) in goodsList" :key="index" :xs="24" :sm="12" :md="8" :lg="6">
        <el-card class="goods-card">
          <img :src="item.src" class="goods-image" @click="openEdit(item)">
          <div class="goods-info">
            <h3>{{ item.name }}</h3>
            <p class="price">￥{{ item.price }}</p>

            <!-- 在操作区域添加删除按钮 -->
            <div class="actions">
              
              <el-switch v-model="item.islist" active-text="上架" inactive-text="下架"
              @change="handleStatusChange(item)"></el-switch>

            </div>
            <div class="actions">
            <el-button type="primary" size="mini" @click="openEdit(item)">编辑</el-button>
              <el-button type="dangprimaryer" size="mini" class="delete-btn" @click="handleDelete(item)">删除</el-button>
             </div>

          </div>
        </el-card>
      </el-col>
    </el-row>


    <!-- 分页 -->
    <el-pagination layout="prev, pager, next" :current-page="pagination.page" :page-size="pagination.size"
      :total="pagination.total" @current-change="handlePageChange"></el-pagination>

    <!-- 编辑弹窗 -->
    <el-dialog title="商品编辑" :visible.sync="editVisible" width="40%">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input-number v-model="editForm.price" :min="0" :precision="2"></el-input-number>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload class="image-uploader" :action="this.$constant.baseURL + '/upload/goods'" :show-file-list="false"
            :on-success="handleUploadSuccess" :before-upload="beforeImageUpload">
            <img v-if="editForm.src" :src="editForm.src" class="upload-image">
            <i v-else class="el-icon-plus uploader-icon"></i>
            <div slot="tip" class="upload-tip">支持JPG/PNG，不超过2MB</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit" :loading="submitting">保存修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      pagination: {
        page: 1,
        size: 8,
        total: 0
      },
      editVisible: false,
      submitting: false,
      editForm: {
        id: null,
        name: '',
        price: 0,
        src: ''
      },

      createVisible: false,
    creating: false,
    createForm: {
      name: '',
      price: 0,
      src: ''
    }
    }
  },
  created() {
    this.loadGoods();
  },
  methods: {
    async loadGoods() {
      const res = await this.$http.get(this.$constant.baseURL + '/goods/seller', {

        usertoken: localStorage.getItem('usertoken'),
        page: this.pagination.page,
        size: this.pagination.size

      });

      if (res.data.code === 200) {
        // 添加类型转换
        this.goodsList = res.data.data.records.map(item => ({
          ...item,
          islist: Boolean(item.islist) // 核心修复点
        }));

        console.log("转换后的商品列表:", this.goodsList);
        this.pagination.total = res.data.data.total;
      }
    },

    openEdit(item) {
      this.editForm = { ...item };
      this.editVisible = true;
    },

    async submitEdit() {
      this.submitting = true;
      try {
        const dto = {
          ...this.editForm,
          usertoken: localStorage.getItem('usertoken')
        }
        await this.$http.post('/goods/update', dto);
        this.$message.success('修改成功');
        this.editVisible = false;
        this.loadGoods();
      } finally {
        this.submitting = false;
      }
    },

    handleUploadSuccess(res) {
      if (res.code === 200) {
        this.editForm.src = res.data;
        this.$message.success('图片上传成功');
      }
    },

    beforeImageUpload(file) {
      const isImage = ['image/jpeg', 'image/png'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('仅支持JPG/PNG格式');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2MB');
        return false;
      }
      return true;
    },

    handlePageChange(page) {
      this.pagination.page = page;
      this.loadGoods();
    },

    async handleStatusChange(item) {
      try {
        const actualStatus = item.islist ? 1 : 0; // 确保转换为数字

        const json = {
          id: item.id,
          status: actualStatus,
          usertoken: localStorage.getItem('usertoken')
        }

        await this.$http.post(this.$constant.baseURL + '/goods/status', json);

        // 强制视图更新
        this.$forceUpdate();
      } catch (error) {
        // 回滚状态
        item.islist = !item.islist;
        this.$message.error('状态更新失败');
      }
    },



      // 打开新增弹窗
  openCreateDialog() {
    this.createForm = { name: '', price: 0, src: '' };
    this.createVisible = true;
  },

  // 处理图片上传
  handleCreateUpload(res) {
    if (res.code === 200) {
      this.createForm.src = res.data;
      this.$message.success('图片上传成功');
    }
  },

  // 提交新增
  async submitCreate() {
    console.log("走了")
    this.creating = true;
    try {
      const json = {
        ...this.createForm,
        usertoken: localStorage.getItem('usertoken')
      };
      
      const res = await this.$http.post(this.$constant.baseURL +'/goods/create', json);
      
      if (res.data.code === 200) {
        this.$message.success('商品创建成功');
        this.createVisible = false;
        this.loadGoods(); // 刷新列表
      }
    } finally {
      this.creating = false;
    }
  },

  // 删除商品
  async handleDelete(item) {
    try {
      await this.$confirm('确认删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      
      const res = await this.$http.post('/goods/delete', {
        id: item.id,
        usertoken: localStorage.getItem('usertoken')
      });
      
      if (res.data.code === 200) {
        this.$message.success('删除成功');
        this.loadGoods(); // 刷新列表
      }
    } catch (error) {
      if (error !== 'cancel') {
        this.$message.error('删除失败');
      }
    }
  }
  }
}
</script>

<style>
.goods-card {
  margin-bottom: 20px;
  transition: box-shadow 0.3s;
}

.goods-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.goods-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}

.goods-info {
  padding: 15px;
}

.goods-info h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #303133;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  margin: 10px 0;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}

.upload-tip {
  color: #909399;
  font-size: 12px;
  margin-top: 10px;
}

.el-switch {
  height: 32px;
  display: inline-flex;
  align-items: center;
}

.el-switch__label {
  white-space: nowrap;
  margin-left: 10px;
  margin-right: 5px;
}

.el-switch__label.is-active {
  margin: 0 5px 0 10px;
}

/* 调整操作区域间距 */
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  /* 新增间距 */
  min-width: 240px;
  /* 保证最小宽度 */
}

.el-card__body {
  padding: 2px !important;
}


/* 修复卡片布局 */
.goods-card {
  margin-bottom: 20px;
  transition: box-shadow 0.3s;
  height: 100%;
  /* 新增高度设置 */
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.goods-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
  /* 防止图片压缩 */
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.actions {
  margin-top: auto;
  /* 使操作区域始终在底部 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  min-width: 0;
  /* 允许内容压缩 */
}

.switch-wrapper {
  flex: 1;
  min-width: 0;
  /* 允许文本截断 */
}

/* 调整开关样式 */
::v-deep .el-switch__label {
  font-size: 12px;
  white-space: nowrap;
  margin: 0 5px;
}

::v-deep .el-switch__label.is-active {
  margin: 0 5px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .goods-info h3 {
    font-size: 14px;
  }

  .price {
    font-size: 16px;
  }

  ::v-deep .el-switch__label {
    display: none;
    /* 小屏幕隐藏文字 */
  }
}


/* 操作栏样式 */
.operation-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 删除按钮样式 */
.delete-btn {
  margin-left: 10px;
  /* color: #f56c6c; */
  border-color: #f56c6c;
}

.delete-btn:hover {
  background: #fef0f0;
}

.el-input-number .el-input____inner {
  margin-top:0px!important;
}
</style>