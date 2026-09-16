// Standard Sokoban solver with player-reach normalization (far fewer states).
const fs = require("fs");
const src = fs.readFileSync("/home/z/my-project/pixel-sokoban/index.html", "utf8");
const a = src.indexOf("const LEVELS = [");
const b = src.indexOf("\n  ];", a);
const slice = src.slice(a, b + "\n  ];".length - 1);
const LEVELS = eval(slice.replace("const LEVELS =", "(") + ")");

function parseLevel(rows) {
  const maxLen = Math.max(...rows.map(r => r.length));
  const grid = []; const boxes = []; let player = null;
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r]; const g = [];
    for (let c = 0; c < maxLen; c++) {
      const ch = c < row.length ? row[c] : "#";
      if (ch === "#") g.push("#");
      else if (ch === ".") g.push(".");
      else if (ch === "@" || ch === "+") { g.push(ch === "+" ? "." : " "); player = { r, c }; }
      else if (ch === "$" || ch === "*") { g.push(ch === "*" ? "." : " "); boxes.push({ r, c }); }
      else g.push(" ");
    }
    grid.push(g);
  }
  return { rows: grid, boxes, player };
}
const inBounds = (s, r, c) => r >= 0 && c >= 0 && r < s.rows.length && c < s.rows[r].length;
const isWall = (s, r, c) => !inBounds(s, r, c) || s.rows[r][c] === "#";
const isTarget = (s, r, c) => inBounds(s, r, c) && s.rows[r][c] === ".";
const cellKey = (r, c) => r + "," + c;

// flood fill reachable floor cells from (pr,pc) not crossing walls/boxes
function reachable(s, pr, pc, boxSet) {
  const seen = new Set([cellKey(pr, pc)]);
  const stack = [[pr, pc]];
  while (stack.length) {
    const [r, c] = stack.pop();
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = r + dr, nc = c + dc;
      if (isWall(s, nr, nc)) continue;
      if (boxSet.has(cellKey(nr, nc))) continue;
      const k = cellKey(nr, nc);
      if (seen.has(k)) continue;
      seen.add(k); stack.push([nr, nc]);
    }
  }
  return seen;
}
function won(s, boxSet) {
  for (let r = 0; r < s.rows.length; r++)
    for (let c = 0; c < s.rows[r].length; c++)
      if (s.rows[r][c] === "." && !boxSet.has(cellKey(r, c))) return false;
  return true;
}
function stateKey(boxSet, reach) {
  // canonical player cell = smallest reachable cell string
  let min = null;
  for (const k of reach) if (min === null || k < min) min = k;
  const boxList = [...boxSet].sort().join(";");
  return min + "|" + boxList;
}
function solve(rows, deadlineMs) {
  const s = parseLevel(rows);
  const boxArr0 = s.boxes.map(b => cellKey(b.r, b.c));
  const boxSet0 = new Set(boxArr0);
  const reach0 = reachable(s, s.player.r, s.player.c, boxSet0);
  const start = { boxes: boxSet0, reach: reach0, moves: 0 };
  const q = [start];
  const seen = new Set([stateKey(boxSet0, reach0)]);
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let head = 0;
  const t0 = Date.now();
  while (head < q.length) {
    if ((head & 1023) === 0 && Date.now() - t0 > deadlineMs) return "TIMEOUT";
    const cur = q[head++];
    if (won(s, cur.boxes)) return cur.moves;
    for (const boxKey of cur.boxes) {
      const [br, bc] = boxKey.split(",").map(Number);
      for (const [dr, dc] of dirs) {
        const fromR = br - dr, fromC = bc - dc; // player must stand here to push
        const toR = br + dr, toC = bc + dc;      // box lands here
        if (isWall(s, toR, toC)) continue;
        if (cur.boxes.has(cellKey(toR, toC))) continue;
        if (!cur.reach.has(cellKey(fromR, fromC))) continue; // player can't get behind box
        // new boxes
        const nb = new Set(cur.boxes);
        nb.delete(boxKey); nb.add(cellKey(toR, toC));
        // new player position = box's old cell (br,bc)
        const nreach = reachable(s, br, bc, nb);
        const k = stateKey(nb, nreach);
        if (seen.has(k)) continue;
        seen.add(k);
        q.push({ boxes: nb, reach: nreach, moves: cur.moves + 1 });
        if (q.length > 4_000_000) return "STATE-LIMIT";
      }
    }
  }
  return "UNSOLVABLE";
}
console.log("Solvability check (normalized BFS, 15s cap/level):");
let allOk = true;
LEVELS.forEach((lv, i) => {
  const t0 = Date.now();
  const res = solve(lv, 15000);
  const ms = Date.now() - t0;
  const ok = typeof res === "number" || res === "STATE-LIMIT";
  // STATE-LIMIT means search exhausted states without finding = unsolvable;
  // TIMEOUT means we ran out of time (inconclusive); number = proven solvable.
  let mark, status;
  if (typeof res === "number") { mark = "✅"; status = "SOLVABLE in " + res + " pushes"; allOk = allOk && true; }
  else if (res === "TIMEOUT") { mark = "⏳"; status = "inconclusive (time cap)"; allOk = false; }
  else if (res === "STATE-LIMIT") { mark = "⏳"; status = "inconclusive (queue cap)"; allOk = false; }
  else { mark = "❌"; status = "UNSOLVABLE"; allOk = false; }
  console.log(`  Level ${i + 1}: ${mark} ${status}  (${ms} ms)`);
});
console.log(allOk ? "ALL PROVEN SOLVABLE" : "SOME NOT PROVEN (see above)");
