const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcryptjs');
import db from '../db';

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const sessionID = uuidv4();
    const { username, password } = req.body;

    const params = {
      TableName: process.env.USER_TABLE_NAME,
      Key: {
        username: username
      }
    };

    db.get(params, function (err, data) {
      if (err || Object.keys(data).length === 0) {
        console.log('user not found', err);
        res.status(404).json({ error: 'User Not Found' });
        res.end();
      }
      else {
        if (!(bcrypt.compareSync(password, data.Item.password))) { // check password is correct
          console.log("password incorrect")
          res.status(401).json({ error: "Incorrect creds" })
          res.end();
        }
        else {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'max-age=180000');
          res.json({"SESSIONID": sessionID, "permission": data.Item.permission}) //data.Items);
          res.status(200).end();
        }
      }
    });
  }
  else {
    res.status(400).json({ error: 'request should be POST' }).end();
  }
}
