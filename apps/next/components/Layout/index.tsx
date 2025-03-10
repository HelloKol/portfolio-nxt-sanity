import { SiteHeader } from "@/components";
import ContactSection from "../ContactSection";

type props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout({ children }: props) {
  return (
    <>
      <SiteHeader />
      <div className={`app`}>
        {children}
        <ContactSection />
      </div>
    </>
  );
}
