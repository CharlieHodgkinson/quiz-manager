import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import styles from './navigation.module.css'
import utilStyles from '../styles/utils.module.css'
import cookie from "js-cookie";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();

  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Brand className={utilStyles.mainText} href="/">
          <img
            alt=""
            src="/images/webbiskoolsLogo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        WebbiSkools Ltd
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Button className={styles.logout} onClick={() => {
            cookie.remove("user"); //remove the cookie
            router.push("/login"); //redirect the user to the login page
          }}
          >Logout</Button>{' '}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}