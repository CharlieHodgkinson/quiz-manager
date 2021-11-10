import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './editView.module.css'
import CloseButton from 'react-bootstrap/CloseButton'
import EditAnswers from './editAnswers'

export default function EditForm (props) {
  const { data, question, index, handleDelete } = props

  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId={"question" + index} id={"question"+index}>
        <Form.Label column sm={2}>
          Question {index+1}:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            defaultValue={question}
            name={"question"+index}
          />
        </Col>
        <Col sm={1}>
          <CloseButton className={styles.closeButton} onClick={() => handleDelete("question"+index)}/>
        </Col>
      </Form.Group>

      <Container className={ styles.answerContainer }>
        {data['answers'][index].map((answer, answerNum) => {
          return (
            <EditAnswers answer={answer} answerNum={answerNum} key={answerNum} questionNum={index} handleDelete={handleDelete}/>
          )
        })}
      </Container>
    </>
  )
}