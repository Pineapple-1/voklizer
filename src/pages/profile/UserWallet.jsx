import Base from "../../layout/Base";

import useSWR from "swr";
import Loading from "../../components/Loading";

import {format} from "date-fns";

function UserWallet() {
  const {data, isLoading} = useSWR("user-payments");

  return (
    <Base>
      <div className="text-[24px] leading-[30px] text-[#020202] mx-auto">
        My Wallet
      </div>
      <div className="w-full flex flex-col gap-6 h-full mt-10">
        {!isLoading && (
          <div className="flex flex-col gap-3 flex-1 h-full justify-between mb-4">
            <div className="flex flex-col gap-3 ">
              <div className="text-base font-bold">Statment</div>
              <div className="w-full h-0.5 bg-black"/>
              <div className="flex flex-col gap-4">
                {data.data.map((item) => (
                  <div className="flex flex-col gap-3" key={item.id}>
                    <div className="flex justify-between">
                      <div className="text-base">Voice Service Charged</div>
                      <div className="text-sm">£{item.amount}</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="text-sm text-purple">
                        {format(item.createdAt, "dd/MM/yyyy")}
                      </div>
                      <div className="text-sm text-[#4d4d4d]">
                        Transection ID: {item.txid}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 sticky bottom-0 bg-[#F5F5F5] pt-4 pb-4">
              <div className="w-full h-0.5 bg-black"/>
              <div className="flex justify-between">
                <div className="text-base font-bold">Total</div>
                <div className="text-base font-bold">£{data.data.reduce((sum, item) => sum + item.amount, 0)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Loading message={"Fetching Info"} open={isLoading}/>
    </Base>
  );
}

export default UserWallet;
