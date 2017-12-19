'use strict';

var medium = require('medium-sdk');

module.exports.createPost = (event, context, callback) => {
  console.log('Received event', JSON.stringify(event, null, 2));

  let data;
  if (typeof event.body === 'string') {
    data = JSON.parse(event.body);
  }
  else {
    data = event.body
  }

  if (data === undefined || data.title === undefined || data.body === undefined) {
    const response = {
      statusCode: 400,
      headers: {
          'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
      message: 'Bad or missing parameters provided',
      }),
    };
    return callback(null, response);
  }

  const envVars = process.env;
  if (envVars.medium_client_id === undefined || envVars.medium_client_secret === undefined || envVars.medium_access_token === undefined) {
    const response = {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Enivronment variables not set, contact support',
      }),
    };
    return callback(null, response);
  }

  const client = new medium.MediumClient({
    clientId: process.env.medium_client_id,
    clientSecret: process.env.medium_client_secret
  });
  client.setAccessToken(process.env.medium_access_token);

  client.getUser((err, user) => {
    if (err) {
      const response = {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          message: "Failed to get medium user"
        })
      };
      return callback(null, response);
    }
    else {
      client.createPost({
        userId: user.id,
        title: data.title,
        contentFormat: medium.PostContentFormat.HTML,
        content: data.body,
        publishStatus: medium.PostPublishStatus.DRAFT
      }, (err, post) => {
        if (err) {
          const response = {
            statusCode: 400,
            headers: {
              'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              message: "Failed to create post"
            })
          };
          return callback(null, response);
        }
        else {
          const response = {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              message: "Created post",
              post: post
            })
          };
          return callback(null, response);
        }
      });
    }
  });
};
