import Form from 'react-bootstrap/Form'
import EditForm from './editForm'
import Button from 'react-bootstrap/Button'
import styles from './editView.module.css'
import { useState, FormEvent } from 'react';

export default function EditView (props) {
  const { questions, data } = props
  console.log("data is:", data)
  console.log(questions)

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newData = {};
    let questionNum;

    for(var pair of formData.entries()) {
      if (pair[0].startsWith("question")) {
        questionNum = pair[0].charAt(pair[0].length-1);
        newData["question"+questionNum] = {};
        newData["question"+questionNum]["question"] = pair[1];
        newData["question"+questionNum]["wrongAnswers"] = [];
      }
      else if (pair[0] == "answer"+questionNum+0) {
        newData["question"+questionNum]["answer"] = pair[1];
      }
      else {
        newData["question"+questionNum]["wrongAnswers"].push(pair[1])
      }
    }
    console.log("newData:", newData)
    // console.log("new questions", newQuestions)
    // setNewQuestionData(newQuestions);
    // console.log("new question state", newQuestionData)
  };

  const handleDelete = (e) => {
    formData.delete(name);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {questions.map((question, index) => {
        return (
          <EditForm data={data} question={question} index={index} key={index}/>
        )
      })}
      <Button className={styles.submitButton} type="submit">Submit Changes</Button>
      <Button className={styles.deleteButton} variant="danger" >Delete Quiz</Button>
    </Form>
  )
}