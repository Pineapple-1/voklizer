import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";

import { FilePicker } from "@capawesome/capacitor-file-picker";

import { useState, useRef } from "react";

function VideoAdd() {
  const [videoSrc, setVideoUrl] = useState(null);
  const videoRef = useRef(null);

  const pickMedia = async () => {
    const result = await FilePicker.pickMedia({ readData: true });
    const file = result.files[0];
    const dataUrl = `data:${file.mimeType};base64,${file.data}`;
    setVideoUrl(dataUrl);
    console.log(JSON.stringify(result));
  };

  const nothing = () => {
    console.log("apple mango");
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
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
        {videoSrc && (
          <div className="relative w-full max-w-4xl aspect-video bg-black overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videoSrc}
              onClick={togglePlay}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button
                className="p-4 text-white text-4xl bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-colors duration-300"
                onClick={togglePlay}
              >
                {videoRef.current?.paused ? "▶" : "❚❚"}
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-6">
          <ChipButton onClick={nothing}>Skip</ChipButton>
          <ChipButton onClick={pickMedia}>Upload</ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export default VideoAdd;
