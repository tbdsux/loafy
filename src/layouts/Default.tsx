import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
type LayoutProps = { children: ReactNode };

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>
        <Header />

        {children}

        <Footer />
      </main>
    </>
  );
};

export default DefaultLayout;
