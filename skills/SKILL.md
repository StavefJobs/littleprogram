# Littleprogram 小项目合集

## 技能描述
这是一个包含两个 Web 小项目的合集，提供待办事项管理和贪吃蛇游戏功能。

## 核心功能
- To-Do List：完整的待办事项管理应用
- Snake Game：经典贪吃蛇游戏，带关卡和音乐控制

## 项目结构
```
littleprogram/
├── skills/
│   └── SKILL.md          # 本文件
├── To-Do-list/           # 待办事项应用
│   ├── index.html
│   ├── style.css
│   └── app.js
├── Snake-game/           # 贪吃蛇游戏
│   ├── index.html
│   ├── style.css
│   └── game.js
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

## 技术栈
- HTML5 - 页面结构
- CSS3 - 样式与动画
- JavaScript (ES6+) - 逻辑控制
- Canvas - 游戏渲染
- LocalStorage - 本地存储

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

## 安全说明
- 纯前端项目，无后端
- 无网络请求（除音乐CDN）
- 无环境变量或配置文件
- 仅使用浏览器API

## 注意事项
- 音乐需要网络加载
- LocalStorage存储在浏览器中
- 游戏数据不会跨设备同步
