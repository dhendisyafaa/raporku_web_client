import React from "react";

const CardFeature = ({ icon, header, content }) => {
  return (
    <div className="bg-orange/10 p-8 space-y-4 w-full rounded hover:shadow-md hover:shadow-orange/40 duration-150">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange/20 rounded text-orange">{icon}</div>
        <p className="text-navy font-semibold text-lg">{header}</p>
      </div>
      <p className=" text-grey leading-snug">{content}</p>
    </div>
  );
};

export default CardFeature;
