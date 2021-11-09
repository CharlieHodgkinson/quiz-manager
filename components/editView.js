import Form from 'react-bootstrap/Form'
import EditForm from './editForm'
import Button from 'react-bootstrap/Button'
import styles from './editView.module.css'
import { useState, FormEvent } from 'react';

export default function EditView (props) {
  const { questions, data } = props
  const [ questionData, setQuestionData ] = useState(questions);
  const [ quizData, setQuizData ] = useState(data)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    for(var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {questionData.map((question, index) => {
        return (
          <EditForm questionData={data[question]} index={index} key={index}/>
        )
      })}
      <Button className={styles.submitButton} type="submit">Submit Changes</Button>
      <Button className={styles.deleteButton} variant="danger" >Delete Quiz</Button>
    </Form>
  )
}