#!/bin/sh
aws s3 sync ./dist s3://$EMOJIC_BUCKET/ --delete
aws cloudfront create-invalidation --distribution-id $EMOJIC_DISTRIBUTION --paths '/*'
