//re-catches the file in the CDN

function aws(paths){
  return new Promise((resolve, reject)=>{
    var params = {
      DistributionId: 'STRING_VALUE', /* required */
      InvalidationBatch: { /* required */
        CallerReference: 'STRING_VALUE', /* required */
        Paths: { /* required */
          Quantity: paths.length,
          Items: paths
        }
      }
    };
    cloudfront.createInvalidation(params).Promise()
    .then(data=>resolve(data))
    .catch(err=>console.log(err))
  })
}

module.exports = {
  aws
}