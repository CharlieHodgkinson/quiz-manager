import db from '../../components/db'; //import the dynamoDB config from component

export default async function (req, res) {
  // filter API requests by method
  if (req.method === 'GET') {
    const params = {
      TableName: process.env.QUIZ_TABLE_NAME,
    };

    db.scan(params, function (err, data) { // get all entries in the quiz database
      if (err) { // if the scan fails
        console.log('Error', err);
        res.status(500).json({ error: 'failed to load data' }).end()
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.json(data.Items); // return all the items returned from the database
        res.status(200).end();
      }
    });
  }
  else if (req.method === 'POST') {
    const params = {
      TableName: process.env.QUIZ_TABLE_NAME,
      Item: req.body
    };

    db.put(params, function (err, data) { // put the quiz data passed in through the req body into the database
      if (err) { // if the put fails
        console.log('Error', err);
        res.status(400).json({ error: 'data could not be updated' }).end();
      } else {
        console.log("inserted into the database")
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.json({message: "success"});
        res.status(200).end(); // return success
      }
    });
  }
  else { // catch any invalid request methods
    res.status(400).json({ error: 'request should be GET' }).end()
  }
}