import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { X } from "lucide-react";
import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";

const ReelPlayer = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  console.log(id);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  useIonViewWillEnter(() => {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: "#000000" });
  });

  return (
    <IonPage>
      <IonContent>
        <div className="h-screen w-screen bg-black relative">
          <button
            className="absolute right-6 top-6 flex w-8 h-8 items-center justify-center bg-slate-500 rounded-full z-10"
            onClick={() => history.go(-1)}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20" />
          )}

          <video
            className="w-full h-full object-cover"
            autoPlay
            controls
            playsInline
            onLoadedData={handleVideoLoad}
            poster="path/to/your/poster-image.jpg"
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/voklizer-dev.appspot.com/o/7971026-uhd_2160_3840_30fps.mp4?alt=media&token=943f88f1-e9c2-411f-8771-2bb61437dda1"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReelPlayer;
