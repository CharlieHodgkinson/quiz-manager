import Form from 'react-bootstrap/Form'
import EditForm from './editForm'
import Button from 'react-bootstrap/Button'
import styles from './editView.module.css'

export default function EditView (props) {
  const { questions, data } = props
  return (
    <Form>
      {questions.map((question, index) => {
        return (
          <EditForm questionData={data[question]} index={index} key={index}/>
        )
      })}
      <Button className={styles.submitButton}>Submit Changes</Button>
      <Button className={styles.deleteButton} variant="danger" >Delete Quiz</Button>
    </Form>
  )
}