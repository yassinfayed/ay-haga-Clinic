import React from "react";
import { Dna } from "react-loader-spinner";

const Spinner = ({ }) => {
  return (
    <div className="w-100 text-center">
      <Dna
        visible={true}
        height="120"
        width="120"
        ariaLabel="dna-loading"
        wrapperStyle={{
          margin: "auto",
          // position: "absolute",
          // bottom: "55vh",
          // left: "100vh",
        }}
        wrapperClass="dna-wrapper primary"
      />
    </div>
  );
};

export default Spinner;
