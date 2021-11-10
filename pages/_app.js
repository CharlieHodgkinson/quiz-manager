import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'
import Navigation from '../components/navigation'
import { useRouter } from "next/router";
import { useEffect } from "react";
import cookie from "js-cookie";

//this function wraps all other pages, so will be ran every time a page loads/ reloads
export default function App({ Component, pageProps }) {
  const user = cookie.get("user") //this gets the cookie named 'user'
  const router = useRouter();

  useEffect(() => { // this is a react hook that will run after the page is rendered
    if (!user && router.pathname != "/login") { // if the user cookie hasn't been set (aka the user isnt logged in) and if the page isn't login (prevnts infinite loop)
      router.push("/login"); // redirect the user to the login page
    }
  });

  if (!user && router.pathname != "/login") { // same check as line 14
    return <h1>Redirecting...</h1>; // displays some content to tell the user that something is happening - ux principle
  }

  return ( // return the page app is wrapping
    <>
      <Navigation></Navigation>
      <Component {...pageProps} />
    </>
  )
}
