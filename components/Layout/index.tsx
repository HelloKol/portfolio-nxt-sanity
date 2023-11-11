import { useRouter } from "next/router";
import { SiteFooter } from "..";
import { useTheme } from "@/providers";

type props = {
  children: any;
};

export default function Layout({ children }: props) {
  const router = useRouter();
  const { theme } = useTheme();
  const exlcudeFoooter = [""];
  const isFooterHidden = exlcudeFoooter.includes(router.pathname);

  return (
    <div className={`${theme} app`}>
      {children}
      {!isFooterHidden && <SiteFooter />}
    </div>
  );
}
