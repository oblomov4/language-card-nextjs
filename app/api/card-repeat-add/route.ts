import { auth } from '@/auth';
import { db } from '@/db';
import { repeatCards, SelectCard, SelectRepeatCard } from '@/db/schema';
import { NextResponse } from 'next/server';

export const POST = auth(async function POST(request) {
  try {
    const session = await request.auth;

    if (!session) {
      throw new Error('not authenticated');
    }

    const res: SelectCard[] = await request.json();

    for (let i = 0; i < res.length; i++) {
      if (res[0].userId !== Number(session.user.id)) {
        throw new Error('authenticate error');
      }
    }

    for (let i = 0; i < res.length; i++) {
      const cardRepeat = {
        cardId: res[i].id,
        userId: res[i].userId,
      };

      const checkRepeatCard: SelectRepeatCard | undefined = await db.query.repeatCards.findFirst({
        where: (repeatCards, { and, eq }) =>
          and(eq(repeatCards.userId, cardRepeat.userId), eq(repeatCards.cardId, cardRepeat.cardId)),
      });
      if (!checkRepeatCard) {
        await db.insert(repeatCards).values(cardRepeat);
      }
    }

    return NextResponse.json({
      success: 'Карточки добавлены коллекцию повторение',
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        err: 'Что-то пошло не так! Попробуйте позже!',
      },
      {
        status: 500,
      },
    );
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
