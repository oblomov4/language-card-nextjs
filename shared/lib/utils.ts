// import { ServerResponse } from './difinitions';

import { SelectCard } from '@/db/schema';

type QueryApiObj = {
  id: number;
};

type CodeType = {
  code: string;
};

type ResetPasswordType = {
  password: string;
  confirmPassword: string;
};

export function convertDate(string: string): string {
  const newString = string.split(' ');
  return newString[0].split('-').reverse().join('-');
}

export async function queryApi(
  url: string,
  obj: QueryApiObj | SelectCard[] | CodeType | ResetPasswordType,
) {
  const post = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(obj),
  });

  const res = await post.json();

  return res;
}

export function getUserCountCard(string: string): number {
  if (string === '10last') {
    return 10;
  } else if (string === '20last') {
    return 20;
  } else if (string === '30last') {
    return 30;
  } else if (string === 'all') {
    return 1;
  } else {
    return Number(string);
  }
}

export function isValidLanguage(string: string): boolean {
  const validArray: string[] = ['eng', 'ru'];

  return validArray.indexOf(string) != -1;
}

export function shuffle(array: SelectCard[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
}
