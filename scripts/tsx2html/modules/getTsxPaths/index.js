const { readdirSync } = require("fs")

const getTsxPaths = exports.getTsxPaths = (directoryName) =>
  readdirSync(directoryName, { withFileTypes: true }).flatMap((dirent) =>
    dirent.isFile()
      ? [`${directoryName}/${dirent.name}`]
      : getTsxPaths(`${directoryName}/${dirent.name}`),
  )
