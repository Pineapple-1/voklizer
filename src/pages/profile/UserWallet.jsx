import React from "react";
import Base from "../../layout/Base";
import clsx from "clsx";
import { CreditCard } from "lucide-react";
import { useCapacitorStripe } from "@capacitor-community/stripe/dist/esm/react/provider";
import useSWR from "swr";
import Loading from "../../components/Loading";
function UserWallet() {
  const { stripe: capacitorStripe, isGooglePayAvailable } =
    useCapacitorStripe();

  const { data, isLoading } = useSWR("user-payments-methods");

  const createPaymentToken = async () => {
    try {
      const result = await capacitorStripe.createGooglePay({
        paymentIntentClientSecret: data.client_secret,

        paymentSummaryItems: [
          {
            label: "Product Name",
            amount: 10099.0,
          },
        ],
        merchantIdentifier: "merchant.com.getcapacitor.stripe",
        countryCode: "US",
        currency: "USD",
      });

      if (isGooglePayAvailable) {
        await capacitorStripe.presentGooglePay();
      }
      console.log("Payment Method ID:", console.log(JSON.stringify(result)));
    } catch (e) {
      console.log("error Payment Method ID:", console.log(JSON.stringify(e)));
    }
  };

  return (
    <Base>
      <div className="text-[24px] leading-[30px] text-[#020202] mx-auto">
        My Wallet
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="mt-10">Payment Methods</div>

        <div className="flex gap-4 flex-col">
          {!isLoading &&
            data?.methods?.map((item) => (
              <div
                key={item.id}
                className={clsx(
                  "bg-[#D9D9D960] px-6 py-5 rounded-xl w-full",
                  item.active && "border-2 border-purple"
                )}
                onClick={() => {}}
              >
                <div className="flex gap-2 items-center ">
                  <CreditCard className="text-purple " />
                  <div className=" capitalize">{item.brand} Card </div>
                  {item.active && (
                    <div className="ml-auto text-[11px] text-[#2c2c2c]">
                      Default
                    </div>
                  )}
                </div>
                <div className="flex mt-6 gap-2 items-center justify-start">
                  <div>**** **** ****</div>
                  <div> {item.last4Digits}</div>
                </div>
              </div>
            ))}
        </div>

        {isGooglePayAvailable && (
          <button
            className="bg-[#D9D9D960] rounded-xl  py-[9px] flex items-center  px-3 w-full  gap-2"
      
          >
            <img src="/google.svg" className=" w-5 h-5" alt="" />

            <div className="text-[11px] font-medium">Google Pay</div>
          </button>
        )}
      </div>
      <Loading message={"Fetching Info"} open={isLoading } />
    </Base>
  );
}

export default UserWallet;
