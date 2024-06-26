import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";
import { useHistory } from "react-router-dom";
import Textbox from "../../../components/Textbox";

function LandlineNumber() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox label={"Landline Number"} />
        <div className="flex justify-between">
          <ChipButton onClick={() => history.go('/otp')}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/address")}>Next</ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export default LandlineNumber;
