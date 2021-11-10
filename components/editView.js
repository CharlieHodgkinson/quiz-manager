import Form from 'react-bootstrap/Form'
import EditForm from './editForm'
import Button from 'react-bootstrap/Button'
import styles from './editView.module.css'

// component used by the quiz/[id] page
export default function EditView (props) {
  const { data } = props // import state from parent
  let formData;
  const newData = { // set up the newData object
    "id": data.id,
    "name": data.name,
    "description": data.description,
    "questions": [],
    "answers": []
  };

  async function handleSubmit(e) { // ran when the submit button is clicked
    console.log("old data:", data)
    // e.preventDefault(); // prevent the page from reloading
    formData = formData || new FormData(e.target); // if formData hasn't been set then instantiate it with the html FormData api
    let questionNum;
    const newQuestionNum = -1;

    for(var pair of formData.entries()) { // loop through every form element with a name attribute
      if (pair[0].startsWith("question")) { // if input element is for a question
        newQuestionNum++
        questionNum = pair[0].charAt(pair[0].length-1);
        newData['questions'].push(pair[1])
        newData['answers'].push([])
      }
      else if (pair[0].startsWith("answer"+questionNum)) { // if input element is an answer for the 'current' question
        newData['answers'][newQuestionNum].push(pair[1])
      }
    }
    const response = await fetch("/api/quizes/", { // post the newData object to the api so it can put it in the database
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const responseBody = await response.json(); // wait for the api's response
    // there should be error handling here
  };

  function handleDelete(item) {
    formData = formData || new FormData(document.getElementById("quizForm"));
    console.log("item is", item)
    
    if (!item.startsWith("answer")) { //item is question
      const questionNum = item.charAt(item.length-1);

      data["answers"][questionNum].forEach((question, index) => { //delete associaited answers
        const answerName = "answer".concat(questionNum).concat(index);
        formData.delete(answerName)
        document.getElementById(answerName).style.display = "none";
      })
    }
    formData.delete(item)
    document.getElementById(item).style.display = "none";
  }

  return (
    <Form id="quizForm" onSubmit={handleSubmit}>
      {data['questions'].map((question, index) => {
        return (
          <EditForm data={data} question={question} index={index} key={index} handleDelete={handleDelete}/>
        )
      })}
      <Button className={styles.submitButton} type="submit">Submit Changes</Button>
    </Form>
  )
}