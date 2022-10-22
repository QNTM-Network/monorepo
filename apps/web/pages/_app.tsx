import { WagmiConfig} from 'wagmi'

import { store } from '../store';
import { Layout } from '../components/Layout';
import { Provider } from 'react-redux';
import { client  } from '../utils/wagmiConfiguration'
import "../styles/base/_styles.scss";

interface MyAppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <WagmiConfig client={client}>
    <Provider store={store}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </WagmiConfig>
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
