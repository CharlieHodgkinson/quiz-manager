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

  const [loginFail, setLoginFail] = useState(false);

  const handlePostLoginOk = () => {
    if (router.query) {
      router.push("/");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      "username": e.target.elements["username"].value,
      "password": e.target.elements["password"].value
    };
    
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseBody = await response.json();

    if (response.status == 200) {
      cookie.set("user", responseBody.SESSIONID, { expires: 1 / 24 })
      cookie.set("permission", responseBody.permission, { expires: 1 / 24 })
      
      handlePostLoginOk();
    }
    else {
      setLoginFail(true);
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
          <Alert className={ loginFail ? styles.loginFailAlertVisible : styles.loginFailAlert} variant="danger">
            Incorrect username or password
          </Alert>
        </Form>
      </Container>
    </>
  )
}