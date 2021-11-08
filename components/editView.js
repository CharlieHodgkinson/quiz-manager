import Form from 'react-bootstrap/Form'
import EditForm from './editForm'

export default function EditView (props) {
  const { questions, data } = props
  return (
    <Form>

      {questions.map((question, index) => {
        return (
          <EditForm questionData={data[question]} index={index} key={index}/>
        )
      })}
    </Form>
  )
}