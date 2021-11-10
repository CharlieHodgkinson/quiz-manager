import Accordion from 'react-bootstrap/Accordion'
import ListAnswers from './listAnswers'
import styles from './quizView.module.css'

export default function QuizView (props) {
  const { data, userPermission } = props

  return (
    <Accordion className={styles.accordion}>
      {data['questions'].map((question, index) => {
        return (
          <Accordion.Item key={index} eventKey={index}>
            <Accordion.Header>
              Question {index+1}:&nbsp;
              <b>{data['questions'][index]}</b>
            </Accordion.Header>
            <Accordion.Body>
              <ListAnswers data={data} index={index} userPermission={userPermission} />
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}