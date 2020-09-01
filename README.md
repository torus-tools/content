# Torus Tools - Content

A promise-based javascript SDK that simultaneously updates content in S3 object storage and the cache in Cloudfront CDN.

## Currently Supporting
- AWS

**If you are interested in adding new providers create the feature request and we will add it to our pipeline; or feel free to submit your own PR** :sunglasses:



# API

## deleteStorage (domain, files)
- **description**: deletes the specified files in the S3 object storage of the given domain
- **params**: (domain, files)
  - **domain**: STRING: REQUIRED: the root domain of your site i.e. yoursite.com
  - **files**: ARRAY: REQUIRED: names of the files that are going to be deleted
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)


## downloadStorage (bucket, keys)
- **description**: download the specified content from the S3 bucket
- **params**: (bucket, keys)
  - **bucket**: STRING: REQUIRED: the bucket name you want to download content from
  - **keys**: ARRAY: REQUIRED: the key names which uniquely identifies the objects in the bucket
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done!')
  - **reject**: (error)


## downloadTorrentStorage () 
- **description**: downloads the content from the S3 bucket using torrents
- **params**: (bucket, key, RequestPayer)
  - **bucket**: STRING: REQUIRED: the S3 bucket name
  - **key**: STRING: REQUIRED: the key name which identifies the object in the bucket
  - **RequestPayer**: STRING: REQUIRED: set value as `requester`
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)


## listStorage (bucket)
- **description**: lists all the objects in the specified S3 bucket
- **params**: (bucket)
  - **bucket**: STRING: REQUIRED: the name of the bucket you want to list objects from
- **returns**: promise(resolve, reject)
  - **resolve**: Returns all (up to 1,000) of the objects in a bucket.
  - **reject**: (error)

  ## uploadStorage (bucketName, filePath, dir)
- **description**: upload the files from the selected directory to the given S3 bucket
- **params**: (bucketName, filePath, dir)
  - **bucketName**: STRING: REQUIRED: the name of the bucket you want upload file to
  - **filePath**: STRING: REQUIRED: the content type of the selected file
  - **dir**: STRING: REQUIRED: the directory that contains the content you want to upload to the given bucket name
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)

   ## uploaFiles (domain, files, dir)
- **description**: upload the files from the selected directory to the given domain bucket
- **params**: (domain, files, dir)
   - **domain**: STRING: REQUIRED: the root domain of your site i.e. yoursite.com
  - **files**: ARRAY: REQUIRED: names of the files that are going to be uploading
  - **dir**: STRING: REQUIRED: the directory that contains the content you want upload.
- **returns**: promise(resolve, reject)
  - **resolve**: ('all done!')
  - **reject**: (error)


## getZoneByDomain (domainName)
- **description**: List the cloudfront zone distribuition of the given domain name.
- **params**: (domainName)
   - **domainName**: STRING: REQUIRED: the root domain of your site i.e. yoursite.com
- **returns**: promise(resolve, reject)
  - **resolve**: ('all done!')
  - **reject**: (error)

## invalidateCache
- **description**: re-caches the files in the CDN
- **params**: (paths, distributionId)
   - **paths**: STRING: REQUIRED: 
   
  - **distributionID**: STRING: REQUIRED: The ID name of the cloudfront distribuition you want to re-cache
- **returns**: promise(resolve, reject)
  - **resolve**: ('all done!')
  - **reject**: (error)




