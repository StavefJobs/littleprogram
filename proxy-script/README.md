# GitHub 代理管理脚本

跨平台的GitHub代理管理脚本，自动搜索、测试和更新代理。

## 功能特性

- 🔍 自动从多个源获取代理列表
- ⚡ 多线程测试代理延迟
- 📊 筛选延迟最低的10个代理
- ⏰ 每小时自动更新代理池
- 📁 按日期/小时保存代理数据
- 🖥️ 支持Windows/Linux/macOS
- 👆 用户确认是否更换代理

## 安装

```bash
cd proxy-script
pip install -r requirements.txt
```

## 使用方法

```bash
python proxy_manager.py
```

## 工作流程

1. 从GitHub代理列表源获取代理
2. 多线程测试每个代理的延迟
3. 筛选延迟最低的10个代理
4. 保存到 `YYYY-MM-DD/YYYY-MM-DD_HH.json`
5. 询问用户是否使用该代理
6. 等待1小时后自动更新

## 目录结构

```
proxy-script/
├── proxy_manager.py    # 主脚本
├── requirements.txt    # 依赖文件
├── README.md          # 说明文档
└── 2026-04-18/       # 按日期命名的文件夹
    ├── 2026-04-18_13.json  # 代理数据文件
    └── ...
```

## 代理源

- TheSpeedX/PROXY-List
- monosans/proxy-list
- ShiftyTR/Proxy-List

## 系统代理设置

- **Windows**: 自动设置系统代理
- **Linux**: 显示环境变量命令
- **macOS**: 提示手动设置

## 注意事项

- 脚本每小时自动更新
- 用户可选择是否更换代理
- 代理数据按日期和小时保存
- 需要网络连接获取代理列表
