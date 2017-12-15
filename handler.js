'use strict';

var medium = require('medium-sdk');

module.exports.createPost = (event, context, callback) => {
  console.log('Received event', JSON.stringify(event, null, 2));

  // Check the parameters
  if (event.title === undefined || event.body === undefined) {
    callback("400 Invalid input");
  }

  // Check the environment variables
  if (process.env.medium_client_id === undefined || process.env.medium_client_secret === undefined || process.env.medium_access_token === undefined) {
    callback("400 Enviroment variables not set");
  }

  const client = new medium.MediumClient({
    clientId: process.env.medium_client_id,
    clientSecret: process.env.medium_client_secret
  });
  client.setAccessToken(process.env.medium_access_token);

  client.getUser((err, user) => {
    if (err) {
      console.log("Failed to get medium user", err);
    }
    else {
      client.createPost({
        userId: user.id,
        title: event.title,
        contentFormat: medium.PostContentFormat.HTML,
        content: event.body,
        publishStatus: medium.PostPublishStatus.DRAFT
      }, (err, post) => {
        if (err) {
          console.log("Failed to create post for user" + user.name, err);
        }
        else {
          const response = {
            statusCode: 200,
            body: JSON.stringify({
              message: "Created post",
              post: post
            }),
          };

          callback(null, response);
        }
      });
    }
  });
};
