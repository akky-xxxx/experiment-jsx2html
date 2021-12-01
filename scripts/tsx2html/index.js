const { removeSync } = require("fs-extra")
const { hasTargetDirOption } = require("./modules/hasTargetDirOption")
const { getTsxPaths } = require("./modules/getTsxPaths")
const { isTsxFile } = require("./modules/isTsxFile")
const { tsx2js } = require("./modules/tsx2js")
const { js2html } = require("./modules/js2html")

const targetArg = process.argv.find(hasTargetDirOption)
if (!targetArg) {
  throw new Error("-D オプションで対象とする親ディレクトリを指定してください")
}
const [, targetSrcDirectory] = targetArg.split("=")

const Directories = {
  Src: "src",
  Temporary: ".temporary",
  Dist: "dist",
};

removeSync(`./${Directories.Dist}`)

const tsxFilePaths = getTsxPaths(targetSrcDirectory).filter(isTsxFile)
tsxFilePaths.forEach((tsxFilePath) => {
  const temporaryDirectory = tsx2js(tsxFilePath, Directories.Src, Directories.Temporary)
  js2html(temporaryDirectory, Directories.Temporary, Directories.Dist)
})

removeSync(`./${Directories.Temporary}`)
