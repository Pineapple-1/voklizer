import { IonModal, IonDatetime, IonContent } from "@ionic/react";
import { useState } from "react";
import { useRef } from "react";
import { format } from "date-fns";

function CalenderModal({ open, onClose }) {
  const [date, setDate] = useState();

  const sheetRef = useRef();
  const handleDateChange = (e) => {
    setDate(new Date(e.detail.value));
    sheetRef.current.present();
  };
  return (
    <div>
      <IonModal isOpen={open} onDidDismiss={onClose} id="example-modal">
        <div className="flex flex-col items-center justify-between">
          <IonDatetime
            id="date-only"
            className="custom-date-picker"
            presentation="date"
            onIonChange={handleDateChange}
          />
        </div>
      </IonModal>

      <IonModal
        ref={sheetRef}
        initialBreakpoint={0.35}
        breakpoints={[0, 0.35, 0.5, 0.75, 1]}
        handleBehavior="cycle"
      >
        <IonContent>
          <div className="px-4 py-8 flex flex-col gap-6">
            <div className=""> Select Time Avalible Slot</div>
            <div className="bg-purple text-white rounded-2xl text-[14px] w-max px-3 py-2 ">
              {format(date ?? new Date(), "EEEE, MMMM do yyyy")}
            </div>
            <div className="flex flex-col gap-3 px-4">
              <div>15:30 &gt; 16:30</div>
              <div>16:30 &gt; 17:30</div>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
}

export default CalenderModal;
