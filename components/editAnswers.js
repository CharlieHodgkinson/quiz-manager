import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './editView.module.css'
import CloseButton from 'react-bootstrap/CloseButton'

export default function EditAnswers (props) {
  const {answer, answerNum, questionNum, handleDelete} = props

  return (
    <Form.Group as={Row} className="mb-3" controlId={"answer".concat(questionNum).concat(answerNum)} id={"answer".concat(questionNum).concat(answerNum)}>
      <Form.Label column sm={2}>
        Answer {String.fromCharCode(65 + answerNum)}:
      </Form.Label>
      <Col sm={9}>
        <Form.Control type="text" defaultValue={answer} name={"answer".concat(questionNum).concat(answerNum)}/>
      </Col>
      <Col sm={1}>
        <CloseButton className={styles.closeButton} onClick={() => handleDelete("answer".concat(questionNum).concat(answerNum))}/>
      </Col>
    </Form.Group>
  )
}