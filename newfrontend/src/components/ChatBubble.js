import React from "react";
import { format } from "timeago.js";
import Image from "next/image";

const ChatComponent = ({ message, own }) => {
  return (
    <div className=" rounded-lg overflow-hidden m-4">

      <div className="flex-grow px-8 pt-8 text-left text-gray-700">

        {own ? (
            <div className="relative mb-6 text-left">
            <div className="text-gray-700">
              <div className="absolute inset-x-0 top-0">
                <Image src="/chatuser.svg" alt="" className="float-right inline-block h-6 w-6 sm:h-12 sm:w-12 rounded-full" height={35} width={35}/>
              </div>
              <div className="relative float-right mr-8 sm:mr-16 inline-block rounded-md bg-blue-700 py-3 px-4 text-white">
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
            <div className="clear-both flex text-gray-700"></div>
          </div>
        ) : (
            <div className="relative mb-6 text-left">
          <div className="text-gray-700">
            <div className="absolute top-0 left-0">
            <Image src="/chatuser.svg" alt="" className="float-right inline-block h-6 w-6 sm:h-12 sm:w-12 rounded-full" height={35} width={35}/>
            </div>
            <div className="relative float-left ml-8 sm:ml-16 inline-block rounded-md bg-gray-200 py-3 px-4">
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
          <div className="clear-both flex text-gray-700"></div>
        </div>
        )}

        


        
      </div>
    </div>
  );
};

export default ChatComponent;
