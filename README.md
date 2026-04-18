# 小项目合集

这个仓库包含了使用 Web 技术栈和 Python 开发的多个有趣项目。

## 📋 To-Do List 待办事项

简单易用的待办事项管理应用。

### 功能特性
- 添加、删除待办事项
- 标记完成/未完成
- 本地存储，刷新后数据不丢失
- 统计总数量和完成数量
- 响应式设计

### 使用方法
打开 `To-Do-list/index.html` 即可使用。

---

## 🐍 Snake Game 贪吃蛇

经典的贪吃蛇游戏，带有多种食物和关卡系统。

### 功能特性
- 点击开始游戏按钮开始游戏，音乐同时播放
- 使用方向键控制蛇的移动
- 三种食物：
  - 🍪 小饼干：+1分
  - 🐭 小老鼠：+3分
  - 🐘 大象：+10分
- 食物每2-4秒随机出现
- 5个关卡，第一关30分，每关目标增加10分
- 每局限时60秒
- 过5关获得5星好评
- 背景音乐播放控制（点击小喇叭开关音乐）

### 游戏规则
1. 点击「开始游戏」按钮开始游戏，音乐同时播放
2. 吃食物获得分数
3. 不要撞墙或撞到自己
4. 倒计时结束后根据分数判断是否过关
5. 点击小喇叭按钮可以开关背景音乐（🔊 播放 / 🔇 暂停）

### 使用方法
打开 `Snake-game/index.html` 即可游玩。

---

## 🌐 Proxy Script 代理管理脚本

跨平台的 GitHub 代理管理脚本，自动搜索、测试和更新代理。

### 功能特性
- 🔍 自动从多个源获取代理列表
- ⚡ 多线程测试代理延迟
- 📊 筛选延迟最低的10个代理
- ⏰ 每小时自动更新代理池
- 📁 按日期/小时保存代理数据
- 🖥️ 支持 Windows/Linux/macOS
- 👆 用户确认是否更换代理

### 安装使用
```bash
cd proxy-script
pip install -r requirements.txt
python proxy_manager.py
```

### 详细说明
请查看 `proxy-script/README.md`

---

## 📁 项目结构

```
littleprogram/
├── skills/              # 项目总结
│   └── SKILL.md
├── To-Do-list/          # 待办事项应用
│   ├── index.html
│   ├── style.css
│   └── app.js
├── Snake-game/          # 贪吃蛇游戏
│   ├── index.html
│   ├── style.css
│   └── game.js
├── proxy-script/        # 代理管理脚本
│   ├── proxy_manager.py
│   ├── requirements.txt
│   └── README.md
└── README.md           # 本文件
```

## 🛠️ 技术栈

### Web 项目
- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage 本地存储
- Canvas 绘图

### Python 项目
- Python 3.7+
- requests 库
- 多线程
- socket 编程
