import type { AppProps } from "next/app";
import { Circles, Layout, SiteHeader } from "@/components";
import { Provider, ThemeProvider } from "@/providers";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Provider>
        <SiteHeader />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Circles />
      </Provider>
    </ThemeProvider>
  );
}
