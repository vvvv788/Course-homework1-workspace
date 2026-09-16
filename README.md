# 📦 Pixel Sokoban

![Static](https://img.shields.io/badge/type-static%20site-brightgreen)
![No Backend](https://img.shields.io/badge/backend-none-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Levels](https://img.shields.io/badge/levels-8-orange)


---

## ✨ Features

- 🎨 **Hand-drawn pixel art** rendered entirely with Canvas (no image assets)
- 🧠 **8 hand-crafted levels** with progressive difficulty
  - straight pushes → corners → ordering → multi-box → wall routing → long routing
- ↩️ **Undo** every move (never get stuck)
- 🏆 **Best-move tracking** per level (saved in `localStorage`)
- 🔊 **8-bit sound effects** generated live with the Web Audio API (no audio files)
- 📱 **Fully responsive** — keyboard on desktop, swipe + on-screen D-pad on mobile
- ⚡ **Smooth tile animation** with `requestAnimationFrame`
- 🌗 Self-contained pixel UI with retro fonts (`Press Start 2P` + `ZCOOL KuaiLe`)

---

## 🕹️ How to Play

Push every wooden crate onto a glowing target dot. Crates can only be **pushed**, never pulled — plan ahead!

### Controls

| Action | Desktop | Mobile |
|---|---|---|
| Move | `↑ ↓ ← →` or `W A S D` | Swipe on the board / on-screen D-pad |
| Undo last move | `U` or `UNDO` button | `UNDO` button |
| Restart level | `R` or `RESET` button | `RESET` button |
| Back to menu | `Esc` or `MENU` button | `MENU` button |
| Toggle sound | `SND` button | `SND` button |
| Start / confirm | `Enter` or `Space` | Tap |

### Map Legend

| Symbol | Meaning |
|---|---|
| `#` | Wall |
| ` ` | Floor |
| `.` | Target point |
| `$` | Crate |
| `@` | Player |
| `*` | Crate on target |
| `+` | Player on target |

---


## 🚀 Run Locally

Because the game is 100% static, you have three options:

1. **Double-click** `index.html` → opens in your default browser.
2. **Drag & drop** `index.html` into a browser window.
3. **Serve it** (optional, for a more production-like setup):
   ```bash
   # Python
   python3 -m http.server 8000
   # then open http://localhost:8000

   # or Node
   npx serve
   ```

No `npm install`, no build command, no dependencies.

---

## 🛠️ Tech Stack

- **HTML5 Canvas** — all rendering
- **Vanilla JavaScript (ES6+)** — game logic, IIFE-scoped, no globals
- **CSS3** — pixel-art UI, responsive layout, `image-rendering: pixelated`
- **Web Audio API** — procedurally generated sound effects
- **`localStorage`** — best-move persistence

> Zero npm packages. Zero frameworks. Zero build tools.

---


## 🧩 Levels

| # | Name | Size | Crates | Mechanic |
|---|---|---|---|---|
| 1 | Twin Push | 10×9 | 2 | Straight pushes (intro) |
| 2 | The Corner | 9×9 | 1 | Routing around a bend |
| 3 | Triple Line | 10×9 | 3 | Ordering with adjacent crates |
| 4 | Four Corners | 11×11 | 4 | Multi-box on a big map |
| 5 | Behind the Wall | 11×11 | 2 | Push around an obstacle |
| 6 | Around the Pillars | 12×13 | 4 | Bidirectional wall routing |
| 7 | The Storage | 13×12 | 6 | Dense multi-box routing |
| 8 | Grand Finale | 13×14 | 6 | Long-distance routing |

Every level has been verified solvable.

---

## 🎨 Design Notes

- **Palette**: a warm dungeon set (tan floors, brown stone walls, orange accents) — no default blue/indigo.
- **Sprites**: the player is an 8×8 pixel sprite drawn cell-by-cell via `fillRect`.
- **Crates**: drawn programmatically with wood texture, X-straps, corner rivets; crates on targets turn green with a glow border.
- **Targets**: a pulsing diamond marker so they're easy to spot.

---

## 📝 License

Released under the **MIT License**. Feel free to fork, modify, and share.

---

## 🙌 Credits

- Fonts: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) & [ZCOOL KuaiLe](https://fonts.google.com/specimen/ZCOOL+KuaiLe) by Google Fonts
- Inspired by the classic [Sokoban](https://en.wikipedia.org/wiki/Sokoban) by Hiroyuki Imabayashi (1981)

---

<p align="center">Made with ❤️ and HTML Canvas. Push the crates!</p>
