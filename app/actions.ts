'use server';

import { auth, signIn } from '@/auth';
import { db } from '@/db';
import {
  cards,
  forgotPasswordCode,
  InsertUser,
  SelectCard,
  SelectForgotPasswordCode,
  SelectUser,
  SelectVerificationCode,
  users,
  verificationCode,
} from '@/db/schema';
import { passwordRecovery, verificationCodeSend } from '@/shared/lib/mail-send';
import { cardAddSchema, emailSchema, loginSchema, registerSchema } from '@/shared/lib/zod';
import { hashSync } from 'bcrypt';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

type RegisterUserState = {
  errors?: {
    email?: string[];
    fullName?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
};

type LoginUserState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  account?: string;
};

type CardAddState = {
  errors?: {
    wordOne?: string[];
    wordTwo?: string[];
  };
  message?: string;
  success?: string;
};

type CardType = {
  wordOne: string;
  wordClue?: string;
  wordTwo: string;
  userId: number;
};

type SendStateType = {
  errors?: {
    email?: string[];
  };
  serverSuccess?: string;
  serverError?: string;
};

export async function loginUser(
  prevState: LoginUserState,
  formData: FormData,
): Promise<LoginUserState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Неверный логин или пароль!',
          };

        case 'Verification': {
          return {
            account: 'Аккаунт не подтвержден!',
          };
        }

        default:
          return {
            message: 'Something went wrong.',
          };
      }
    }
    throw error;
  }

  return redirect('/');
}

export async function registerUser(
  prevState: RegisterUserState,
  formData: FormData,
): Promise<RegisterUserState> {
  try {
    const validatedFields = registerSchema.safeParse({
      fullName: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('password1'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const findUser: SelectUser | undefined = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedFields.data.email),
    });

    if (findUser) {
      return {
        message: 'Данный пользователь существует',
      };
    }

    const createdUser: InsertUser | SelectUser[] = await db
      .insert(users)
      .values({
        email: validatedFields.data.email,
        fullName: validatedFields.data.fullName,
        password: hashSync(validatedFields.data.password, 10),
      })
      .returning();

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await db.insert(verificationCode).values({
      userId: createdUser[0].id,
      code,
    });

    await verificationCodeSend(createdUser[0].email, code);
  } catch (err) {
    console.log(err);

    return {
      message: 'Что-то пошло не так!',
    };
  }
  return redirect('/register-success');
}

export async function cardAdd(prevState: CardAddState, formData: FormData) {
  const session = await auth();

  if (!session) {
    return {};
  }

  const validatedFields = cardAddSchema.safeParse({
    wordOne: formData.get('eng'),
    wordTwo: formData.get('ru'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const checkCard: SelectCard | undefined = await db.query.cards.findFirst({
    where: (cards, { and, eq }) =>
      and(
        eq(cards.userId, Number(session.user.id)),
        eq(cards.wordOne, validatedFields.data.wordOne.toLocaleLowerCase()),
      ),
  });

  if (checkCard) {
    return {
      message: 'Это слово есть в вашей коллекции!',
    };
  }

  const card: CardType = {
    wordOne: validatedFields.data.wordOne.toLocaleLowerCase().trim(),
    wordTwo: validatedFields.data.wordTwo.toLocaleLowerCase().trim(),
    userId: Number(session.user.id),
  };

  const clue = formData.get('clue') as string;

  if (clue !== '') {
    card.wordClue = clue.toLowerCase().trim();
  }

  await db.insert(cards).values(card);

  return {
    success: 'Карточка добавлена в вашу коллекцию!',
  };
}

export async function sendCode(
  prevState: SendStateType,
  formData: FormData,
): Promise<SendStateType> {
  try {
    const validatedFields = emailSchema.safeParse({
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const findUser: SelectUser | undefined = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedFields.data.email),
    });

    if (!findUser) {
      return {
        serverError: 'Такого пользователя не существует!',
      };
    }

    if (findUser.verified) {
      return {
        serverSuccess: 'Такой пользователь уже верифицирован!',
      };
    }

    const findCode: SelectVerificationCode | undefined = await db.query.verificationCode.findFirst({
      where: (verificationCode, { eq }) => eq(verificationCode.userId, findUser.id),
    });

    if (!findCode) {
      return {
        serverError: 'Что-то пошло не так обратитесь в службу поддержки vlad.serebrov@yandex.ru',
      };
    }

    await verificationCodeSend(validatedFields.data.email, findCode.code);

    return {
      serverSuccess:
        'На вашу почту была отправлена ссылка для подтверждения email! Не забудьте проверить папку спам! Письмо может прийти через 5-10 минут. В случае если письмо не приходит напишите в поддержку vlad.serebrov@yandex.ru',
    };
  } catch (err) {
    console.log(err);
    return {
      serverError: 'Что то пошло не так!',
    };
  }
}

export async function resetPassword(
  prevState: SendStateType,
  formData: FormData,
): Promise<SendStateType> {
  try {
    const validatedFields = emailSchema.safeParse({
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const findUser: SelectUser | undefined = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedFields.data.email),
    });

    if (!findUser) {
      return {
        serverError: 'Такого пользователя не существует!',
      };
    }

    const findCode: SelectForgotPasswordCode | undefined =
      await db.query.forgotPasswordCode.findFirst({
        where: (forgotPasswordCode, { eq }) => eq(forgotPasswordCode.userId, findUser.id),
      });

    if (!findCode) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      await db.insert(forgotPasswordCode).values({ userId: findUser.id, code });
      await passwordRecovery(findUser.email, code);
    } else {
      await passwordRecovery(findUser.email, findCode.code);
    }
  } catch (err) {
    console.log(err);
    return {
      serverError: 'Что то пошло не так!',
    };
  }

  return redirect('/reset-password-info');
}
