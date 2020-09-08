const list = require('./lib/storage/list')
const download = require('./lib/storage/download')
const remove = require('./lib/storage/delete')
const {uploadUpdatedFiles, uploadAllFiles} = require('./lib/storage/upload')
const invalidateCache = require('./lib/cache/invalidateCache')

module.exports.listContent = list.aws
module.exports.downloadContent = download.aws
module.exports.deleteContent = remove.aws
module.exports.uploadUpdatedContent = uploadUpdatedFiles
module.exports.uploadAllContent = uploadAllFiles
module.exports.invalidateCache = invalidateCache
