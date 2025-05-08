import React from 'react';
import Image from 'next/image';

export const Decor: React.FC = () => {
  return (
    <div className="decor">
      <div className="container">
        <Image className="cloud" width={1600} height={115} src="/cloud.png" alt="cloud" />
        <Image className="midcloud" width={1097} height={122} src="/midcloud.png" alt="mid cloud" />
      </div>
    </div>
  );
};
