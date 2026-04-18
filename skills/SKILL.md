# Littleprogram 小项目合集

## 技能描述

这是一个包含 Web 项目和 Python 工具的合集，提供待办事项管理、贪吃蛇游戏和 GitHub 代理管理功能。

## 核心功能

- **To-Do List**：完整的待办事项管理应用
- **Snake Game**：经典贪吃蛇游戏，带关卡和音乐控制
- **Proxy Script**：跨平台 GitHub 代理管理脚本

## 项目结构

```
littleprogram/
├── skills/              # 项目总结
│   └── SKILL.md          # 本文件
├── To-Do-list/           # 待办事项应用
│   ├── index.html
│   ├── style.css
│   └── app.js
├── Snake-game/           # 贪吃蛇游戏
│   ├── index.html
│   ├── style.css
│   └── game.js
├── proxy-script/         # 代理管理脚本
│   ├── proxy_manager.py
│   ├── requirements.txt
│   └── README.md
└── README.md             # 项目说明
```

## 使用方法

### To-Do List

1. 打开 `To-Do-list/index.html`
2. 在输入框中输入待办事项
3. 点击添加或按回车
4. 点击复选框标记完成
5. 点击删除按钮删除项目

### Snake Game

1. 打开 `Snake-game/index.html`
2. 点击「开始游戏」按钮
3. 使用方向键控制蛇的移动
4. 吃食物获得分数
5. 点击小喇叭开关音乐

### Proxy Script

1. 进入 `proxy-script` 目录
2. 安装依赖：`pip install -r requirements.txt`
3. 运行脚本：`python proxy_manager.py`
4. 选择是否使用代理
5. 脚本每小时自动更新

## 技术栈

### Web 项目

- HTML5 - 页面结构
- CSS3 - 样式与动画
- JavaScript (ES6+) - 逻辑控制
- Canvas - 游戏渲染
- LocalStorage - 本地存储

### Python 项目

- Python 3.7+
- requests 库
- 多线程
- socket 编程
- 跨平台支持

## 功能特性

### To-Do List

- ✅ 添加、删除待办事项
- ✅ 标记完成/未完成
- ✅ 本地持久化存储
- ✅ 实时统计功能
- ✅ 响应式布局

### Snake Game

- ✅ 点击开始游戏按钮
- ✅ 方向键控制移动
- ✅ 三种食物不同分值
- ✅ 5关卡递进难度
- ✅ 60秒倒计时
- ✅ 背景音乐控制
- ✅ 5星通关奖励

### Proxy Script

- ✅ 自动从多个源获取代理
- ✅ 多线程测试延迟
- ✅ 筛选延迟最低10个
- ✅ 每小时自动更新
- ✅ 按日期/小时保存
- ✅ 跨平台支持
- ✅ 用户确认更换

## 安全说明

### Web 项目

- 纯前端项目，无后端
- 无恶意网络请求（除音乐CDN）
- 仅使用浏览器API
- 无环境变量或配置文件

### Python 项目

- 仅访问公开代理列表
- 不读取敏感文件
- 用户可控制代理更换
- 开源代码可审计

## 注意事项

- 手动推送本地代码至远程代码仓库（非常重要）
- Web 项目音乐需要网络加载
- LocalStorage 存储在浏览器中
- 游戏数据不会跨设备同步
- 代理脚本需要网络连接
- 代理数据按日期和小时保存

