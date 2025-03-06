import Base from "../../layout/Base";

import {loadStripe} from "@stripe/stripe-js";
import "./billing.css";

import PaymentsCards from "../../assets/icons/PaymentsCards";
import useSWR from "swr";

import Instance from "../../axios/Axios";
import Loading from "../../components/Loading";
import {mutate} from "swr";
import {useLocation, useHistory} from "react-router-dom";
import clsx from "clsx";
import {CreditCard} from "lucide-react";
import {useCapacitorStripe} from "@capacitor-community/stripe/dist/esm/react/provider";

import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {motion} from "framer-motion";

import {useState} from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState(true);
  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      console.error("Error creating payment method:", error);
    } else {
      Instance.post("save-card", paymentMethod).then((res) => {
        Instance.post("set-default-payment-method", {
          defaultPaymentMethod: "Card",
        }).then(() => {
          setLoading(false);
          mutate("user-payments-methods");
          mutate("auth/me");
          searchParams.get("recorded") === "true" && history.push("/play");
        });
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <div className=" relative">
            <div className="absolute w-[70px] h-[16px] right-0 bottom-2.5">
              <PaymentsCards/>
            </div>

            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "15px",
                    color: "black",
                    "::placeholder": {
                      color: "black",
                    },
                    ":-webkit-autofill": {
                      color: "black",
                    },
                  },
                },
                classes: {
                  base: "stripe-element-custom",
                  invalid: "stripe-element-invalid",
                },
                placeholder: "Card Number",
              }}
            />
          </div>
          <div className="flex justify-between">
            <div className="w-2/5">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                      color: "black",
                      "::placeholder": {
                        color: "black",
                      },
                      ":-webkit-autofill": {
                        color: "black",
                      },
                    },
                  },
                  classes: {
                    base: "stripe-element-custom",
                    invalid: "stripe-element-invalid",
                  },
                  placeholder: "Expiry Date",
                }}
              />
            </div>
            <div className="w-2/5">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                      color: "black",
                      "::placeholder": {
                        color: "black",
                      },
                      ":-webkit-autofill": {
                        color: "black",
                      },
                    },
                  },
                  classes: {
                    base: "stripe-element-custom",
                    invalid: "stripe-element-invalid",
                  },
                  placeholder: "Security Code",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center justify-start mt-5">
          <div
            className="bg-[#D9D9D9]  flex items-center justify-center w-[21px] h-[21px] rounded-full"
            onClick={() =>
              setBillingAddress((billingAddress) => !billingAddress)
            }
          >
            <div
              className={clsx(
                "rounded-full w-[11px] h-[11px] ",
                billingAddress ? "bg-purple" : "bg-[#D9D9D9]"
              )}
            />
          </div>
          <div className="text-[14px] leading-3 font-medium text-[#000000]">
            Same as registration address
          </div>
        </div>

        <button
          className="bg-[#D9D9D960] rounded-xl  py-[9px] flex justify-between items-center  px-3 w-full mt-4 "
          type="submit"
          disabled={!stripe}
        >
          <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
          <div className="text-[11px]">Save Payment Info</div>
        </button>
      </form>
      <Loading open={loading} message={"Saving Info"}/>
    </>
  );
};

function Billing() {
  const {isGooglePayAvailable, isApplePayAvailable} = useCapacitorStripe();
  const {data, isLoading} = useSWR("user-payments-methods");
  const {data: me, isLoading: isMeLoading} = useSWR("auth/me");
  const [postLoading, setPostLoading] = useState(false);

  return (
    <Base>
      <div className="text-[24px] leading-[30px] text-[#020202] mx-auto">
        Billing Info
      </div>

      <div className="mt-10  mb-4">Payment Methods</div>

      <div className="flex gap-3 flex-col">
        {!isLoading &&
          !isMeLoading &&
          data?.methods?.map((item) => (
            <motion.div
              initial={{opacity: 0, scale: 0.75}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.75}}
              transition={{duration: 0.2}}
              className="w-full flex items-center justify-center"
            >
              <div
                key={item.id}
                className={clsx(
                  "bg-[#D9D9D960] px-6 py-5 rounded-xl w-full",
                  me?.data?.defaultPaymentMethod == "Card" &&
                  "border-2 border-purple"
                )}
                onClick={() => {
                  setPostLoading(true);
                  Instance.post("/set-default-payment-method", {
                    defaultPaymentMethod: "Card",
                  }).then(() => {
                    mutate("auth/me");
                    setPostLoading(false);
                  });
                }}
              >
                <div className="flex gap-2 items-center ">
                  <CreditCard className="text-purple "/>
                  <div className=" capitalize">{item.brand} Card</div>
                  {me?.data?.defaultPaymentMethod == "Card" && (
                    <div className="ml-auto text-[15px] text-[#2c2c2c]">
                      Default
                    </div>
                  )}
                </div>
                <div className="flex mt-6 gap-2 items-center justify-start">
                  <div>**** **** ****</div>
                  <div className='text-[15px] text-[#2c2c2c]'> {item.last4Digits}</div>
                </div>
              </div>
            </motion.div>
          ))}

        {!isMeLoading && isGooglePayAvailable && (
          <div
            className={clsx(
              "bg-[#D9D9D960] rounded-xl  py-[9px] flex items-center  px-3 w-full  gap-2",
              me?.data?.defaultPaymentMethod == "google-pay" &&
              "border-2 border-purple"
            )}
            onClick={() => {
              setPostLoading(true);

              Instance.post("/set-default-payment-method", {
                defaultPaymentMethod: "google-pay",
              }).then(() => {
                mutate("auth/me");
                setPostLoading(false);
              });
            }}
          >
            <img src="/google.svg" className=" w-5 h-5" alt=""/>

            <div className=" w-full flex flex-between">
              <div className="text-[11px] font-medium">Google Pay</div>

              {me?.data?.defaultPaymentMethod == "google-pay" && (
                <div className="ml-auto text-[11px] text-[#2c2c2c]">
                  Default
                </div>
              )}
            </div>
          </div>
        )}


        {/*{!isMeLoading && isApplePayAvailable && (*/}
        {/*  <div*/}
        {/*    className={clsx(*/}
        {/*      "bg-[#D9D9D960] rounded-xl  py-[9px] flex items-center  px-3 w-full  gap-2",*/}
        {/*      me?.data?.defaultPaymentMethod == "google-pay" &&*/}
        {/*      "border-2 border-purple"*/}
        {/*    )}*/}
        {/*    onClick={() => {*/}
        {/*      setPostLoading(true);*/}

        {/*      Instance.post("/set-default-payment-method", {*/}
        {/*        defaultPaymentMethod: "apple-pay",*/}
        {/*      }).then(() => {*/}
        {/*        mutate("auth/me");*/}
        {/*        setPostLoading(false);*/}
        {/*      });*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <img src="/google.svg" className=" w-5 h-5" alt="" />*/}

        {/*    <div className=" w-full flex flex-between">*/}
        {/*      <div className="text-[11px] font-medium">Apple Pay</div>*/}

        {/*      {me?.data?.defaultPaymentMethod == "google-pay" && (*/}
        {/*        <div className="ml-auto text-[11px] text-[#2c2c2c]">*/}
        {/*          Default*/}
        {/*        </div>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>




      <div className="mt-10 text-sm italic text-[#8A8A8A] -mb-4">Hint Use</div>
      <div className="mt-6  text-sm italic text-[#8A8A8A] -mb-4">Card: 4242-4242-4242-4242</div>
      <div className="mt-6  text-sm italic text-[#8A8A8A] -mb-4">CVV: 123 -- EXP: 02/35</div>


      <div className="mt-10  -mb-4">Add Payment Methods</div>

      <div className="w-full mx-auto">

        <Elements stripe={stripePromise}>
          <div className="mt-10">
            <CheckoutForm/>
          </div>
        </Elements>
      </div>

      <Loading
        message={"Fetching Info"}
        open={isLoading || isMeLoading || postLoading}
      />
    </Base>
  );
}

export default Billing;
