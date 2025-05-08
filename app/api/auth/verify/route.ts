import { db } from '@/db';
import { SelectVerificationCode, users, verificationCode } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    const verificationCodeFind: SelectVerificationCode | undefined =
      await db.query.verificationCode.findFirst({
        where: (verificationCode, { eq }) => eq(verificationCode.code, code),
      });

    if (!verificationCodeFind) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    await db
      .update(users)
      .set({
        verified: new Date().toISOString(),
      })
      .where(eq(users.id, verificationCodeFind.userId));

    await db.delete(verificationCode).where(eq(verificationCode.id, verificationCodeFind.id));

    return NextResponse.redirect(new URL('/verified', request.url));
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Что-то пошло не так!' }, { status: 500 });
  }
}
