import React from "react";

const CardFeature = ({ icon, header, content }) => {
  return (
    <div className="bg-primary/10 p-8 space-y-4 w-full rounded hover:shadow-md hover:shadow-primary/40 duration-150">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded text-primary">{icon}</div>
        <p className="text-navy font-semibold text-lg">{header}</p>
      </div>
      <p className=" text-foreground leading-snug">{content}</p>
    </div>
  );
};

export default CardFeature;
