import { useRouter } from "next/router";
import { SiteHeader } from "@/components";

type props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout({ children }: props) {
  const router = useRouter();
  const exlcudeFoooter = [""];
  // const isFooterHidden = exlcudeFoooter.includes(router.pathname);

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <SiteHeader />
          <div className={`app`}>{children}</div>
          {/* {!isFooterHidden && <SiteFooter />} */}
        </div>
      </div>
    </>
  );
}
