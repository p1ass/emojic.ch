#!/bin/sh
rm *.zip
zip -r upload.zip *
aws s3 cp ./upload.zip s3://$EMOJIC_LAMBDA_BUCKET
aws lambda update-function-code --function-name $EMOJIC_APIGATEWAY_NAME --s3-bucket $EMOJIC_LAMBDA_BUCKET --s3-key upload.zip
