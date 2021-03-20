import "../styles/globals.css";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import fetcher from "@lib/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SWRConfig value={{ fetcher, onError: (err) => console.error(err) }}>
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
