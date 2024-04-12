import type { AppProps } from "next/app";
import { Circles, Layout, SiteHeader } from "@/components";
import { ConfigProvider, ThemeProvider } from "@/providers";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <SiteHeader />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Circles />
      </ConfigProvider>
    </ThemeProvider>
  );
}
