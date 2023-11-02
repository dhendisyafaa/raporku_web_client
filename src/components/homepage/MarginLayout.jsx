import React from "react";

const MarginLayout = ({ children, width = "w-[90%]" }) => {
  return <div className={`${width} m-auto`}>{children}</div>;
};

export default MarginLayout;
