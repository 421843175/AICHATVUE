# AI智能客服聊天机器人 - 前端

## 🌟 项目亮点

- **动态分词匹配**：基于预设词库实现智能分词，匹配度≥0.3时返回最优预设回复
- **虚拟形象交互**：实时情绪判定（通过语义分析生成表情） + 在线换装功能
- **无缝客服切换**：AI客服→人工客服自动转移，会话历史同步至训练数据池
- **安全性保障**：严格的身份校验、请求加密及XSS防护机制

## 🚀 功能特性

### 角色权限

| 角色   | 权限说明                                |
| ------ | --------------------------------------- |
| 顾客   | 评价服务、转AI/人工、查看默认问题集     |
| 商家   | 管理机器人问答/形象、查看评分、商品上架 |
| 管理员 | 账户管理、跨角色对话、数据监控          |

### 核心交互流程

1. **智能问答**  
   - 顾客进入时推送商家预设的「猜你想问」列表（支持换一批）
   - 输入问题→分词匹配→返回预设答案或历史相似问题聚合答案
2. **客服转移**  
   - 【非目标问题】→转AI自主应答（学习历史会话）
   - 【转人工】→建立专属通道（Redis绑定会话状态）
3. **虚拟形象**  
   - 情绪引擎：根据对话内容实时渲染表情（如高兴/困惑/积极）
   - 换装系统：商家可配置服饰库，顾客端动态加载

## 💻 技术栈

- 框架：Vue 3 + Vuex + Vue Router
- 通信：WebSocket + Axios
- UI库：Element Plus
- 辅助：Lodash（分词处理）、Three.js（3D形象渲染）

## 🛠️ 快速启动

```bash
# 安装依赖
npm install

# 生产构建
npm run dev
```
## 目录结构
src/
├─components/                # 核心功能组件
│  ├─Chat/                   # 智能客服模块
│  │  ├─Chat.vue            # 聊天主界面（含AI/人工切换）
│  │  ├─Evaluate.vue        # 服务评价组件（商家评分功能）
│  │  └─ViewModel.vue       # 虚拟形象展示（含情绪引擎）
│  │
│  ├─Setting/                # 系统设置模块
│  │  ├─Clothes.vue         # 虚拟形象换装系统
│  │  ├─GoodsManage.vue     # 商品管理（商家上下架功能）
│  │  └─SetAccount.vue      # 账户安全设置（二次验证等）
│  │
│  ├─Friends.vue            # 社交关系管理（顾客沟通历史）
│  ├─Search.vue             # 搜索

├─router/
│  └─index.js               # 路由守卫配置

├─store/                    # Vuex状态管理
│  ├─chat.module.js        # 会话状态（含Redis通道绑定）
│  ├─ai-training.module.js # 历史对话训练数据池
│  └─user.module.js         # 角色权限状态（JWT校验）

├─utils/                    # 工具库


└─App.vue                   # 主容器（含权限指令）

## 效果展示
![image](https://github.com/user-attachments/assets/fbaa3a1e-1205-410c-a3bd-4fb4ab925755)

### 卖家后台
![image](https://github.com/user-attachments/assets/9b57bb58-4fae-439c-9c6a-1b3d48d56b90)
![image](https://github.com/user-attachments/assets/759e64b4-c511-47c3-8fcd-8cd245e2188d)

![a7214ee25a59c323247c6ed19583ce8](https://github.com/user-attachments/assets/31936a36-2cdb-404a-a4dc-6da35a459bdc)
```

