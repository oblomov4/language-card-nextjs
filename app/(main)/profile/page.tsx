import { auth, signOut } from '@/auth';
import { db } from '@/db';
import { cards, repeatCards } from '@/db/schema';
import { convertDate } from '@/shared/lib/utils';
import { eq } from 'drizzle-orm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Профиль',
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    return <h2 className="title">Требуется войти в аккаунт!</h2>;
  }

  const countWord: number = await db.$count(cards, eq(cards.userId, Number(session.user.id)));
  const countWordRepat: number = await db.$count(
    repeatCards,
    eq(repeatCards.userId, Number(session.user.id)),
  );

  const date = convertDate(session.user.date);

  return (
    <div className="container">
      <h2 className="title">Профиль</h2>
      <div className="profile">
        <ul className="profile__ul">
          <li className="profile__ul-li">Имя</li>
          <li className="profile__ul-li">Email</li>
          <li className="profile__ul-li">Слов изучено</li>
          <li className="profile__ul-li">Слов на повторение</li>
          <li className="profile__ul-li">Дата регистрации</li>
        </ul>

        <ul className="profile__ul">
          <li className="profile__ul-li">{session.user.name}</li>
          <li className="profile__ul-li">{session.user.email}</li>
          <li className="profile__ul-li">{countWord}</li>
          <li className="profile__ul-li">{countWordRepat}</li>
          <li className="profile__ul-li">{date}</li>
        </ul>
      </div>
      <form
        className="logout"
        action={async () => {
          'use server';
          await signOut({
            redirectTo: '/',
          });
        }}>
        <button className="logout__btn" type="submit">
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}
