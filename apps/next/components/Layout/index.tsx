import { useRouter } from 'next/router';
import { SiteFooter, SiteHeader } from '@/components';
import { useTheme } from '@/providers';

type props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout({ children }: props) {
  const router = useRouter();
  const { theme } = useTheme();
  const exlcudeFoooter = [''];
  const isFooterHidden = exlcudeFoooter.includes(router.pathname);

  return (
    <>
      <SiteHeader />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className={`${theme} app`}>{children}</div>
        </div>
      </div>
      {!isFooterHidden && <SiteFooter />}
    </>
  );
}
