import type { AppProps } from "next/app";
import { Circles, CustomCursor, Layout } from "@/components";
import { ConfigProvider } from "@/providers";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import CircleText from "@/components/CircleText";
import Magnet from "@/components/Magnet";
import "@/styles/globals.scss";

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
  );
}
