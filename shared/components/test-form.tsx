'use client';
import React from 'react';
import { queryTestData } from '../lib/data';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type QueryTestType = {
  cardCount: string;
  cardLanguage: string;
};

export const TestForm: React.FC = () => {
  const pathname = usePathname();

  const { replace } = useRouter();
  
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const searchParams = useSearchParams();

  const [queryTest, setQueryTest] = React.useState<QueryTestType>({
    cardCount: '10',
    cardLanguage: 'eng',
  });

  function getTesting(event: React.FormEvent<EventTarget>): void {
    event.preventDefault();

    setIsDisabled(true);

    const url = new URLSearchParams(queryTest);

    replace(`${pathname}?${url.toString()}`);
  }

  React.useEffect(() => {
    if (searchParams.size === 0) {
      setIsDisabled(false);
    }
  }, [searchParams]);

  return (
    <form className="testing">
      <select
        className="testing__select"
        disabled={isDisabled}
        name="cardCount"
        id=""
        onChange={(e) =>
          setQueryTest({
            ...queryTest,
            cardCount: e.target.value,
          })
        }>
        {queryTestData.map((item) => (
          <option className="testing__select-option" value={item.value} key={item.id}>
            {item.text}
          </option>
        ))}
      </select>
      <select
        disabled={isDisabled}
        className="testing__select"
        name="cardLanguage"
        id=""
        onChange={(e) =>
          setQueryTest({
            ...queryTest,
            cardLanguage: e.target.value,
          })
        }>
        <option className="testing__select-option" value="eng">
          С английского на русский
        </option>
        <option className="testing__select-option" value="ru">
          С русского на английский
        </option>
      </select>
      <button
        className="testing__btn"
        type="submit"
        onClick={(e) => getTesting(e)}
        disabled={isDisabled}>
        Тестирование
      </button>
    </form>
  );
};
