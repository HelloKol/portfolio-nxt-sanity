import type { AppProps } from "next/app";
import { Layout } from "@/components";
import { ConfigProvider } from "@/providers";
import CircleText from "@/components/CircleText";
import Magnet from "@/components/Magnet";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Layout>
        <Component {...pageProps} />
        <Magnet padding={50} disabled={false} magnetStrength={2}>
          <CircleText />
        </Magnet>
      </Layout>
    </ConfigProvider>
  );
}
