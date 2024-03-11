import "@/styles/globals.css";
import { Provider } from "react-redux";
import { useRef, useEffect } from "react";
import store from "@/redux/store";
import Router, { useRouter } from "next/router";
import nProgress from "nprogress";
import "../styles/nprogress.css";
import '@/styles/app.css';
import Head from "next/head";
import Init from "@/components/Init";
import Navbar from "@/components/Navbar";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
const _app = ({ Component, pageProps }) => {

  const router = useRouter();

  const scrollRef = useRef();
  const mainRef = useRef();
  const routeRef = useRef();
  const appRef = useRef();

  useEffect(() => {
    if (router.isReady) {
      scrollRef.current.scrollTop = 0;
      mainRef.current.scrollTop = 0;
      routeRef.current.scrollTop = 0;
      appRef.current.scrollTop = 0;
    }
  }, [router.isReady, router.query]);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Provider store={store}>

        <ToastContainer className="toastStyle" newestOnTop="true" transition={Slide} pauseOnFocusLoss="false" theme='dark' />
        <div className="App" ref={appRef}>

          <div className='main' ref={mainRef}>
            <Navbar />
            <div className='routeComponent' ref={routeRef}>
              <div className='video' ref={scrollRef}>

                <Component {...pageProps} />
              </div>
            </div>
            <Init />
          </div>

        </div>
      </Provider>
    </>
  );
}


export default _app;
