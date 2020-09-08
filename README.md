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

## listContent (domain)
- **description**: Lists all the objects from the S3 bucket of the specified domain
- **params**: (domain)
  - **domain**: STRING: REQUIRED: the root domain of your site i.e. yoursite.com
- **returns**: promise(resolve, reject)
  - **resolve**: An array of objects that contain the properties for all of the objects in the given bucket.
  - **reject**: (error)


## downloadContent(domain, output, files, cli)
- **description**: downloads content from a given bucket to a local output_path specified. By default it will download all files and create/overwrite content in the current working directory. When given files parameter, it will only download the given files.
- **params**: (domain, output, files, cli)
  - **domain**: STRING: REQUIRED: the domain of your site i.e. yoursite.com you want to download files from
  - **output**: STRING: Desired output path to save the downloaded files. By default its the current working directory.
  - **files**: ARRAY: The file paths, or key name, that uniquely identifies the objects stored in the bucket.
  - **cli**: OBJECT: Recieves the cli object from oclif.
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done!')
  - **reject**: (error)

  ## uploadAllFiles (domain, files, dir, cli)
- **description**: upload all the files from the selected directory to the given domain's bucket
- **params**: (domain, files, dir, cli)
  - **domain**: STRING: REQUIRED: the domain of your site i.e. yoursite.com you want to upload all files to
  - **files**: ARRAY: The file paths, or key names, that uniquely identifies the objects stored in the bucket. 
  <!-- ???why specify files if it uploads all files?? -->
  - **dir**: STRING: REQUIRED: the directory path that contains the files you want to upload to the given domain's bucket
  - **cli**: OBJECT: Recieves the cli object from oclif.
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)

## uploadUpdatedFiles (domain, files, resetCache, cli)
- **description**: Uploads content to the bucket of the given domain. By default it will only update any files that have been modified after they were last uploaded. When the resetCache flag is provided it will also create a CloudFront invalidation for the uploaded files that already existed. If the overwrite flag is provided it will upload all of the files.
- **params**: (domain, files, resetCache, cli)
  - **domain**: STRING: REQUIRED: the domain of your site i.e. yoursite.com you want to upload updated files to
  - **files**: STRING: The file paths, or key names, that uniquely identifies the objects stored in the bucket.
  <!-- Why do you have to specify files if its uploading only modified content? -->
  - **resetCache**: STRING: Flag
  - **cli**: OBJECT: Recieves the cli object from oclif.
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)

## deleteContent(domain, files)
- **description**: Deletes content in a bucket belonging to a domain. If files are provided it will only delete those specific files. By default it deletes all of the files.
- **params**: (domain, files)
  - **domain**: STRING: REQUIRED: the root domain of your site i.e. yoursite.com
  - **files**: ARRAY: REQUIRED: The file paths, or key names, of the files you want to delete
- **returns**: promise(resolve, reject)
  - **resolve**: ('All done')
  - **reject**: (error)

## invalidateCache (domain, paths)
- **description**: re-caches the files in the CDN of the specified domain
- **params**: (domain, paths)
  - **domain**: STRING: REQUIRED: the root domain of the site i.e. yoursite.com
  - **paths**: STRING: REQUIRED: 
- **returns**: promise(resolve, reject)
  - **resolve**: ('all done!')
  - **reject**: (error)