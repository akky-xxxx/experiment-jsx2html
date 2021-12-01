const { join } = require("path");
const { mkdirsSync, writeFileSync } = require("fs-extra");
const { renderToStaticMarkup } = require("react-dom/server");

exports.js2html = (temporaryDirectory, temporary, dist) => {
  const components = require(join("../../../../", `${temporaryDirectory}/index.js`))
  Object.entries(components).forEach(([componentName, Component]) => {
    const distDirectory = temporaryDirectory.replace(`./${temporary}/`, `./${dist}/`)
    mkdirsSync(distDirectory)
    writeFileSync(`${distDirectory}/${componentName}.html`, renderToStaticMarkup(Component()))
  })
}
