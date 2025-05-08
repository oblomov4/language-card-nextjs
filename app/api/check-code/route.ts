import { db } from '@/db';
import { SelectForgotPasswordCode } from '@/db/schema';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    const checkCodeReset: SelectForgotPasswordCode | undefined =
      await db.query.forgotPasswordCode.findFirst({
        where: (forgotPasswordCode, { eq }) => eq(forgotPasswordCode.code, code),
      });

    if (!checkCodeReset) {
      return NextResponse.json({
        error: 'Неверный код!',
        success: false,
      });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set('myCode', code);

    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: 'Что-то пошло не так! Попробуйте позже',
    });
  }
}
