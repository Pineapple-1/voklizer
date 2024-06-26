import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";
import { useHistory } from "react-router-dom";
import Textbox from "../../../components/Textbox";

function CompanyAddress() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <Textbox label={"Address Line 1"} />
          <Textbox label={"Address Line 2"} />
          <div className="w-6/12">
            <Textbox label={"City"} />
          </div>
          <div className="w-4/12">
            <Textbox label={"Post Code"} />
          </div>
          <Textbox label={"County"} />
        </div>

        <div className="flex justify-between">
          <ChipButton onClick={() => history.push("/address")}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/practice-area")}>
            Next
          </ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export default CompanyAddress;
