import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import '../styles/tailwind.css';

export default function CryptoPups({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress height={2} color="#454ADE" />

      <Component {...pageProps} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="text-sm"
      />
    </>
  );
}
