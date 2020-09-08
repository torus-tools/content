# Torus Tools - Content

A promise-based javascript SDK that facilitates operations related to content stored in s3 as well as cache invalidations in AWS cloudfront.

## Supported Operations
- list
- download
- upload
- delete

## Features
- Only upload updated files by default
- Automatically update cache in cloudfront for updated files that already exist
- provides a single method that deletes all of the content in a particular bucket
- Automatically creates non-exsiting directories for downloaded files 

## Currently Supporting
- AWS

**If you are interested in adding new providers create the feature request and we will add it to our pipeline; or feel free to submit your own PR** :sunglasses:

# API

## listContent (bucket)
- **description**: Lists all the objects in the specified S3 bucket.
- **params**: (bucket)
  - **bucket**: STRING: REQUIRED: the name of the bucket you want to list objects from
- **returns**: promise(resolve, reject)
  - **resolve**: An array of objects that contain the properties for all of the objects in the given bucket.
  - **reject**: (error)


## downloadContent(domain, output, files, cli)
- **description**: downloads content from a given bucket to a local output_path specified. By default it will download all files and create/overwrite content in the current working directory. when given files it will only download the given files.
- **params**: (bucket, keys)
  - **domain**: STRING: REQUIRED: Name of the bucket you want to download content from.
  - **output**: STRING: Desired output path to save the downloaded files. By default its the current working directory.
  - **files**: ARRAY: The file paths, or keys, that uniquely identifie objects stored in the bucket.
  - **cli**: OBJECT: Recieves the cli object from oclif.
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done!')
  - **reject**: (error)

  ## uploadAllContent (bucketName, filePath, dir)
- **description**: upload the files from the selected directory to the given S3 bucket
- **params**: (bucketName, filePath, dir)
  - **bucketName**: STRING: REQUIRED: the name of the bucket you want upload file to
  - **filePath**: STRING: REQUIRED: the content type of the selected file
  - **dir**: STRING: REQUIRED: the directory that contains the content you want to upload to the given bucket name
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)

## uploadUpdatedContent (domain, files, resetCache, cli)
- **description**: Uploads content to a bucket belonging to a given domain. by default it will only update any files that have been modified after they were last uploaded. When the resetCache flag is provided it will also create a CloudFront invalidation for the uploaded files that already existed. If the overwrite flag is provided it will upload all of the files.
- **params**: (bucketName, filePath, dir)
  - **bucketName**: STRING: REQUIRED: the name of the bucket you want upload file to
  - **filePath**: STRING: REQUIRED: the content type of the selected file
  - **dir**: STRING: REQUIRED: the directory that contains the content you want to upload to the given bucket name
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)

## deleteContent(domain, files)
- **description**: Deletes content in a bucket belonging to a domain. If files are provided it will only delete those specific files. By default it deletes all of the files.
- **params**: (domain, files)
  - **domain**: STRING: REQUIRED: the root domain of your site i.e. yoursite.com
  - **files**: ARRAY: REQUIRED: names of the files that are going to be deleted
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)

## invalidateCache
- **description**: re-caches the files in the CDN
- **params**: (paths, distributionId)
   - **paths**: STRING: REQUIRED: 
  - **distributionID**: STRING: REQUIRED: The ID name of the cloudfront distribuition you want to re-cache
- **returns**: promise(resolve, reject)
  - **resolve**: ('all done!')
  - **reject**: (error)