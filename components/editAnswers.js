import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './editView.module.css'
import CloseButton from 'react-bootstrap/CloseButton'

export default function EditAnswers (props) {
  const {wrongAnswer, index} = props

  return (
    <Form.Group as={Row} className="mb-3" controlId={"answer" + index+1}>
      <Form.Label column sm={2}>
        Answer {String.fromCharCode(66 + index)}:
      </Form.Label>
      <Col sm={9}>
        <Form.Control type="text" defaultValue={wrongAnswer} />
      </Col>
      <Col sm={1}>
        <CloseButton className={styles.closeButton} />
      </Col>
    </Form.Group>
  )
}