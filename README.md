# Jekyll WRLD3d website AWS Lamda - Medium API integration

This lambda is used to create posts on [Medium](https://medium.com) through its API.
A lambda is used because Medium doesn't allow cross site scripting, and Jekyll doesn't
have a backend server from which it can make the call.

## Prerequisits

1. [NodeJS](https://uk.godaddy.com/help/install-nodejs-ubuntu-17395) Install LTS version 6 (using PPA)
1. [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
1. [Serverless](https://serverless.com/)

## Testing locally

This will test your lambda locally, it will not deploy to AWS.
The command `sls` may be used inplace of writting `serverless`.
```
$> sls invoke local -f createPost 
```
With debugging
```
$> SLS_DEBUG=* sls invoke local -f createPost
```

## Deploying to AWS Lambda
```
$> sls deploy
```
