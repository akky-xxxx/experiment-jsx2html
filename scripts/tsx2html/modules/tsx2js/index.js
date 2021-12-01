const { transformSync } = require("@babel/core");
const { readFileSync, mkdirsSync, writeFileSync } = require("fs-extra");

const TranspileOption = {
  plugins: [["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]],
  presets: ["@babel/preset-env"]
}

exports.tsx2js = (tsxFilePath, src, temporary) => {
  const { code } = transformSync(readFileSync(tsxFilePath).toString(), TranspileOption)
  const temporaryDirectory = tsxFilePath
    .slice(0, tsxFilePath.lastIndexOf("/"))
    .replace(`./${src}/`, `./${temporary}/`)
  mkdirsSync(temporaryDirectory)
  writeFileSync(`${temporaryDirectory}/index.js`, code)
  return temporaryDirectory
}
