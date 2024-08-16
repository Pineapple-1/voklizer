import { useCapacitorStripe } from "@capacitor-community/stripe/dist/esm/react/provider";

export const createPaymentToken = async (clientSecret, amount) => {
  const { stripe, isGooglePayAvailable } = useCapacitorStripe();

  try {
    if (!isGooglePayAvailable) {
      console.log("Google Pay is not available on this device");
      return;
    }

    await stripe.createGooglePay({
      paymentIntentClientSecret: clientSecret,
      paymentSummaryItems: [
        {
          label: "Voklizer",
          amount: amount,
        },
      ],
      merchantIdentifier: "merchant.com.getcapacitor.stripe",
      countryCode: "US",
      currency: "USD",
    });

    const result = await stripe.presentGooglePay();
    console.log("Google Pay result:", result);
    return result;
  } catch (e) {
    console.error("Error in Google Pay process:", JSON.stringify(e));
    throw e;
  }
};
