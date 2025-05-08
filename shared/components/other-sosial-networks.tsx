'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export const OtherSosialNetworks: React.FC = () => {
  return (
    <div className="other-social-networks">
      <button
        className="other-social-networks__button"
        onClick={() => signIn('google', { redirectTo: '/' })}>
        <Image src="/google-logo.png" width={30} height={30} alt="google" />
        Google
      </button>
      <button
        className="other-social-networks__button"
        onClick={() => signIn('github', { redirectTo: '/' })}>
        <Image width={30} height={30} alt="github" src="/github-logo.png" />
        Github
      </button>
    </div>
  );
};
