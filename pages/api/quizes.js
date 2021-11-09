import db from '../db';

export default async function (req, res) {
  // filter API requests by method
  if (req.method === 'GET') {
    // Allow a blog post to get its number of likes and views
    const params = {
      TableName: process.env.QUIZ_TABLE_NAME,
    };

    db.scan(params, function (err, data) {
      if (err) {
        console.log('Error', err);
        res.status(500).json({ error: 'failed to load data' }).end()
      } else {
        // send the json response from the callback
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.json(data.Items);
        res.status(200).end();
      }
    });
  }
  else if (req.method === 'POST') {
    console.log("success", req.body)

    const params = {
      TableName: process.env.QUIZ_TABLE_NAME,
      Item: req.body
    };

    db.put(params, function (err, data) {
      if (err) {
        console.log('Error', err);
        res.status(400).json({ error: 'data could not be updated' }).end();
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.json({message: "success"});
        res.status(200).end();
      }
    });
  }
  else {
    res.status(400).json({ error: 'request should be GET' }).end()
  }
}