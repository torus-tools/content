const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const fs = require('fs')
const path = require('path');
const invalidateCache = require('../cache/invalidateCache')

var gitignore = fs.readFileSync('.torusignore', 'utf8')
var ignorePaths = {}
for(let path of gitignore.split('\n')) if(path.trim().length > 1) ignorePaths[path.trim()] = true

function scanFiles(dir){
  let arrs = [];
  return new Promise(async (resolve, reject) => {
    scanDir(dir, (filePath, stat) => arrs.push(filePath))
    resolve(arrs)
  })
}

function scanDir(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach((name)=>{
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if(!ignorePaths[filePath]) {
      if (stat.isFile()) callback(filePath, stat);
      else if (stat.isDirectory()) scanDir(filePath, callback)
    }
  });
}

function createFile(filePath, contents){
  return new Promise((resolve, reject) => {
    if(fs.existsSync(filePath)) fs.promises.readFile(filePath, 'utf8').then(data => resolve(data)).catch(err => reject(err))
    else {
      fs.promises.writeFile(filePath, contents)
      .then(() => resolve(contents))
      .catch(err => reject(err))
    }
  })
}

function upload(bucketName, filePath, dir) {
  return new Promise((resolve, reject) => {
    let ext = filePath.substring(filePath.lastIndexOf('.') + 1);
    let content_type = '';
    let keyPath = filePath;
    if(dir) keyPath = keyPath.substr(keyPath.indexOf(dir+'/'), keyPath.length)
    if(ext =='svg') content_type = 'image/svg+xml'
    else if(ext =='jpg' || ext =='jpeg') content_type = 'image/jpeg'
    else if(ext =='png') content_type = 'image/png'
    else if(ext =='html') content_type = 'text/html'
    else if(ext =='css') content_type = 'text/css'
    else if(ext =='js') content_type = 'application/javascript'
    else if(ext =='txt') content_type = 'text/plain'
    else if(ext =='xml') content_type = 'text/xml'
    else if(ext =='mp4') content_type = 'video/mp4' 
    let params = {
      Bucket: bucketName, 
      Key: keyPath, 
      Body: fs.readFileSync(filePath), 
      ContentType: content_type
    };
    s3.putObject(params).promise().then(()=>resolve(keyPath))
    .catch(err => reject(err))
    //if(cdn)reset cloudfront cache
  })
}

function getFiles(path){
  return new Promise((resolve, reject) => {
    let dir = null
    if(path){
      if(typeof path === 'string'){
        if(path === '*' || path === '/') scanFiles('./').then((files)=>resolve({files:files, dir:dir})).catch(err=>reject(err))
        else {
          var stat = fs.statSync(path);
          if(stat.isFile()) resolve({files:[path], dir:dir})
          else if(stat.isDirectory()) {
            dir = path
            scanFiles(path).then((files)=>resolve({files:files, dir:dir}))
            .catch(err=>reject(err))
          }
          else reject('path doesnt exist')
        }
      }
      else reject('path is not a string')
    }
    else scanFiles('./').then((files)=>resolve({files:files, dir:dir}))
    .catch(err=>reject(err))
  })
}

function uploadAllFiles(domain, files, dir, cli){
  return new Promise((resolve, reject) => {
    if(cli){
      const customBar = cli.progress({
        format: 'PROGRESS | {bar} | {value}/{total} Files',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
      })
      customBar.start(files.length, 0, {
        speed: "N/A"
      });
    }
    else console.log('Uploading files . . .')
    for(let f=0; f<files.length; f++){
      upload(domain, files[f], dir)
      .then((filepath)=> {
        if(cli) customBar.increment()
        else console.log('uploaded '+ filepath)
        if(f >= files.length-1) {
          if(cli) customBar.stop()
          resolve('all done!')
        }
      }).catch(err => reject(err))
    }
  })
}

function uploadUpdatedFiles(domain, files, cli){
  return new Promise((resolve, reject) => {
    let config_file = {}
    for(let path of files) config_file[path] = {updated:fs.statSync(path).mtimeMs, uploaded:null}
    if(cli){
      const customBar = cli.progress({
        format: 'PROGRESS | {bar} | {value}/{total} Files',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
      })
      customBar.start(files.length, 0, {
        speed: "N/A"
      });
    }
    else console.log('Uploading files . . .')
    console.log(config_file)
    createFile('./torus/uploads.json', JSON.stringify(config_file)).then(file => {
      let config = JSON.parse(file)
      let size = 0
      //for(let conf in config) if(!config_file[conf]) delete the file in the bucket
      for(let c in config_file) {
        if(!config[c]) config[c] = config_file[c] 
        else if(config_file[c].updated > config[c].uploaded) {
          console.log('FILEPATH ', c)
          upload(domain, c).then((filepath)=>{
            if(config[c].uploaded) {
              invalidateCache.aws(c).then(()=> {
                if(cli) customBar.increment()
                else console.log('uploaded '+ filepath)
                size += 1
                config[c].uploaded = new Date().getTime()
                if(size > config.keys().length -1) {
                  fs.writeFileSync('./torus/uploads.json', JSON.stringify(config), 'utf8')
                  resolve('All Done!')
                }
              }).catch(err=>reject(err))
            }
            else {
              if(cli) customBar.increment()
              else console.log('uploaded '+ filepath)
              size += 1
              config[c].uploaded = new Date().getTime()
              if(size > Object.keys(config).length -1) {
                fs.writeFileSync('./torus/uploads.json', JSON.stringify(config), 'utf8')
                resolve('All Done!')
              }
            }
          }).catch(err=>reject(err))
        }
        else size +=1
      }
    }).catch(err => reject(err))
  })
}

module.exports = {
  getFiles,
  uploadAllFiles,
  uploadUpdatedFiles
}