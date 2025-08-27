import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import Instance from "../../../axios/Axios";
import Loading from "../../../components/Loading";
import { useHistory, useLocation } from "react-router-dom";

function VideoAdd() {
  const [videoSrc, setVideoUrl] = useState(null);
  const videoRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  // Check if we're in edit mode
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStart, setUploadStart] = useState(null);

  const pickMedia = async () => {
    try {
      const result = await FilePicker.pickMedia({ readData: true });
      const file = result.files[0];
      const dataUrl = `data:${file.mimeType};base64,${file.data}`;
      setVideoUrl(dataUrl);
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error("Error picking media:", error);
    }
  };

  const skipVideo = () => {
    if (isEditMode) {
      history.replace("/edit-company-info");
    } else {
      history.push("/landing");
    }
  };

  const cancelEdit = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    history.replace("/edit-company-info");
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

  const sendToFirebase = async () => {
    if (!videoSrc) {
      return;
    }

    try {
      const response = await fetch(videoSrc);
      const storageRef = ref(storage, "intro/" + `${Date.now()}`);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadStart(true);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          setUploadStart(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            Instance.post("service-provider/video-link", {
              videoLink: url,
            })
              .then(() => {
                setUploadStart(false);
                if (isEditMode) {
                  history.replace("/edit-company-info");
                } else {
                  history.push("/landing");
                }
              })
              .catch((error) => {
                console.error("API error:", error);
                setUploadStart(false);
              });
            console.log("File available at", url);
          });
        }
      );
    } catch (error) {
      console.error("Error uploading to Firebase:", error);
      setUploadStart(false);
    }
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9 h-full justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-[20px] ">Branding Video</div>
          <div className="text-sm underline decoration-purple decoration-2 underline-offset-4 leading-6">
            Tell people more about yourself, Upload a short video.
          </div>
        </div>

        {videoSrc && (
          <div className="relative w-full max-w-4xl aspect-video bg-black overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-fit"
              autoPlay
              controls
              playsInline
              onClick={togglePlay}
              poster="path/to/your/poster-image.jpg" // Replace with your actual poster image path
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div className="h-5 w-full">
          {uploadProgress > 0 && (
            <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {isEditMode ? (
            <>
              <ChipButton
                onClick={cancelEdit}
                className="bg-gray-200 text-purple"
              >
                Cancel
              </ChipButton>
              <ChipButton onClick={pickMedia}>Select</ChipButton>
              <ChipButton
                onClick={sendToFirebase}
                disabled={!videoSrc}
              >
                {isEditMode ? "Save" : "Upload"}
              </ChipButton>
            </>
          ) : (
            <>
              <ChipButton onClick={skipVideo}>Skip</ChipButton>
              <ChipButton onClick={pickMedia}>Select</ChipButton>
              <ChipButton
                onClick={sendToFirebase}
                disabled={!videoSrc}
              >
                Upload
              </ChipButton>
            </>
          )}
        </div>
      </div>
      <Loading message={isEditMode ? "Updating" : "Uploading"} open={uploadStart} />
    </ServiceProviderRegistrationLayout>
  );
}

export default VideoAdd;
