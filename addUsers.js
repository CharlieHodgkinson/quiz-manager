const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-1'
});

const db = new AWS.DynamoDB.DocumentClient({ apiVersion: 'latest' });

const password1 = bcrypt.hashSync("secret1", 10);
const password2 = bcrypt.hashSync("secret2", 10);
const password3 = bcrypt.hashSync("secret3", 10);

// user.hash = bcrypt.hashSync(password, 10);  
// var params = {
//   RequestItems: {
//     'quiz-manager-users': [
//       {
//         PutRequest: {
//           Item: {
//             username: 'user1',
//             password: password1,
//             permission: 'Restricted'
//           }
//         },
//         PutRequest: {
//           Item: {
//             username: 'user2',
//             password: password2,
//             permission: 'View'
//           }
//         },
//         PutRequest: {
//           Item: {
//             username: 'user3',
//             password: password3,
//             permission: 'Edit'
//           }
//         }
//       }
//     ]
//   }
// };

// db.batchWrite(params, function (err, response) {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log("success", response)
//   }
// });

var params = {
  RequestItems: {
    'quiz-manager-users': [
      {
        PutRequest: {
          Item: {
            username: 'user1',
            password: password1,
            permission: 'Restricted'
          }
        }
      }
    ]
  }
};

db.batchWrite(params, function (err, response) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log("success", response)
  }
});