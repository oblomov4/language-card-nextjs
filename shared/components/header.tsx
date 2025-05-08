import React from 'react';
import Link from 'next/link';
import { Nav } from './nav';
import { auth } from '@/auth';

export const Header: React.FC = async () => {
  const session = await auth();

  return (
    <header className="header">
      {!session && (
        <div className="header__top">
          <div className="container">
            <div className="header__top-box">
              <ul className="header__top-ul">
                <li className="header__top-li">
                  <Link className="header__top-a header__top-a--enter" href="/login">
                    Войти
                  </Link>
                </li>
                <li className="header__top-li">
                  <Link className="header__top-a" href="/register">
                    Регистация
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="header__bottom">
        <div className="container">
          <div className="header__bottom-box">
            <Link href="/">
              <h4 className="logo">Language Card</h4>
            </Link>
            <Nav />
          </div>
        </div>
      </div>
    </header>
  );
};
