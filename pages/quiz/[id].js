import useSWR from 'swr'
import { useRouter } from 'next/router'
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from '../../styles/quiz.module.css'
import cookie from "js-cookie";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import QuizView from '../../components/quizView';
import EditView from '../../components/editView';
// this is a next dynamic route generated using a url slug
export default function Quiz() {
  const router = useRouter()
  const { id } = router.query // get the [id] from the path
  const userPermission = cookie.get("permission") // get users permission level
  
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/quizes/${id}`, fetcher); // fetch data from the dynamic api route

  if (error) { // if the fetch fails
    console.log(error)
    return <div>failed to load</div>
  }
  if (!data) return <div>loading...</div> // if the fetch is still in progress

  // const rawQuestions = Object.keys(data)
  // console.log("rawQuestions", rawQuestions)
  // const questions = rawQuestions.filter(item => item != "id" && item != "name" && item != "description") // create an array of just the question object keys

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
            {/* use the quizView component */}
            <QuizView data={data} userPermission={userPermission} />
          </Tab>
          <Tab eventKey="edit" title="Edit" disabled={ userPermission == "Edit" ? false : true }>
            {/* use the edit view component */}
            <EditView data={data}/>
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}
