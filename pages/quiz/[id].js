import useSWR from 'swr'
import { useRouter } from 'next/router'
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/quiz.module.css'
import cookie from "js-cookie";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import QuizView from '../../components/quizView';
import EditView from '../../components/editView';

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
            <QuizView questions={questions} data={data} userPermission={userPermission} />
          </Tab>
          <Tab eventKey="edit" title="Edit" disabled={ userPermission == "Edit" ? false : true }>
            <EditView questions={questions} data={data} userPermission={userPermission} />
          </Tab>
        </Tabs>
        <Button className={styles.submitButton} >Submit Changes</Button>
        <Button className={styles.deleteButton} variant="danger" >Delete Quiz</Button>
      </Container>
    </>
  )
}
