import React, { useState } from "react";

export const withHover = (Component: React.FC<any>) => (props: any) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      <Component {...props} hover={hover} />
    </div>
  );
};
