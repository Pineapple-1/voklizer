import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import { GeometricButton } from "../../../components/GeometricButton";
import { useHistory } from "react-router-dom";
import Textbox from "../../../components/Textbox";

function Otp() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9 h-full justify-between">
        <Textbox label={"Enter OTP"} subtitle={"Verify Email Address"} />
        <div className="flex">
          <GeometricButton
            onClick={() => history.push("/reg-email")}
            cut="left"
            width="100%"
            className="flex-1"
          >
            Back
          </GeometricButton>
          <GeometricButton
            onClick={() => history.push("/landline")}
            cut="right"
            width="100%"
            className="flex-1"
          >
            Next
          </GeometricButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export default Otp;
