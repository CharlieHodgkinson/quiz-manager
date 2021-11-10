import ListGroup from 'react-bootstrap/ListGroup'

export default function ListAnswers(props) {
  const { data, index, userPermission } = props;
 
  return (
    <>
      {userPermission == "Restricted" && <a>You do not have permission to view Answers.</a>}
      {(userPermission == "View" || userPermission == "Edit") &&
        <ListGroup variant="flush">
          {data['answers'][index].map((answer, answerIndex) => {
            return (
              <ListGroup.Item key={answerIndex}>
                {/* generate an uppercase character based on the index of the list (66 is the ASCII code for B) */}
                {String.fromCharCode(65 + answerIndex)}:&nbsp;
                <b>{answer}</b>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      }
    </>
  )
}