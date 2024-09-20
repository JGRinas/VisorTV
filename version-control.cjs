const fs = require("fs");

// Función para leer y actualizar el archivo package.json
function updateVersion(type) {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  const [major, minor, patch] = packageJson.version.split(".").map(Number);

  if (type === "major") {
    packageJson.version = `${major + 1}.0.0`;
  } else if (type === "minor") {
    packageJson.version = `${major}.${minor + 1}.0`;
  } else if (type === "patch") {
    packageJson.version = `${major}.${minor}.${patch + 1}`;
  }

  fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

  console.log(`Versión actualizada a ${packageJson.version}`);
}

// Procesar argumentos
const args = process.argv.slice(2);
if (args.includes("--major")) {
  updateVersion("major");
} else if (args.includes("--minor")) {
  updateVersion("minor");
} else if (args.includes("--patch")) {
  updateVersion("patch");
}
