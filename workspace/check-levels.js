const fs = require("fs");
const s = fs.readFileSync("/home/z/my-project/pixel-sokoban/index.html", "utf8");
const start = s.indexOf("const LEVELS = [");
const end = s.indexOf("\n  ];", start);
const block = s.slice(start, end);
const lines = block.split("\n");
let levels = [];
let cur = null;
for (const ln of lines) {
  const isComment = /^\s*\/\//.test(ln);
  if (isComment) {
    if (cur) { levels.push(cur); cur = null; }
    cur = [];
    continue;
  }
  const re = /"((?:[^"\\]|\\.)*)"/g;
  let mm;
  while ((mm = re.exec(ln)) !== null) {
    if (cur) cur.push(mm[1]);
  }
}
if (cur) levels.push(cur);

console.log("levels:", levels.length);
let ok = true;
levels.forEach((lv, i) => {
  const lens = lv.map(r => r.length);
  const max = Math.max(...lens), min = Math.min(...lens);
  const c = {};
  for (const ch of lv.join("")) c[ch] = (c[ch] || 0) + 1;
  const rect = min === max ? "RECT" : "RAGGED!";
  console.log(`L${i + 1}: rows=${lv.length} cols=${min === max ? min : min + ".." + max} ${rect} | walls=${c["#"] || 0} targets=${c["."] || 0} boxes=${c["$"] || 0} players=${c["@"] || 0}`);
  if (rect !== "RECT") ok = false;
  if ((c["@"] || 0) !== 1) { ok = false; console.log("  !! players != 1"); }
  if (c["$"] !== c["."]) { ok = false; console.log("  !! boxes != targets"); }
});
console.log(ok ? "ALL OK" : "HAS PROBLEMS");
