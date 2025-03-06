
import UserHomeLayout from "../../layout/UserHomeLayout";
import {useHistory} from "react-router-dom";

function SendSuccess() {
  const history = useHistory();

  return (
    <UserHomeLayout>
      <div className="flex flex-col justify-end gap-5 grow items-center">
        <div className="flex flex-col gap-5 ml-4">
          <div>
            <img
              src="/sent.svg"
              className="w-[131px] h-[131px] m-auto"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-5 text-[#030303] ml-4 ">
            <div className=" text-[20px] leading-[25px] text-center w-[230px] break-words">Sit tight, your message has
              been sent
            </div>

            <div className=" text-[13px] leading-[16px] mt-[80px] text-center text-purple">you shall be notified soon
            </div>
          </div>
        </div>
      </div>
    </UserHomeLayout>
  );
}

export default SendSuccess;
