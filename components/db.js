import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-1'
});

const db = new AWS.DynamoDB.DocumentClient({ apiVersion: 'latest' });

export default db; // set config for accessing the database and export it as db for the api to use