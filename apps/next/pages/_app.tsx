import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Circles, CustomCursor, Layout } from "@/components";
import { ConfigProvider, ThemeProvider } from "@/providers";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   let smoother: ScrollSmoother | null = null;

  //   if (typeof window !== "undefined") {
  //     smoother = ScrollSmoother.create({
  //       wrapper: "#smooth-wrapper",
  //       content: "#smooth-content",
  //       smooth: 1.5,
  //       effects: true,
  //       smoothTouch: 0.1,
  //     });
  //   }

  //   return () => {
  //     if (smoother) smoother.kill();
  //   };
  // }, []);

  return (
    <ThemeProvider>
      <ConfigProvider>
        <Layout>
          <Component {...pageProps} />
          {/* <CustomCursor /> */}
        </Layout>
        {/* <Circles /> */}
      </ConfigProvider>
    </ThemeProvider>
  );
}
