const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcryptjs');
import db from '../../components/db';

export default async function handler (req, res) {
  if (req.method === 'POST') { // filter by request method
    const sessionID = uuidv4(); // generate a session id using uuid
    const { username, password } = req.body; // extracting username and password from request body

    const params = {
      TableName: process.env.USER_TABLE_NAME,
      Key: {
        username: username
      }
    };

    db.get(params, function (err, data) { // getting any entries with the id matching username given
      if (err || Object.keys(data).length === 0) { // if get fails or if there were no matching entries found
        console.log('user not found', err);
        res.status(404).json({ error: 'User Not Found' });
        res.end(); // return error
      }
      else {
        if (!(bcrypt.compareSync(password, data.Item.password))) { // if password given does not match password hash from database
          console.log("password incorrect")
          res.status(401).json({ error: "Incorrect creds" })
          res.end(); // return error
        }
        else { // if the username and password are correct
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'max-age=180000');
          res.json({"SESSIONID": sessionID, "permission": data.Item.permission}) // return the stored permission level for the user and a session id
          res.status(200).end();
        }
      }
    });
  }
  else { // catching invalid request methods
    res.status(400).json({ error: 'request should be POST' }).end();
  }
}
