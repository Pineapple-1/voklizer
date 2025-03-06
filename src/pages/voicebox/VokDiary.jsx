import {useState} from "react";
import {useIonViewWillEnter} from "@ionic/react";
import Book from "../../assets/icons/Book";
import Pointer from "../../assets/icons/Pointer";
import {StatusBar, Style} from "@capacitor/status-bar";
import Calender from "./components/Calender";
import useSWR from "swr";
import {getMonth, getYear} from "date-fns";
import Loading from "../../components/Loading.jsx";
import Base from "../../layout/Base";
import Meet from "../../components/Meet.jsx";

function VokDairy() {
  const [date, setDate] = useState(new Date());

  useIonViewWillEnter(() => {
    StatusBar.setStyle({style: Style.Light});
    StatusBar.setBackgroundColor({color: "#F5F5F5"});
  });

  const {data: userData, isLoading: userLoading} = useSWR("auth/me");

  const {data: meetings, isLoading: meetingsLoading} = useSWR(
    userData?.data?.role
      ? `booked-time-slots-${
        userData.data.role === "serviceProvider" ? "user" : "user"
      }?year=${getYear(date)}&month=${getMonth(date) + 1}`
      : null
  );

  return (
    <Base>
      <div className="flex flex-col gap-5 pt-10">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 relative">
            <div className="text-[13px] leading-[16px] text-[#030303]">
              Calendar View
            </div>
            <div className="h-0.5 bg-black w-full"/>
            <div className="absolute top-5 -right-6">
              <Pointer/>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Book/>
            <div className="text-[#030303] text-[20px] leading-[21px] w-[61px]">
              Vok Diary
            </div>
          </div>
        </div>

        <Calender mode="single" selected={date} onSelect={setDate}/>

        <div className="capitalize font-bold">My Appointments</div>

        {!meetingsLoading &&
          meetings?.data?.map((item) => <Meet key={item.id} meet={item}/>)}
      </div>

      <Loading open={meetingsLoading || userLoading} message={"Fetching"}/>
    </Base>
  );
}

export default VokDairy;