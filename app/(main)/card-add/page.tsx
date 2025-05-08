import { auth } from '@/auth';
import { CardAddForm } from '@/shared/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Добавить карточку',
};

export default async function CardAddPage() {
  const session = await auth();

  if (!session) {
    return <h2 className="title">Требуется войти в аккаунт!</h2>;
  }

  return (
    <div className="container">
      <h2 className="title">Добавить Карточку</h2>
      <div className="card">
        <CardAddForm />
      </div>
    </div>
  );
}
