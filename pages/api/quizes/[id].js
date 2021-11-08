import db from '../../db';

export default async function (req, res) {
  const quizID = req.query.id;
  // filter API requests by method
  if (req.method === 'GET') {
    // Allow a blog post to get its number of likes and views
    const params = {
      TableName: process.env.QUIZ_TABLE_NAME,
      Key: {
        id: quizID
      }
    };

    db.get(params, function (err, data) {
      if (err) {
        console.log('Error', err);
        res.status(400).json({ error: 'incorrect quiz id' }).end();
      } else {
        // send the json response from the callback
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.json(data.Item);
        res.status(200).end();
      }
    });
  }
  // else if (req.method === 'PUT') {
  //   // Allow a blog post to update its likes (via a button) or views (on rendering)
  // }
  else {
    res.status(400).json({ error: 'request should be GET' }).end()
  }
}