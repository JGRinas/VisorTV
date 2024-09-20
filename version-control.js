const fs = require("fs");

// Obtener la versión actual del package.json
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = packageJson.version;

// Separar la versión en major, minor y patch
let [major, minor, patch] = version.split(".").map(Number);

// Mostrar la versión actual
console.log(`Versión actual: ${version}`);

// Argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Error: Se requiere un argumento");
  console.log("Uso: node versioning.js --major | --minor | --patch");
  process.exit(1);
}

// Verificar qué tipo de versión se incrementa
switch (args[0]) {
  case "--major":
    major += 1;
    minor = 0;
    patch = 0;
    break;
  case "--minor":
    minor += 1;
    patch = 0;
    break;
  case "--patch":
    patch += 1;
    break;
  default:
    console.error("Error: Opción inválida");
    console.log("Uso: node versioning.js --major | --minor | --patch");
    process.exit(1);
}

// Nueva versión
const newVersion = `${major}.${minor}.${patch}`;

// Actualizar la versión en package.json
packageJson.version = newVersion;
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2), "utf8");

// Mostrar la nueva versión
console.log(`Versión actualizada: ${newVersion}`);
