const {getFiles, uploadUpdatedFiles} = require('../lib/storage/upload')

getFiles().then(files => {
  uploadUpdatedFiles('localizehtml.com', files.files)
  .then(data=>console.log(data))
  .catch(err => console.log(err))
}).catch(err=> console.log(err))