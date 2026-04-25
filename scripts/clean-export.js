const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");

function deleteTxtFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      deleteTxtFiles(fullPath);
    } else if (entry.isFile()) {
      const fileName = entry.name.toLowerCase();
      if (fileName === "robots.txt") {
        continue;
      }

      if (path.extname(entry.name).toLowerCase() === ".txt") {
        fs.unlinkSync(fullPath);
      }
    }
  }
}

if (!fs.existsSync(outDir)) {
  process.exit(0);
}

deleteTxtFiles(outDir);
