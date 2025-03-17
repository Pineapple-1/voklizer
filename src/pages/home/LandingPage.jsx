import UserHomeLayout from "../../layout/UserHomeLayout";
import Reel from "./components/Reel";
import useSWR from "swr";

import Meet from "../../components/Meet";
import Refer from "../../assets/icons/Refer";

import {useHistory} from "react-router-dom";
import {getMonth, getYear} from "date-fns";
import Loading from "../../components/Loading";

const LandingPage = () => {
  const {data, isLoading} = useSWR("auth/me");

  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date()) + 1;

  const meetingsEndpoint = data?.data?.role === "serviceProvider"
    ? `booked-time-slots-service-provider?year=${currentYear}&month=${currentMonth}`
    : `booked-time-slots-user?year=${currentYear}&month=${currentMonth}`;

  const {data: meetings, isLoading: meetingsLoading} = useSWR(
    data ? meetingsEndpoint : null
  );

  const history = useHistory();

  return (
    <UserHomeLayout>
      <div className="h-full flex flex-col gap-10 pt-14 pb-10">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth shrink-0 h-max">
          <Reel
            name="AB Solicitors"
            place="Rochdale"
            thumbnail="/sample/3.jpeg"
            id={1}
          />
          <Reel
            name="AB Solicitors"
            place="Rochdale"
            thumbnail="/sample/4.png"
            id={2}
          />
          <Reel
            name="AB Solicitors"
            place="Rochdale"
            thumbnail="/sample/2.jpeg"
            id={3}
          />
          <Reel
            name="AB Solicitors"
            place="Rochdale"
            thumbnail="/sample/1.jpeg"
            id={4}
          />
          <Reel
            name="AB Solicitors"
            place="Rochdale"
            thumbnail="/sample/4.png"
            id={5}
          />
          <Reel
            name="AB Solicitors"
            place="Rochdale"
            thumbnail="/sample/1.jpeg"
            id={6}
          />
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth	 h-full">
          <div
            className="bg-[#161A1D] w-20 h-20 rounded-full flex  items-center justify-center flex-shrink-0"
            onClick={() => history.push("/play")}
          >
            <img src="/Mic.svg" alt="" className="w-6 h-9"/>
          </div>

          <div
            className="w-[216px] h-20 rounded-[15px] flex  items-center justify-between  overflow-hidden flex-shrink-0 ">
            <Refer/>
          </div>

          <div
            className="w-[216px] h-20 rounded-[15px] flex  items-center justify-between  overflow-hidden bg-purple px-5 py-3  flex-shrink-0 ">
            <div className="flex flex-col gap-1 ">
              <div className="text-white text-base leading-4">Tutorial</div>
              <div className="text-white text-[7px] w-[67px]">
                Learn how to use the application
              </div>
            </div>

            <img src="/tutorial.svg" alt="" className="w-[63px] h-[57px] "/>
          </div>

          <div
            className="w-[216px] h-20 rounded-[15px] flex  items-center justify-between  overflow-hidden bg-[#7EE150] px-5 py-3  flex-shrink-0 ">
            <div className="flex flex-col gap-1  text-purple">
              <div className="text-base leading-4">Learn How to 'EARN'</div>
            </div>

            <img src="/learnhow.svg" alt="" className="w-[81px] h-[53px]"/>
          </div>
        </div>

        <div className="capitalize font-bold">
          Welcome, {data?.data?.firstName || 'User'}
        </div>

        <div className="flex gap gap-5">
          <div
            className="flex flex-col items-center justify-between h-20"
            onClick={() => history.push("/queries")}
          >
            <img src="/speaker.svg" alt="" className="w-14 h-14"/>
            <div className="text-sm leading-3">Voice Box</div>
          </div>
          <div
            className="flex flex-col items-center justify-between h-20"
            onClick={() => history.push("/profile")}
          >
            <img src="/user.svg" alt="" className="w-14 h-14"/>
            <div className="text-sm leading-3">Account</div>
          </div>
          <div
            className="flex flex-col items-center justify-between h-20"
            onClick={() => history.push("/billing")}
          >
            <img src="/card.svg" alt="" className="w-18 h-14"/>
            <div className="text-sm leading-3">Billing</div>
          </div>
          <div className="flex flex-col items-center justify-between h-20">
            <img src="/support.svg" alt="" className="w-14 h-14"/>
            <div className="text-sm leading-3">Support</div>
          </div>
        </div>

        <div className="capitalize font-bold -mb-1">My Appointments</div>
        {!meetingsLoading && meetings?.data?.length > 0 ? (
          meetings.data.map((item) => <Meet key={item.id || Math.random()} meet={item}/>)
        ) : (
          <div className="text-gray-500">No appointments scheduled</div>
        )}
      </div>
      <Loading open={meetingsLoading || isLoading} message={"Fetching"}/>
    </UserHomeLayout>
  );
};

export default LandingPage;