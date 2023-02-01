import { Layout } from '../components/Layout';
import "../styles/base/_styles.scss";
import { atom, PrimitiveAtom } from "jotai";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {wrapper} from '../store';
import { IQuant } from "ui";

const activeChainId = ChainId.Mainnet;

/// <reference types="react-scripts" />
import { ExternalProvider } from "@ethersproject/providers";

interface Ethereum extends ExternalProvider {
  selectedAddress: string;
}


interface MyAppProps {
  Component: any;
  pageProps: any;
}

interface QuantAtom extends PrimitiveAtom<IQuant> {
  read: () => IQuant;
}

function MyApp({ Component, ...rest }: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const {  pageProps } = props;
  const quantAtoms = atom<QuantAtom[]>([]);

  return (
    <Provider store={store}>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Layout >
            <Component {...pageProps} quantAtoms={quantAtoms} />
          </Layout>
        </LocalizationProvider>
      </ThirdwebProvider>
    </Provider>
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

