import { auth } from '@/auth';
import { db } from '@/db';
import { cards, SelectCard } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const POST = auth(async function POST(request) {
  try {
    const session = await request.auth;

    if (!session) {
      throw new Error('not authenticated');
    }

    const res = (await request.json()) as { id: number };

    const checkCard: SelectCard | undefined = await db.query.cards.findFirst({
      where: (cards, { and, eq }) =>
        and(eq(cards.userId, Number(session.user.id)), eq(cards.id, res.id)),
    });

    if (!checkCard) {
      throw new Error('card not found');
    }

    await db.delete(cards).where(eq(cards.id, res.id));
    return NextResponse.json({
      success: 'Карточка удалена из вашей коллекции!',
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
