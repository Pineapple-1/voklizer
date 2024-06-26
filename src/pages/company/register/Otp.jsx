import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";
import { useHistory } from "react-router-dom";
import Textbox from "../../../components/Textbox";

function Otp() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox label={"Enter OTP"} subtitle={"Verify Email Address"} />
        <div className="flex justify-between">
          <ChipButton onClick={() => history.push("/reg-email")}>
            Back
          </ChipButton>
          <ChipButton onClick={() => history.push("/landline")}>
            Next
          </ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export default Otp;
