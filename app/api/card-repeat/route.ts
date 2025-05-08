import { auth } from '@/auth';
import { db } from '@/db';
import { repeatCards } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const POST = auth(async function POST(request) {
  try {
    const session = await request.auth;

    if (!session) {
      throw new Error('not authenticated');
    }

    const res = await request.json();

    const findRepeatCard = await db.query.repeatCards.findFirst({
      where: (repeatCards, { eq, and }) =>
        and(eq(repeatCards.userId, Number(session.user.id)), eq(repeatCards.cardId, res.id)),
    });

    if (!findRepeatCard) {
      throw new Error('card not found');
    }

    if (findRepeatCard.count > 1) {
      findRepeatCard.count -= 1;
      await db
        .update(repeatCards)
        .set(findRepeatCard)
        .where(
          and(
            eq(repeatCards.userId, Number(session.user.id)),
            eq(repeatCards.cardId, findRepeatCard.cardId),
          ),
        );

      return NextResponse.json({
        success: `${findRepeatCard.count}`,
      });
    } else {
      await db
        .delete(repeatCards)
        .where(
          and(
            eq(repeatCards.userId, Number(session.user.id)),
            eq(repeatCards.cardId, findRepeatCard.cardId),
          ),
        );

      return NextResponse.json({
        success: `Карта удалена из этой коллекции`,
      });
    }
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
