
export default function QuizView (props) {
  const {questions, data, userPermission } = props
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
              {userPermission == "Restricted" && <a>You do not have permission to view Answers.</a>}
              {(userPermission == "View" || userPermission == "Edit") &&
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    A:&nbsp;
                    <b>{data[question]['answer']}</b>
                    &nbsp;(correct)
                  </ListGroup.Item>
                  {data[question]['wrongAnswers'].map((wrongAnswer, index) => {
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
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}