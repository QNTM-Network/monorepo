import { store } from '../store';
import { Layout } from '../components/Layout';
import "../styles/base/_styles.scss";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

/// <reference types="react-scripts" />
import { ExternalProvider } from "@ethersproject/providers";

interface Ethereum extends ExternalProvider {
  selectedAddress: string;
}


declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}

interface MyAppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Provider store={store}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </LocalizationProvider>
  );
}

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

export default MyApp;
