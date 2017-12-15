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

Complete example (replace env vars with correct values)
```
$> medium_client_id=1 medium_client_secret=2 medium_access_token=3 sls invoke local -f createPost --data '{"title": "hello", "body": "world"}'
```


## Deploying to AWS Lambda
```
$> sls deploy
```

## Environment variables

Enviroment variables are defined on the lambda entry on AWS. When running locally you must specify them
on the command line.

The environment variables used by this lambda are from [Medium](https://medium.com/me/applications), found under `Jekyll React Integration Test`

The following environment variables must be set when running this lambda locally too:
1. medium_client_id
1. medium_client_secret
1. medium_client_access_token

