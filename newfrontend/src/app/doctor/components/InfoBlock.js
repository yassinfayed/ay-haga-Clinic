import React from "react";
const InfoBlock = ({ Icon, title, detail }) => (
  <div className="text-white mb-4">
    <div className="flex items-center">
      <Icon className="h-2 w-2 mr-2 " />
      <div className="text-lg opacity-75 my-3 mx-2">{title}</div>
    </div>
    <div>{detail}</div>
  </div>
);

export default InfoBlock;
