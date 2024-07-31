import React from "react";
import Base from "../../layout/Base";
import clsx from "clsx";
import { CreditCard } from "lucide-react";
import { useCapacitorStripe } from "@capacitor-community/stripe/dist/esm/react/provider";
import useSWR from "swr";

function UserWallet() {
  const { stripe: capacitorStripe, isGooglePayAvailable } =
    useCapacitorStripe();

  const { data } = useSWR("user-payments?page=1&pageSize=10");

  const createPaymentToken = async () => {
    try {
      const result = await capacitorStripe.createGooglePay({
        paymentIntentClientSecret:
          "pi_3PiKpmCLy9Fig8Jq05acKoDB_secret_I0m9PZnALWCR5TDviSMb6qH00",

        paymentSummaryItems: [
          {
            label: "Product Name",
            amount: 1099.0,
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
          <div
            className={clsx(
              "bg-[#D9D9D960] px-6 py-5 rounded-xl w-full",
              "border-2 border-purple"
            )}
          >
            <div className="flex gap-2 items-center ">
              <CreditCard className="text-purple " />
              <div>Visa Card </div>
              <div className="ml-auto text-[11px] text-[#2c2c2c]">Default</div>
            </div>
            <div className="flex mt-6 gap-2 items-center justify-start">
              <div>**** **** ****</div>
              <div> 5678</div>
            </div>
          </div>

          <div className={clsx("bg-[#D9D9D960] px-6 py-5 rounded-xl w-full")}>
            <div className="flex gap-2 items-center  ">
              <CreditCard className="text-purple " />
              <div>Master Card </div>
              {/* <div className="ml-auto text-[11px] text-[#2c2c2c]">Default</div> */}
            </div>
            <div className="flex mt-6 gap-2 items-center justify-start">
              <div>**** **** ****</div>
              <div> 5678</div>
            </div>
          </div>
        </div>

        {isGooglePayAvailable && (
          <button
            className="bg-[#D9D9D960] rounded-xl  py-[9px] flex items-center  px-3 w-full  gap-2"
            type="submit"
            onClick={createPaymentToken}
          >
            <img src="/google.svg" className=" w-5 h-5" alt="" />

            <div className="text-[11px] font-medium">Google Pay</div>
          </button>
        )}
      </div>
    </Base>
  );
}

export default UserWallet;
