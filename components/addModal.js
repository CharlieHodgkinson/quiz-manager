import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from 'react-bootstrap'
import { useState } from "react";
import styles from './addModal.module.css'
import { useRouter } from "next/router";

// component for a bootstrap modal that allows you to create a new quiz
export default function AddModal(props) {
  const { handleClose, show } = props; // importing state from parent
  const router = useRouter();
  const [questionsCount, setQuestionsCount] = useState(1); // set the starting number of questions to 1
  const [answersCount, setAnswersCount] = useState([3]); // set the number of answers for the first question to 3

  async function handleSubmit(e) { // when submit button is clicked
    e.preventDefault(); // prevent page reloading
    const formData = new FormData(e.target); // use html FormData api
    let questionNum;
    const newData = {}; // object that will store the new quiz data from the input fields in the same structure as the database

    newData["name"] = formData.get("name") // get the contents of the input field for the element with matching name attribute
    const id = newData["name"].replace(/ /g, "-") // use regex to replace spaces in quiz name with dashes to create quiz id
    newData['id'] = id; // set the new id in the new data object

    newData["description"] = formData.get("description"); // same as line 22

    for(var pair of formData.entries()) { // looping through all input fields in the form element that has a name attribute
      if (pair[0].startsWith("question")) { // if the input field is for a question
        questionNum = pair[0].charAt(pair[0].length-1); // get the number of the question from the name
        newData["question"+questionNum] = {};
        newData["question"+questionNum]["question"] = pair[1];
        newData["question"+questionNum]["wrongAnswers"] = [];
      }
      else if (pair[0] == "answer"+questionNum+0) { // if the input field is the FIRST answer for the 'current' question
        newData["question"+questionNum]["answer"] = pair[1];
      }
      else if (pair[0].startsWith("answer"+questionNum)) { // else if the input field is an answer for the 'current' question
        newData["question"+questionNum]["wrongAnswers"].push(pair[1])
      }
    }
    const response = await fetch("/api/quizes/", { // post the new quiz object to the api
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const responseBody = await response.json();
    if (response.status == 200) { // if the api successfully inserted the item into the database
      handleClose() // close the modal
      router.push("/"); // refresh the page by redirecting to the homepage
    }
    else { // if there was an error
      console.log(responseBody.error) // there should be more error handling here
    }
  };

  const handleAddQuestion = (e) => { // called when the add question button is added
    e.preventDefault(); // prevent the page from reloading
    setQuestionsCount(questionsCount + 1);
    let newAnswerCount = [...answersCount, 3]
    setAnswersCount(newAnswerCount); // updates the state by increasing the number of questions and setting the num of answers for the question to 3
  };

  const handleRemoveQuestion = () => { // if the user wants to delete a question
    setQuestionsCount(questionsCount - 1); // update the state by decreasing the number of questions
    // there should be functionality to remove the corresponding answer fields from the state here
  };

  // const handleAddAnswer = (e) => { // this function doesn't yet work, it is meant to allow the user to add additional answers for any question
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
          {/* loops through an temporary 'empty' array that has the length of the number of questions as set in the questionsCount state */}
          {[...Array(questionsCount)].map((_, index) => {
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
                  {/* loops through an temporary 'empty' array that has the length of the number of answers as set in the answersCount state */}
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
                  {/* button for adding additonal answer fields for any question, commented out since function doesn't work */}
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
