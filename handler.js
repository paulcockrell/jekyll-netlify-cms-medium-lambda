'use strict';

var medium = require('medium-sdk');

module.exports.createPost = (event, context, callback) => {
  console.log('Received event', JSON.stringify(event, null, 2));

  if (event.title === undefined || event.body === undefined) {
    callback("400 Invalid input");
  }

  const client = new medium.MediumClient({
    clientId: 'fcc314715293',
    clientSecret: '0f224d1a367014a47c746f25b37accc57ce2b176'
  });
  client.setAccessToken('2e375cf4351981f9f96da0e1d75e4452133a00b5934aba280b426930a61fe755e');

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
