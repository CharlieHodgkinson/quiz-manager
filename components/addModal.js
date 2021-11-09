import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from 'react-bootstrap'
import { useState } from "react";


// function useFormFields(initialValues) {
//   const [formFields, setFormFields] = useState(initialValues);
//   const createChangeHandler = function (key) {
//     return function (e) {
//       const value = e.target.value;
//       setFormFields((prev) => {
//         const newFormFields = { ...prev };
//         newFormFields[key] = value;
//         return newFormFields;
//       });
//     };
//   };
//   return { formFields, createChangeHandler, setFormFields };
// }

export default function AddModal(props) {
  const { handleClose, show } = props;
  const [questionsCount, setQuestionsCount] = useState(1);
  const [answersCount, setAnswersCount] = useState([3]);

  console.log(questionsCount);
  console.log(answersCount);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit")
    const formData = new FormData(e.target);
    let questionNum;
    const newData = {};

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
    // const response = await fetch("/api/quizes/"+data['id'], {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newData),
    // });
    // const responseBody = await response.json();
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

  const handleAddAnswer = (e) => {
    e.preventDefault();
    let newAnswersCount = answersCount;
    newAnswersCount[e.target.value] += 1;
    console.log(newAnswersCount)
    setAnswersCount(newAnswersCount);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Since you're an editor, you can create new quizzes!
        <br />
        <br />
        <Form onSubmit={handleSubmit} id="createQuiz">
          <Form.Group className="mb-3">
            <Form.Label>
              Enter Title
            </Form.Label>
            <Form.Control
              type="id"
              id="id"
              defaultValue="Quiz Title"
            />
          </Form.Group>
          {[...Array(questionsCount)].map((_, index) => {
            console.log("question map ran")
            return (
              <>
                <Form.Group className="mb-3" controlId={"question" + index}>
                  <Form.Label>
                    Question {index}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue="question"
                    name={"question"+index}
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
                        <Form.Control type="text" defaultValue="wrong answer" name={"answer"+index+indexA}/>
                      </Form.Group>
                    );
                  })}

                  <Button variant="secondary" value={index} onClick={handleAddAnswer}>
                    Add Answer
                  </Button>
                </Container>
              </>
            );
          })}
          <Button variant="secondary" onClick={handleAddQuestion}>
            Add Question
          </Button>
          <Button variant="primary" onClick={handleRemoveQuestion}>
            Remove Question
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
