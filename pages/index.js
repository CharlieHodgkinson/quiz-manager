import useSWR from 'swr'
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/Container";
import styles from '../styles/quizesLayout.module.css'
import utilStyles from '../styles/utils.module.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function Quizes(props) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/quizes", fetcher);

  if (error) {
    console.log(error)
    return <div>failed to load</div>
  }

  if (!data) return <div>loading...</div>

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
        {data.map((quiz, index) => {
          return (
            <Card key={index} className={styles.card}>
              <Card.Header className={styles.cardHeader}>{quiz.name}</Card.Header>
              <Card.Body>
                <Card.Title>{quiz.description}</Card.Title>
                <Card.Text>
                  {Object.keys(quiz).length - 3} Questions
                </Card.Text>
                <Button href={`/quiz/${quiz.id}`} className={styles.viewQuizButton}>View Quiz</Button>
              </Card.Body>
            </Card>
          )
        })}
      </Container>
    </>
  )
}
