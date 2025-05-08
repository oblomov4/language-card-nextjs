import React from 'react';

interface Props {
  width?: number;
}

export const LoadingContent: React.FC<Props> = (props) => {
  return (
    <div className="container">
      <div className="loading-conent">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
          <circle fill="#C4A2E2" stroke="#C4A2E2" strokeWidth={15} r={15} cx={40} cy={100}>
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur={2}
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin={-0.4}
            />
          </circle>
          <circle fill="#C4A2E2" stroke="#C4A2E2" strokeWidth={15} r={15} cx={100} cy={100}>
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur={2}
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin={-0.2}
            />
          </circle>
          <circle fill="#C4A2E2" stroke="#C4A2E2" strokeWidth={15} r={15} cx={160} cy={100}>
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur={2}
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin={0}
            />
          </circle>
        </svg>
      </div>
    </div>
  );
};
