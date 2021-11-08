import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'
import Navigation from '../components/navigation'
import { useRouter } from "next/router";
import { useEffect } from "react";
import cookie from "js-cookie";

export default function App({ Component, pageProps }) {
  const user = cookie.get("user")
  const router = useRouter();

  useEffect(() => {
    if (!user && router.pathname != "/login") {
      router.push("/login");
    }
  });

  if (!user && router.pathname != "/login") {
    return <h1>Redirecting...</h1>;
  }

  return (
    <>
      <Navigation></Navigation>
      <Component {...pageProps} />
    </>
  )
}
