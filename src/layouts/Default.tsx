import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
type LayoutProps = { children: ReactNode };

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>
        <Header />

        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
