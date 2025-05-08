import React from 'react';

interface Props {
  width?: number;
}

export const LoadingResetPassword: React.FC<Props> = (props) => {
  return (
    <div className="loading-content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
        <rect fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={15} width={30} height={30} x={25} y={50}>
          <animate
            attributeName="y"
            calcMode="spline"
            dur={2}
            values="50;120;50;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin={-0.4}
          />
        </rect>
        <rect fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={15} width={30} height={30} x={85} y={50}>
          <animate
            attributeName="y"
            calcMode="spline"
            dur={2}
            values="50;120;50;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin={-0.2}
          />
        </rect>
        <rect
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth={15}
          width={30}
          height={30}
          x={145}
          y={50}>
          <animate
            attributeName="y"
            calcMode="spline"
            dur={2}
            values="50;120;50;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin={0}
          />
        </rect>
      </svg>
    </div>
  );
};
