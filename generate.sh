#!/usr/bin/env bash
cd dist
aws s3 rm --recursive s3://vvv.dixionary.com/
aws s3 cp . s3://vvv.dixionary.com/ --recursive --acl public-read
