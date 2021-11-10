import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import styles from '../styles/login.module.css';
import Alert from 'react-bootstrap/Alert'
import React, { useState } from 'react';

import { useRouter } from "next/router";
import cookie from "js-cookie";

export default function Login(props) {
  const router = useRouter();

  const [loginFail, setLoginFail] = useState(false); // set the loginFail state to false - the user has not yet failed the login

  const handlePostLoginOk = () => { // if the user successfully logs in
    if (router.query) {
      router.push("/"); // redirect them to the homepage
    }
  };

  async function handleSubmit(e) { // when the submit button is clicked
    e.preventDefault(); // prevent the default of the page reloading - we want to redirect the user to / instead
    const body = { //getting the inputted username and password
      "username": e.target.elements["username"].value,
      "password": e.target.elements["password"].value
    };
    
    const response = await fetch("/api/auth", { //posting the credentials to the api for authorisation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseBody = await response.json();

    if (response.status == 200) { // user was authorised
      // both cookies expire in 1 hour
      cookie.set("user", responseBody.SESSIONID, { expires: 1 / 24 }) // setting the user cookie with a session id to persist the user state throughout the app
      cookie.set("permission", responseBody.permission, { expires: 1 / 24 }) // set the users permission level
      
      handlePostLoginOk(); // run the function to redirect the user to the homepage
    }
    else { // authorisation failed
      setLoginFail(true); // change the state to login failed
    }
  }

  return (
    <>
      <Container className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder="Enter Username" />
            <Form.Text className="text-muted">
              We'll never share your username with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {/* alert is only visible when login fail state is set to true */}
          <Alert className={ loginFail ? styles.loginFailAlertVisible : styles.loginFailAlert} variant="danger">
            Incorrect username or password
          </Alert>
        </Form>
      </Container>
    </>
  )
}