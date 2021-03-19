import "../styles/globals.css";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "hooks/useAuth";
import { SWRConfig } from "swr";
import fetcher from "@lib/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SWRConfig
        value={{ fetcher: fetcher, onError: (err) => console.error(err) }}
      >
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
