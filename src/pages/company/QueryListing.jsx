import React from "react";
import Base from "../../layout/Base";

import Pitch from "./components/Pitch";

function QueryListing() {
  return (
    <Base>
      <div className="flex flex-col gap-6">
        <Pitch location={"Lahore"} area={"Medical"} focus />
        <Pitch location={"Islamabad"} area={"Property"} />
        <Pitch location={"Karachi"} area={"Defamation"} />
        <Pitch location={"Peshawar"} area={"Immigration"} />
      </div>
    </Base>
  );
}

export default QueryListing;
