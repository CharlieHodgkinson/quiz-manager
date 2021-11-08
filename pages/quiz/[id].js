import useSWR from 'swr'
import { useRouter } from 'next/router'
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/quiz.module.css'
import cookie from "js-cookie";
import ListGroup from 'react-bootstrap/ListGroup'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export default function Quiz() {
  const router = useRouter()
  const { id } = router.query
  const userPermission = cookie.get("permission")
  console.log("userpermission:", userPermission)

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/quizes/${id}`, fetcher);

  if (error) {
    console.log(error)
    return <div>failed to load</div>
  }
  if (!data) return <div>loading...</div>

  else if (data) {
    const rawQuestions = Object.keys(data)
    const questions = rawQuestions.filter(item => item != "id" && item != "name" && item != "description")
    console.log(questions)
  }
  //{data[question]['question']}

  // {userPermission == "Edit" &&
  //                   <Button>
  //                     Edit
  //                   </Button>
  //                 }
  console.log(data)
  return (
    <>
      <Container fluid className={styles.heroHeader}>
        <Row className={styles.heroRow}>
          <Col className={styles.quizTitle}>{data.name} Quiz</Col>
        </Row>
        <Row className={styles.heroRow}>
          <Col className={styles.quizSubtitle}>{data.description}</Col>
        </Row>
      </Container>
      <Container>
        <Tabs defaultActiveKey="view" id="quiz-tabs" className="mb-3">
          <Tab eventKey="view" title="View">
            <Accordion>
              {questions.map((question, index) => {
                return (
                  <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header>
                      Question {index+1}:&nbsp;
                      <b>{data[question]['question']}</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      {userPermission == "Restricted" && <a>You do not have permission to view Answers.</a>}
                      {(userPermission == "View" || userPermission == "Edit") &&
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            A:&nbsp;
                            <b>{data[question]['answer']}</b>
                            &nbsp;(correct)
                          </ListGroup.Item>
                          {data[question]['wrongAnswers'].map((wrongAnswer, index) => {
                            return (
                              <ListGroup.Item key={index}>
                                {/* generate an uppercase character based on the index of the list (66 is the ASCII code for B) */}
                                {String.fromCharCode(66 + index)}:&nbsp;
                                <b>{wrongAnswer}</b>
                              </ListGroup.Item>
                            )
                          })}
                        </ListGroup>
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                )
              })}
            </Accordion>
          </Tab>
          <Tab eventKey="edit" title="Edit" disabled={ userPermission == "Edit" ? false : true }>
            <a>test2</a>
          </Tab>
        </Tabs>
        <Button>Delete Quiz</Button>
      </Container>
    </>
  )
}
