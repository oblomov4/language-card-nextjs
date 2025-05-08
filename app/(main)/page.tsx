import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Главная',
};

export default async function Home() {
  return (
    <>
      <h2 className="title">Language Card</h2>
      <p className="descr">Записывай, повторяй и изучай новые слова вместе с Language Card!</p>
    </>
  );
}
