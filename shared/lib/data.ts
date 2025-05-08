type headerLinkType = {
  id: number;
  title: string;
  href: string;
  cssSelector: string;
};

type queryTestDataType = {
  id: number;
  value: string;
  text: string;
};

export const queryTestData: ReadonlyArray<queryTestDataType> = [
  { id: 0, value: '10', text: '10 Случайных карт' },
  { id: 1, value: '20', text: '20 Случайных карт' },
  { id: 2, value: '30', text: '30 Случайных карт' },
  { id: 3, value: '10last', text: '10 Последних карт' },
  { id: 4, value: '20last', text: '20 Последних карт' },
  { id: 5, value: '30last', text: '30 Последних карт' },
  { id: 6, value: 'all', text: 'Все слова в случайном порядке' },
];

export const headerLink: ReadonlyArray<headerLinkType> = [
  { id: 0, title: 'Главная', href: '/', cssSelector: 'header__bottom-a main' },
  { id: 1, title: 'Добавить слово', href: '/card-add', cssSelector: 'header__bottom-a card-add' },
  { id: 3, title: 'Просмотр Слов', href: '/card-look', cssSelector: 'header__bottom-a card-look' },
  { id: 4, title: 'Тестирование', href: '/testing', cssSelector: 'header__bottom-a card-testing' },
  {
    id: 5,
    title: 'Повтор слов',
    href: '/card-repeat',
    cssSelector: 'header__bottom-a card-repeat',
  },
  { id: 6, title: 'Профиль', href: '/profile', cssSelector: 'header__bottom-a user-profile' },
];
