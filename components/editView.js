import Form from 'react-bootstrap/Form'
import EditForm from './editForm'
import Button from 'react-bootstrap/Button'
import styles from './editView.module.css'
import { useState, FormEvent } from 'react';

export default function EditView (props) {
  const { questions, data } = props
  let formData;
  const newData = {
    "id": data.id,
    "name": data.name,
    "description": data.description
  };

  console.log("data is:", data)
  console.log(questions)

  async function handleSubmit(e) {
    e.preventDefault();
    formData = formData || new FormData(e.target);
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
      else if (pair[0].startsWith("answer"+questionNum)) {
        newData["question"+questionNum]["wrongAnswers"].push(pair[1])
      }
    }
    console.log("newData:", newData)
    const response = await fetch("/api/quizes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const responseBody = await response.json();
  };

  function handleDelete(item) {
    formData = formData || new FormData(document.getElementById("quizForm"));
    console.log("item is", item)
    if (item.startsWith("answer")) {
      formData.delete(item);
      document.getElementById(item).style.display = "none";
    }
    else {
      const questionNum = item.charAt(item.length-1);
      for(var pair of formData.entries()) {
        console.log(pair[0], "starts with", "answer"+questionNum, pair[0].startsWith("answer"+questionNum))
        if(pair[0].startsWith("answer"+questionNum)) {
          console.log("children:", pair[0])
          formData.delete(pair[0]);
          document.getElementById(pair[0]).style.display = "none";
        }
      }
      formData.delete(item);
      document.getElementById(item).style.display = "none";
    }
  }

  return (
    <Form id="quizForm" onSubmit={handleSubmit}>
      {questions.map((question, index) => {
        return (
          <EditForm data={data} question={question} index={index} key={index} handleDelete={handleDelete}/>
        )
      })}
      <Button className={styles.submitButton} type="submit">Submit Changes</Button>
    </Form>
  )
}