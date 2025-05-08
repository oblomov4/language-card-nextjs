'use client';
import React from 'react';
import Link from 'next/link';
import { headerLink } from '../lib/data';
import { usePathname } from 'next/navigation';

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const [activeBurger, setActiveBurger] = React.useState<boolean>(false);
  let activeLink = '';

  if (pathname === '/') {
    activeLink = ' main';
  } else if (pathname === '/card-add') {
    activeLink = ' card-add';
  } else if (pathname === '/card-look') {
    activeLink = ' card-look';
  } else if (pathname === '/testing') {
    activeLink = ' card-testing';
  } else if (pathname === '/card-repeat') {
    activeLink = ' card-repeat';
  } else if (pathname === '/profile') {
    activeLink = ' user-profile';
  }

  function clickBurger(): void {
    setActiveBurger(!activeBurger);
  }

  function resetActiveBurger(): void {
    if (activeBurger) {
      setActiveBurger(false);
    }
  }

  const cssSelector = activeBurger ? ' tests' : '';

  return (
    <div>
      <nav className={activeBurger ? 'nav nav-active' : 'nav'}>
        <button className="nav__btn" onClick={clickBurger}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div>
          <ul className={'header__bottom-ul' + cssSelector + activeLink}>
            {headerLink.map((item) => {
              return (
                <li key={item.id} className="header__bottom-li" onClick={resetActiveBurger}>
                  <Link href={item.href} className={item.cssSelector}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};
