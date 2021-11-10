import { red } from 'bn.js';
import db from '../../../components/db';

export default async function (req, res) {
  const quizID = req.query.id; // setting quizID to the url slug used
  // filter API requests by method
  if (req.method === 'GET') {
    const params = {
      TableName: process.env.QUIZ_TABLE_NAME,
      Key: {
        id: quizID
      }
    };

    db.get(params, function (err, data) { // getting the quiz that matches the given quiz id
      if (err) { // if there wernt any quizes matching the given id in the database
        console.log('Error', err);
        res.status(400).json({ error: 'incorrect quiz id' }).end(); // return error
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.json(data.Item); // return the data of the quiz that macthed the id
        res.status(200).end();
      }
    });
  }
  else if (req.method === "DELETE") {
    const params = {
      TableName: process.env.QUIZ_TABLE_NAME,
      Key: {
        id: quizID
      }
    };

    db.delete(params, function (err, data) { // delete the quiz that macthes the given quiz id
      if (err) { // if the given quiz id is not in the database
        console.log('Error', err);
        res.status(400).json({ error: 'incorrect quiz id' }).end();
      } else { // if quiz was deleted successfully
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.json({"message": "successfully deleted item"}); // rteurn success
        res.status(200).end();
      }
    });
  }
  else { // catching any invalid request methods
    res.status(400).json({ error: 'request should be POST or GET' }).end()
  }
}