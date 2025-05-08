import { Decor, Header } from '@/shared/components';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Decor />
        {children}
      </div>
    </>
  );
}
