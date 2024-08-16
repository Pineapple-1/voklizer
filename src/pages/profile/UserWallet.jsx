import React from "react";
import Base from "../../layout/Base";

import useSWR from "swr";
import Loading from "../../components/Loading";

import { format } from "date-fns";

function UserWallet() {
  const { data, isLoading } = useSWR("user-payments");

  return (
    <Base>
      <div className="text-[24px] leading-[30px] text-[#020202] mx-auto">
        My Wallet
      </div>
      <div className="w-full flex flex-col gap-6 h-full mt-10">
        {!isLoading && (
          <div className="flex flex-col gap-3 flex-1 h-full justify-between mb-4">
            <div className="flex flex-col gap-3 ">
              <div className="text-xs font-bold">Statment</div>
              <div className="w-full h-0.5 bg-black" />
              <div className="flex flex-col gap-3">
                {data.data.map((item) => (
                  <div className="flex flex-col gap-2" key={item.id}>
                    <div className="flex justify-between">
                      <div className="text-xs">Voice Service Charged</div>
                      <div className="text-xs">${item.amount}</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="text-xs text-purple">
                        {format(item.createdAt, "dd/MM/yyyy")}
                      </div>
                      <div className="text-xs text-[#4d4d4d]">
                        Transection ID: {item.txid}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-full h-0.5 bg-black" />
              <div className="text-xs font-bold">Total</div>
            </div>
          </div>
        )}
      </div>

      <Loading message={"Fetching Info"} open={isLoading} />
    </Base>
  );
}

export default UserWallet;
