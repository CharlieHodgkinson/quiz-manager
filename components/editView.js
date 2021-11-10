import Form from 'react-bootstrap/Form'
import EditForm from './editForm'
import Button from 'react-bootstrap/Button'
import styles from './editView.module.css'

// component used by the quiz/[id] page
export default function EditView (props) {
  const { questions, data } = props // import state from parent
  let formData;
  const newData = { // set up the newData object
    "id": data.id,
    "name": data.name,
    "description": data.description
  };

  async function handleSubmit(e) { // ran when the submit button is clicked
    e.preventDefault(); // prevent the page from reloading
    formData = formData || new FormData(e.target); // if formData hasn't been set then instantiate it with the html FormData api
    let questionNum;

    for(var pair of formData.entries()) { // loop through every form element with a name attribute
      if (pair[0].startsWith("question")) { // if input element is for a question
        questionNum = pair[0].charAt(pair[0].length-1); // get the number of the question using regex to get the last character
        newData["question"+questionNum] = {};
        newData["question"+questionNum]["question"] = pair[1];
        newData["question"+questionNum]["wrongAnswers"] = [];
      }
      else if (pair[0] == "answer"+questionNum+0) { // if input element is the FIRST answer for the 'current' question
        newData["question"+questionNum]["answer"] = pair[1];
      }
      else if (pair[0].startsWith("answer"+questionNum)) { // if input element is an answer for the 'current' question
        newData["question"+questionNum]["wrongAnswers"].push(pair[1])
      }
    }
    console.log("New quiz to be uploaded:", newData)
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
    if (item.startsWith("answer")) {
      formData.delete(item);
      document.getElementById(item).style.display = "none";
    }
    else {
      const questionNum = item.charAt(item.length-1);
      for(var pair of formData.entries()) {
        console.log(pair[0], "starts with", "answer"+questionNum, pair[0].startsWith("answer"+questionNum))
        if(pair[0].startsWith("answer"+questionNum)) {
          console.log("children:", pair[0])
          formData.delete(pair[0]);
          document.getElementById(pair[0]).style.display = "none";
        }
      }
      formData.delete(item);
      document.getElementById(item).style.display = "none";
    }
  }

  return (
    <Form id="quizForm" onSubmit={handleSubmit}>
      {questions.map((question, index) => {
        return (
          <EditForm data={data} question={question} index={index} key={index} handleDelete={handleDelete}/>
        )
      })}
      <Button className={styles.submitButton} type="submit">Submit Changes</Button>
    </Form>
  )
}