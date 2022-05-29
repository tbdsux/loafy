import { ReactNode } from 'react';
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
