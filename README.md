# nonnight-tool 非夜工具箱 - Monorepo 工程说明

## 一、Monorepo 架构核心

### 1. 技术栈概览
- **包管理**: `pnpm@8.x` + Workspace
- **构建工具**: `Vite@5.x`
- **前端框架**: `Vue3` + `TypeScript@5.x``
- **代码规范**: `ESLint` + `Prettier`

### 2. 核心指令速查

| 作用域       | 指令                          | 功能说明                     |
|-----------|------------------------------|----------------------------|
| **根目录**   | `pnpm install`               | 安装全工程依赖               |
|           | `pnpm run lint`              | 全工程代码规范检查           |
| **Common** | `pnpm --filter @nonNightTool/common dev:`   | 启动通用组件开发模式         |
|           | `pnpm --filter @nonNightTool/common build` | 构建通用组件库               |
| **MonitorAlert** | `pnpm --filter @nonNightTool/mountainsAndSeasMap dev` | 启动业务工程开发服务器     |
|           | `pnpm --filter @nonNightTool/mountainsAndSeasMap build` | 生产环境构建           |

### 3. 核心工具链
```bash
.
├── configs/
│   ├── vite.preset.ts    # 共享 Vite 配置
│   └── tsconfig.base.json # 基础 TypeScript 配置
├── scripts/
│   └── extract-common.js # 工程迁移脚本(未完成)
```
## 二、工程结构详解
### 1. 整体结构
```bash
geo-hazard/
├── packages/
│   ├── common/              # 通用组件库
│   │   ├── src/
│   │   │   ├── components/  # 通用组件
│   │   │   ├── styles/      # 公共样式
│   │   │   ├── examples/    # 使用示例
│   │   │   ├── types/       # 类型定义
│   │   │   ├── index.ts       # 入口文件
│   │   │   └── utils/       # 工具函数
│   │   └── vite.config.ts   # 组件库专属配置
│   │
│   └── mountainsAndSeasMap/          # 气象预警业务工程
│       ├── src/
│       │   ├── assets/      # 静态资源
│       │   ├── components/  # 组件
│       │   ├── router/      # 路由配置
│       │   ├── stores/      # 状态管理
│       │   └── views/       # 页面组件
│       └── vite.config.ts   # 业务工程配置
│
├── configs/                 # 跨工程共享配置
├── scripts/                 # 工具脚本
├── .gitignore               # Git 忽略规则
├── .prettierrc.json         # Prettier 配置
├── .eslintrc.json           # ESLint 配置
├── .npmrc                   # PNPM 配置
├── turbo.json               # turbo 配置
└── pnpm-workspace.yaml      # 工作区定义
```
### 2. 关键文件说明
|文件路径	                |核心作用|
|-------------------------|--------|
|pnpm-workspace.yaml	    |定义 Monorepo 工作区范围|
|configs/vite.preset.ts	    |共享 Vite 构建配置（别名/代理等）|
|common/package.json	     | 定义组件库入口及依赖|
## 三、开发工作流
### 1. 全量初始化
```bash
# 安装所有依赖（包括子工程）
pnpm install

# 全工程代码规范检查
pnpm run lint
```
### 2. 通用组件开发
```bash
# 进入组件库开发模式（热更新）
pnpm --filter @nonNightTool/common dev

# 生成组件库产物
pnpm --filter @nonNightTool/common build
```
### 3. 业务工程开发```
```bash
# 启动开发服务器
pnpm --filter @nonNightTool/mountainsAndSeasMap dev

# 生产构建（输出到 dist/）
pnpm --filter @nonNightTool/mountainsAndSeasMap build

# 启动预览服务器
pnpm --filter @nonNightTool/mountainsAndSeasMap preview
```

## 四、开发规范
### 1. 代码提交规范
```bash
# Commit 消息格式
<type>(<scope>): <subject>

# 示例
feat(alert): 新增暴雨预警组件
fix(common): 修复按钮点击区域问题
```
### 2. 依赖管理规范

|依赖类型     |	安装命令	|说明|
|------------|-----------|---------|
|全工程公共依赖|	pnpm add -wD <package>	|安装在根目录|
|子工程私有依赖|	pnpm --filter <proj> add <package>	|仅限指定工程使用|
