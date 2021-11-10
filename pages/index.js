import useSWR from 'swr'
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/Container";
import styles from '../styles/quizesLayout.module.css'
import utilStyles from '../styles/utils.module.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import cookie from "js-cookie";

export default function Quizes(props) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, mutate } = useSWR("/api/quizes", fetcher); // fetch the data for all the quizes from the api
  const userPermission = cookie.get("permission"); // get the users permission level

  async function handleDeleteQuiz(quizID) { // if the user clicks the delete button
    const text = document.getElementById("delete."+quizID)
    const response = await fetch("/api/quizes/"+quizID, { // send a delete request to the api with the quiz id
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const responseBody = await response.json();
    if (response.status == 200) { // if quiz was deleted
      mutate() // fetch the data again
    }
    else { // if quiz couldn't be deleted
      text.innerHTML = responseBody.error; // tell the user there was an error
      text.style = "visibility: unset"
    }
  }

  if (error) { // if there is an error fetching the quiz data
    console.log(error)
    return <div>failed to load</div>
  }

  if (!data) return <div>loading...</div> // if there isn't any data from the fetch yet (aka fetch is still in progress)

  return (
    <>
      <Container fluid className={utilStyles.heroHeader}>
        <Row>
          <Col className={styles.imageCol}>
            <img
              alt=""
              src="./images/questionMark.png"
              className={styles.heroHeaderImage}
            />
          </Col>
          <Col className={styles.textCol}>
            <h1>Quiz Manager</h1>
            <a>Here you can view all the quizes that have been created. Select a quiz to see the questions.</a>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* loop through each quiz in the database */}
        {data.map((quiz, index) => {
          return (
            <Card key={index} className={styles.card}>
              <Card.Header className={styles.cardHeader}>{quiz.name}</Card.Header>
              <Card.Body>
                <Card.Title>{quiz.description}</Card.Title>
                <Card.Text>
                  {quiz['questions'].length} Questions
                </Card.Text>
                <Button href={`/quiz/${quiz.id}`} className={styles.viewQuizButton}>View Quiz</Button>
                {userPermission == "Edit" && 
                  <Button
                    variant="danger"
                    className={styles.deleteQuizButton}
                    onClick={() => handleDeleteQuiz(quiz.id)}
                  >Delete Quiz</Button>
                }
                <a className={styles.deleteText} id={"delete."+quiz.id}></a>
              </Card.Body>
            </Card>
          )
        })}
      </Container>
    </>
  )
}
