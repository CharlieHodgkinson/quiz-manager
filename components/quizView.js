import Accordion from 'react-bootstrap/Accordion'
import ListAnswers from './listAnswers'

export default function QuizView (props) {
  const { questions, data, userPermission } = props
  return (
    <Accordion>
      {questions.map((question, index) => {
        return (
          <Accordion.Item key={index} eventKey={index}>
            <Accordion.Header>
              Question {index+1}:&nbsp;
              <b>{data[question]['question']}</b>
            </Accordion.Header>
            <Accordion.Body>
              <ListAnswers questionData={data[question]} userPermission={userPermission} />
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}