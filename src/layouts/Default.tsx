import { ReactNode } from 'react';

type LayoutProps = { children: ReactNode };

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
