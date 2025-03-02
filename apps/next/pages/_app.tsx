import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Circles, CustomCursor, Layout } from "@/components";
import { ConfigProvider, ThemeProvider } from "@/providers";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { Flip } from "gsap/dist/Flip";
import CircleText from "@/components/CircleText";
import "@/styles/globals.scss";
import Magnet from "@/components/Magnet";

gsap.registerPlugin(Flip);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
        <AnimatePresence mode="wait">
          <Layout>
            <Component key={router.route} {...pageProps} />
            <Magnet padding={50} disabled={false} magnetStrength={2}>
              <CircleText />
            </Magnet>
          </Layout>
        </AnimatePresence>

        {/* <Component {...pageProps} /> */}
        {/* <CustomCursor /> */}
        {/* <Circles /> */}
      </ConfigProvider>
    </ThemeProvider>
  );
}
