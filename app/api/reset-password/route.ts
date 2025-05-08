import { db } from '@/db';
import { forgotPasswordCode, SelectForgotPasswordCode, users } from '@/db/schema';
import { resetPasswordSchema } from '@/shared/lib/zod';
import { hashSync } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const code = request.cookies.get('myCode')?.value;

    if (!code) {
      throw new Error('code not found');
    }

    const { password, confirmPassword } = await request.json();

    const validatedFields = resetPasswordSchema.safeParse({
      password: password,
      confirmPassword,
    });

    if (!validatedFields.success) {
      return NextResponse.json({ errors: validatedFields.error.flatten().fieldErrors });
    }

    const findCode: SelectForgotPasswordCode | undefined =
      await db.query.forgotPasswordCode.findFirst({
        where: (forgotPasswordCode, { eq }) => eq(forgotPasswordCode.code, String(code)),
      });

    if (!findCode) {
      throw new Error('not found code');
    }

    await db
      .update(users)
      .set({ password: hashSync(validatedFields.data.password, 10) })
      .where(eq(users.id, findCode.userId));

    await db.delete(forgotPasswordCode).where(eq(forgotPasswordCode.id, findCode.id));

    const response = NextResponse.json({ changedPassword: true });

    response.cookies.delete('myCode');

    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ messageError: 'Что то пошло не так! Попробуйте позже!' });
  }
}
