import type { AppProps } from "next/app";
import { Circles, Layout } from "@/components";
import { ConfigProvider, ThemeProvider } from "@/providers";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Circles />
      </ConfigProvider>
    </ThemeProvider>
  );
}
