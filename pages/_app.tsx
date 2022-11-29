import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider, useCart } from "react-use-cart";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    )
}
