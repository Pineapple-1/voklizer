import Base from "../../layout/Base";

import { loadStripe } from "@stripe/stripe-js";
import "./billing.css";

import PaymentsCards from "../../assets/icons/PaymentsCards";
import Instance from "../../axios/Axios";
import Loading from "../../components/Loading";


import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import clsx from "clsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    console.log("----->>>>", paymentMethod);
    if (error) {
      console.error("Error creating payment method:", error);
    } else {
      console.log("Payment method created:", paymentMethod);

      Instance.post("save-card", { paymentMethodId: paymentMethod.id }).then(
        () => setLoading(false)
      );

      sendPaymentMethodToBackend(paymentMethod.id);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className=" relative">
            <div className="absolute w-[70px] h-[12px] right-0 bottom-2.5">
              <PaymentsCards />
            </div>

            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "12px",
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
                      fontSize: "12px",
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
                      fontSize: "12px",
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
          <div className="text-[12px] leading-3 font-medium text-[#000000]">
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
      <Loading open={loading} message={"Saving Info"} />
    </>
  );
};

function Billing() {
  return (
    <Base>
      <div className="text-[24px] leading-[30px] text-[#020202] mx-auto">
        Billing Info
      </div>
      <div className="w-full mx-auto">
        <Elements stripe={stripePromise}>
          <div className="mt-10">
            <CheckoutForm />
          </div>
        </Elements>
      </div>
    </Base>
  );
}

export default Billing;
