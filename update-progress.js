const fs = require("fs");

const CHECK_LIST_MD_PATH = "./README.md";
const PROGRESS_BAR_URL = "https://geps.dev/progress";

const md = fs.readFileSync(CHECK_LIST_MD_PATH, { encoding: "utf-8" });
const checkList = md.split("\n").filter(isCheckBox);
const total = checkList.length;
const checked = checkList.filter(isChecked).length;
const progress = Math.round((checked / total) * 100);

const updated = md
  .split("\n")
  .map((line) => {
    if (isProgressLine(line)) {
      return `달성도: ![](${PROGRESS_BAR_URL}/${progress})`;
    }
    return line;
  })
  .join("\n");

fs.writeFileSync(CHECK_LIST_MD_PATH, updated);

function isProgressLine(line) {
  return line.includes(PROGRESS_BAR_URL);
}

function isChecked(line) {
  return line.includes("[x]");
}

function isCheckBox(line) {
  const checkboxRgx = /^- \[(x|\s)\].*/g;
  return checkboxRgx.test(line);
}
