import { ReactNode } from 'react';
import { store } from '../configureStore';
import { Layout } from '../components/Layout';
import { Provider } from 'react-redux';
import "../styles/base/_styles.scss";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PersistGate as PersistGateClient } from 'redux-persist/integration/react';
import { persistor } from '../configureStore';

/// <reference types="react-scripts" />
import { ExternalProvider } from "@ethersproject/providers";

interface Ethereum extends ExternalProvider {
  selectedAddress: string;
}

const PersistGate = PersistGateClient as any;

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}

interface MyAppProps {
  Component: any;
  pageProps: any;
}


const PersistGateServer = ({ children }: { children: ReactNode }) => children;

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
