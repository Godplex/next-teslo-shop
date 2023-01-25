import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import { robotoFont } from '../src/fonts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../src/themes';
import { SWRConfig } from 'swr';
import { UIProvider, CartProvider, AuthProvider } from '../src/context';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import '../src/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <div className={robotoFont.className}>
                    <Component {...pageProps} />
                  </div>
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
