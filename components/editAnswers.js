import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './editView.module.css'
import CloseButton from 'react-bootstrap/CloseButton'

export default function EditAnswers (props) {
  const {wrongAnswer, index, questionIndex} = props
  index = index+1
  questionIndex = questionIndex+1

  return (
    <Form.Group as={Row} className="mb-3" controlId={"answer" + index}>
      <Form.Label column sm={2}>
        Answer {String.fromCharCode(66 + index)}:
      </Form.Label>
      <Col sm={9}>
        <Form.Control type="text" defaultValue={wrongAnswer} name={"answer"+questionIndex+index}/>
      </Col>
      <Col sm={1}>
        <CloseButton className={styles.closeButton} />
      </Col>
    </Form.Group>
  )
}