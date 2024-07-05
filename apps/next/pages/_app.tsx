import type { AppProps } from 'next/app';
import { use, useEffect, useState } from 'react';
import { Circles, CustomCursor, Layout } from '@/components';
import { ConfigProvider, ThemeProvider } from '@/providers';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <ThemeProvider>
      <ConfigProvider>
        <Layout>
          <Component {...pageProps} />
          <CustomCursor />
        </Layout>
        <Circles />
      </ConfigProvider>
    </ThemeProvider>
  );
}
