import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { LanguageProvider } from '../contexts/LanguageContext';
import '../styles/globals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <LanguageProvider>
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            background: url('https://cdn.jsdelivr.net/gh/czy13724/czy13724.github.io@master/img/bg/image_16.jpg') center/cover fixed no-repeat;
          }
        `}</style>
      </LanguageProvider>
    </SessionProvider>
  );
}
