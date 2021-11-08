import { Button, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './editView.module.css'
import CloseButton from 'react-bootstrap/CloseButton'
import EditAnswers from './editAnswers'

export default function EditForm (props) {
  const { questionData, index } = props
  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId={"question" + index+1}>
        <Form.Label column sm={2}>
          Question {index+1}:
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" defaultValue={questionData['question']} />
        </Col>
        <Col sm={1}>
          <CloseButton className={styles.closeButton} />
        </Col>
      </Form.Group>

      <Container className={ styles.answerContainer }>
        <Form.Group as={Row} className="mb-3" controlId="correctAnswer">
          <Form.Label column sm={2}>
            Answer A (correct):
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="text" defaultValue={questionData['answer']} />
          </Col>
          <Col sm={1}>
            <CloseButton className={styles.closeButton} />
          </Col>
        </Form.Group>

        {questionData['wrongAnswers'].map((wrongAnswer, indexB) => {
          return (

            <EditAnswers wrongAnswer={wrongAnswer} index={indexB} key={indexB}/>

          )
        })}
      </Container>
    </>
  )
}