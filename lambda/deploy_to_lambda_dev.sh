#!/bin/sh
rm *.zip
zip -r upload_dev.zip *
aws s3 cp ./upload_dev.zip s3://$EMOJIC_LAMBDA_BUCKET
aws lambda update-function-code --function-name $EMOJIC_LAMBDA_NAME_DEV --s3-bucket $EMOJIC_LAMBDA_BUCKET --s3-key upload_dev.zip
