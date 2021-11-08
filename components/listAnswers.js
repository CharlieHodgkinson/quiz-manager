import ListGroup from 'react-bootstrap/ListGroup'

export default function ListAnswers(props) {
  const { questionData, userPermission } = props;
  console.log("questionData:", questionData)
  return (
    <>
      {userPermission == "Restricted" && <a>You do not have permission to view Answers.</a>}
      {(userPermission == "View" || userPermission == "Edit") &&
        <ListGroup variant="flush">
          <ListGroup.Item>
            A:&nbsp;
            <b>{questionData['answer']}</b>
            &nbsp;(correct)
          </ListGroup.Item>
          {questionData['wrongAnswers'].map((wrongAnswer, index) => {
            return (
              <ListGroup.Item key={index}>
                {/* generate an uppercase character based on the index of the list (66 is the ASCII code for B) */}
                {String.fromCharCode(66 + index)}:&nbsp;
                <b>{wrongAnswer}</b>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      }
    </>
  )
}