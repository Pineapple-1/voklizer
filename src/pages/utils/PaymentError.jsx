
import { useHistory } from "react-router-dom";
import UserHomeLayout from "../../layout/UserHomeLayout";
import Goback from "../../assets/icons/Goback";
import PayementError from "../../assets/icons/PayementError";

function PaymentError() {
  const history = useHistory();
  return (
    <UserHomeLayout>
      <div className="h-full flex flex-col items-center justify-end px-4 bg-gray-100">
        <div className="flex flex-col items-center  justify-between h-full">
          <div />
          <div />
          <div className="flex flex-col gap-4 items-center">
            <PayementError />
            <div>
              <div className="text-[20px]">Payment</div>
              <div className="text-[20px]">Error!</div>
            </div>
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => {
              history.go(-1);
            }}
          >
            <Goback />
            <div>
            <div className="text-sm">Go Back &</div>
            <div className="text-sm">Restart</div>
            </div>
          </div>
        </div>
      </div>
    </UserHomeLayout>
  );
}

export default PaymentError;
