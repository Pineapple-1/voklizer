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
          <div className="w-full -ml-2">
            <GeometricButton
              onClick={() => history.push("/reg-email")}
              variant="secondary"
              cut="left"
              className="w-full"
            >
              Back
            </GeometricButton>
          </div>
          <div className="w-3/5 shrink-0">
            <GeometricButton
              onClick={() => history.push("/landline")}
              variant="primary"
              cut="right"
              className="w-full"
            >
              Next
            </GeometricButton>
          </div>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export default Otp;
