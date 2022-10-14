// import App from 'next/app'
import { isMobile } from "react-device-detect";

import '../styles/base/_styles.scss'

interface MyAppProps {
  Component:any,
  pageProps: any
}

console.log({isMobile})

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
  <div className={isMobile ? 'mobile' : 'desktop'}>
<Component {...pageProps} />
</div>
  )}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
