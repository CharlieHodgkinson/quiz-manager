import { Button, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './editView.module.css'
import CloseButton from 'react-bootstrap/CloseButton'

export default function EditView (props) {
  const { questions, data, userPermission } = props
  return (
    <Form>

      {questions.map((question, indexA) => {
        return (
          <>
            <Form.Group key={indexA} as={Row} className="mb-3" controlId={"question" + indexA+1}>
              <Form.Label column sm={2}>
                Question {indexA+1}:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" defaultValue={data[question]['question']} />
              </Col>
              <Col sm={1}>
                <CloseButton className={styles.closeButton} />
              </Col>
            </Form.Group>

            <Container className={ styles.answerContainer }>
              <Form.Group key={indexA + "correctAnswer"} as={Row} className="mb-3" controlId="correctAnswer">
                <Form.Label column sm={2}>
                  Answer A (correct):
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" defaultValue={data[question]['answer']} />
                </Col>
                <Col sm={1}>
                  <CloseButton className={styles.closeButton} />
                </Col>
              </Form.Group>

              {data[question]['wrongAnswers'].map((wrongAnswer, indexB) => {
                return (

                  <Form.Group key={indexA, indexB} as={Row} className="mb-3" controlId={"answer" + indexB+1}>
                    <Form.Label column sm={2}>
                      Answer {String.fromCharCode(66 + indexB)}:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control type="text" defaultValue={wrongAnswer} />
                    </Col>
                    <Col sm={1}>
                      <CloseButton className={styles.closeButton} />
                    </Col>
                  </Form.Group>

                )
              })}
            </Container>
          </>
        )
      })}
    </Form>
  )
}