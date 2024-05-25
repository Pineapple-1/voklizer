import React from "react";

import UserHomeLayout from "../../layout/UserHomeLayout";
import { useHistory } from "react-router-dom";

function PitchSuccess() {
  const history = useHistory();

  return (
    <UserHomeLayout>
      <div className="flex flex-col justify-end gap-5 grow items-center">
        <div className="flex flex-col gap-5 ml-4">
          <div>
            <img
              src="/pitch-sent.svg"
              className="w-[131px] h-[131px] m-auto"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-5 text-[#030303] ml-4">
            <div className=" text-xl  w-24 ">Sit tight, Pitch has been sent</div>
            <div className=" text-xs">you shall be notified soon</div>
          </div>
        </div>


      </div>
    </UserHomeLayout>
  );
}

export default PitchSuccess;
