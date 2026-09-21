<div align="center">

# 🎮 PIXEL SOKOBAN · 像素推箱子

> 一个纯网页、零依赖的像素风推箱子解谜小游戏 · *A zero-dependency pixel-art Sokoban puzzle.*

[![Game](https://img.shields.io/badge/Game-Pixel%20Art-orange)](https://vvvv788.github.io/Course-homework1-workspace/)
[![Genre](https://img.shields.io/badge/Genre-Puzzle-blue)](https://vvvv788.github.io/Course-homework1-workspace/)
[![Levels](https://img.shields.io/badge/Levels-16-purple)](https://vvvv788.github.io/Course-homework1-workspace/pixel-sokoban/)
[![Stars](https://img.shields.io/badge/Rating-3%20Stars-gold)](https://vvvv788.github.io/Course-homework1-workspace/pixel-sokoban/)
[![Engine](https://img.shields.io/badge/Engine-HTML5%20Canvas-green)](https://vvvv788.github.io/Course-homework1-workspace/)

**把每一个箱子推到目标格即可过关** —— 16 关难度递进、四种游戏道具、基于步数的星级评价。

</div>

---

## 📑 目录 · Contents

- [🕹️ 在线试玩 Play](#-在线试玩-play)
- [🎯 玩法 How to Play](#-玩法-how-to-play)
- [✨ 功能特性 Features](#-功能特性-features)
- [🧩 游戏道具 Items](#-游戏道具-items)
- [🗺️ 关卡设计 Levels](#-关卡设计-levels)
- [🛠️ 项目结构 Structure](#-项目结构-structure)
- [🤖 求解器与校验 Solver](#-求解器与校验-solver)
- [👩‍💻 开发者 Developer](#-开发者-developer)

---

## 🕹️ 在线试玩 Play

| 入口 | 链接 |
| --- | --- |
| 🎯 游戏本体 | <https://vvvv788.github.io/Course-homework1-workspace/pixel-sokoban/> |
| 🏠 项目落地页 | <https://vvvv788.github.io/Course-homework1-workspace/> |

> 💡 本地游玩：直接双击打开 `index.html`（落地页）或 `pixel-sokoban/index.html`（游戏）即可，**无需任何构建步骤**。

---

## 🎯 玩法 How to Play

用方向键或 `WASD` 控制角色在地图中走动，走向箱子即可推动它。让**所有箱子归位**即过关。

| 按键 Key | 功能 Action |
| --- | --- |
| `↑ ↓ ← →` / `W A S D` | 移动 / 推箱 Move / Push |
| `R` | 重开本关 Restart level |
| `U` | 撤销一步 Undo |
| `Y` | 重做 Redo |
| `P` | 回放解法演示 Replay solution |

---

## ✨ 功能特性 Features

- 🧩 **16 关难度递进**：前 8 关经典推箱教学，后 8 关逐步引入道具与综合挑战。
- 🔧 **四种游戏道具**：传送带、开关+门、彩色箱+同色目标、传送门（详见下节）。
- ⭐ **星级评价**：依据 PAR 最优步数评定 —— 达标 ★★★、1.5 倍 ★★、通关即 ★。
- ↩️ **撤销 / 重做 / 回放**：`U` 撤销、`Y` 重做、`P` 回放、`R` 重开，轻松试错不卡关。

---

## 🧩 游戏道具 Items

| 道具 Item | 符号 Glyph | 说明 Description |
| --- | --- | --- |
| ➤ 传送带 Conveyor | `^ v < >` | 箱子被推上去后沿箭头方向自动滑动。 |
| 🔘 开关 + 门 Switch + Door | `S` / `D` | 踩下开关，对应编号的门永久开启。 |
| 🎨 彩色箱 + 同色目标 Colored Crate | `123` / `abc` | 红 / 蓝 / 绿箱子须各自推到同色目标格。 |
| 🌀 传送门 Portal | `P` | 成对出现，玩家或箱子进入其一，从配对另一个出来。 |

---

## 🗺️ 关卡设计 Levels

| 关卡 Level | 内容 Content |
| --- | --- |
| **L1 – L8** | 纯推箱子，难度渐进 Classic puzzles, increasing difficulty |
| **L9** | 传送带 Conveyor |
| **L10** | 开关 + 门 Switch + Door |
| **L11** | 彩色箱 + 同色目标 Colored Crate + Target |
| **L12** | 传送门 Portal |
| **L13** | 传送带 + 开关 Conveyor + Switch |
| **L14** | 彩色 + 传送门 Colored + Portal |
| **L15** | 传送门 + 开关 Portal + Switch |
| **L16** | 传送带 + 彩色 + 开关（三合一终章）Finale |

---

## 🛠️ 项目结构 Structure

```
├── index.html              # 项目落地页（功能介绍 + 跳转链接，夜色霓虹像素风）
├── pixel-sokoban/
│   └── index.html          # 游戏本体（单文件 HTML5 Canvas，零依赖）
├── solve-levels.js         # BFS 推箱求解器，校验每关可解并估算 PAR
├── check-levels.js         # 关卡合法性校验脚本
└── src/                    # Next.js + shadcn/ui 脚手架样板（与游戏本体无关）
```

> ℹ️ `src/`、`package.json`、`next.config.ts` 等为 Z.ai 生成的 Next.js 脚手架样板；本项目游戏部分仅依赖 `pixel-sokoban/index.html` 与根目录 `index.html`，**无需安装任何依赖即可游玩**。

---

## 🤖 求解器与校验 Solver

关卡的可解性与星级基准步数（PAR）由 `solve-levels.js` 中的 BFS 求解器校验生成，确保 16 关均可在合理步数内通关。

```bash
node solve-levels.js     # 运行 BFS 求解器，输出每关最优推箱步数
node check-levels.js     # 校验关卡配置合法性
```

---

## 👩‍💻 开发者 Developer

**Vivi Lin Ziwei（林子微）· 2026214159**

<p align="center">
人工智能课程作业 · 纯网页像素解谜 · HTML5 Canvas<br>
AI Course Project · Pixel Puzzle · HTML5 Canvas
</p>
