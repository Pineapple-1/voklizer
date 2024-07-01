import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";

import { FilePicker } from "@capawesome/capacitor-file-picker";

function VideoAdd() {
  const pickMedia = async () => {
    const result = await FilePicker.pickMedia();

    console.log(JSON.stringify(result));
  };

  const nothing = () => {
    console.log("apple mango");
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <div className="text-[20px] ">Branding Video.</div>
          <div className="text-[14px] underline decoration-purple decoration-2	underline-offset-4 leading-6">
            Tell people more about yourself, Upload a short video.
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <ChipButton onClick={nothing}>Skip</ChipButton>
          <ChipButton onClick={pickMedia}>Upload</ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export default VideoAdd;
