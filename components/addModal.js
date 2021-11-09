import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from 'react-bootstrap'
import { useState } from "react";
import styles from './addModal.module.css'

export default function AddModal(props) {
  const { handleClose, show } = props;
  const [questionsCount, setQuestionsCount] = useState(1);
  const [answersCount, setAnswersCount] = useState([3]);

  async function handleSubmit(e) {
    console.log("submit")
    const formData = new FormData(e.target);
    let questionNum;
    const newData = {};

    newData["name"] = formData.get("name")
    const id = newData["name"].replace(/ /g, "-")
    console.log(id)
    newData['id'] = id;

    newData["description"] = formData.get("description");

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
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setQuestionsCount(questionsCount + 1);
    let newAnswerCount = [...answersCount, 3]
    setAnswersCount(newAnswerCount);
  };

  const handleRemoveQuestion = () => {
    setQuestionsCount(questionsCount - 1);
  };

  // const handleAddAnswer = (e) => {
  //   e.preventDefault();
  //   let newAnswersCount = answersCount;
  //   newAnswersCount[e.target.value] += 1;
  //   console.log(newAnswersCount)
  //   setAnswersCount(newAnswersCount);
  // };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="createQuiz">
          <Form.Group className="mb-3">
            <Form.Label>
              Enter Title
            </Form.Label>
            <Form.Control
              type="id"
              name="name"
              placeholder="The name of the quiz"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Enter Description
            </Form.Label>
            <Form.Control
              type="id"
              name="description"
              placeholder="A short description of the quiz"
            />
          </Form.Group>
          {[...Array(questionsCount)].map((_, index) => {
            console.log("question map ran")
            return (
              <>
                <Form.Group className="mb-3" controlId={"question"+(index+1)}>
                  <Form.Label>
                    Question {index+1}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the question here"
                    name={"question"+(index+1)}
                  />
                </Form.Group>

                <Container>
                  {[...Array(answersCount[index])].map((_, indexA) => {
                    console.log("answer map ran")
                    console.log("answersCount", answersCount[0], "answers", answersCount, "index", index)
                    return (
                      <Form.Group className="mb-3" controlId={"answer"+index+indexA}>
                        <Form.Label>
                          Answer {String.fromCharCode(65 + indexA)}
                        </Form.Label>
                        <Form.Control type="text" placeholder={indexA == 0 ? "The correct answer to the question" : "Other incorrect answer (for multiple choice)"} name={"answer"+(index+1)+indexA}/>
                      </Form.Group>
                    );
                  })}

                  {/* <Button variant="secondary" value={index} onClick={handleAddAnswer}>
                    Add Answer
                  </Button> */}
                </Container>
              </>
            );
          })}
          <Button className={styles.submitButton} variant="primary" type="submit">
            Save Changes
          </Button>
          <Button className={styles.button} variant="secondary" onClick={handleAddQuestion}>
            Add Question
          </Button>
          <Button className={styles.button} variant="secondary" onClick={handleRemoveQuestion}>
            Remove Question
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
