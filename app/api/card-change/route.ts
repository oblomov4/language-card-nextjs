import { auth } from '@/auth';
import { db } from '@/db';
import { cards, SelectCard } from '@/db/schema';
import { newCardUserType } from '@/shared/lib/difinitions';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const POST = auth(async function POST(request) {
  try {
    const session = await request.auth;

    if (!session) {
      throw new Error('not authenticated');
    }

    const res = (await request.json()) as {
      id: number;
      wordOne: string;
      wordClue: string;
      wordTwo: string;
    };

    const { wordOne, wordClue, wordTwo, id } = res;

    const checkCard: SelectCard | undefined = await db.query.cards.findFirst({
      where: (cards, { and, eq }) =>
        and(eq(cards.userId, Number(session.user.id)), eq(cards.id, res.id)),
    });

    if (!checkCard) {
      throw new Error('card not found');
    }

    const newCardUser: newCardUserType = {};

    if (wordOne != '') {
      const checkCard: SelectCard | undefined = await db.query.cards.findFirst({
        where: (cards, { and, eq }) =>
          and(eq(cards.userId, Number(session.user.id)), eq(cards.wordOne, wordOne)),
      });

      if (checkCard) {
        return NextResponse.json({
          err: 'В вашей колеекции уже eсть такое слово!',
        });
      }

      newCardUser.wordOne = wordOne;
    }

    if (wordClue != '') {
      newCardUser.wordClue = wordClue;
    }

    if (wordTwo != '') {
      newCardUser.wordTwo = wordTwo;
    }

    await db
      .update(cards)
      .set(newCardUser)
      .where(and(eq(cards.id, id), eq(cards.userId, Number(session.user.id))));

    return NextResponse.json({
      success: 'Ваша коллеция карт изменена!',
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
