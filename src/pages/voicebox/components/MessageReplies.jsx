import {useState, useRef} from "react";
import {Slider, SliderThumb, SliderTrack} from "react-aria-components";
import PlayIcon from "../../../assets/icons/PlayIcon";
import clsx from "clsx";
import Star from "../../../assets/icons/Star";
import Ticks from "../../../assets/icons/Ticks";
import {IonContent, IonModal} from "@ionic/react";
import CloseIcon from "../../../assets/icons/CloseIcon";
import CloseBadge from "../../../assets/icons/CloseBadge";
import PersonAlt from "../../../assets/icons/PersonAlt";
import {motion} from "framer-motion";
import BookingEvent from "./BookingEvent";

import {useAtom} from "jotai";
import {audioAtom} from "../../../state";
import Pause from "../../../assets/icons/Pause";
import {format} from "date-fns";
import CalenderBooking from "./CalenderBooking";
import SelectIcon from "../../../assets/icons/SelectIcon";
import {getDate, getMonth, getYear} from "date-fns";

import useSWR, {mutate} from "swr";
import Instance from "../../../axios/Axios";
import Book from "../../../assets/icons/Book.jsx";

function MessageReplies({id, offer, vokRef}) {
  const [value, setValue] = useState(offer.isBooked ? 100 : 0);
  const [audioState, setAudioState] = useAtom(audioAtom);
  const [date, setDate] = useState(new Date());
  const [booked, setBooked] = useState(offer.isBooked);
  const calenderRef = useRef();
  const day = getDate(date);
  const month = getMonth(date) + 1;
  const year = getYear(date);
  const {data, isLoading} = useSWR(`available-time-slots?year=${year}&month=${month}&day=${day}`);
  const modal = useRef();

  const book = (start, end) => {
    Instance.post(`book-time-slot/${offer.id}`, {
      jobId: id, date: format(date, "MM-dd-yy"), startTime: start, endTime: end, serviceProviderId: offer.User.id,
    }).then(() => {
      calenderRef.current?.dismiss();
      setBooked(true);
      mutate(`available-time-slots?year=${year}&month=${month}&day=${day}`);
      mutate(`user-job/${id}`);
    });
  };

  const listen = () => {
    if (audioState.url === offer.originalMessageLink) {
      if (audioState.isPaused) {
        vokRef.current.play();
        setAudioState({
          isPaused: false, isPlaying: true, url: offer.originalMessageLink,
        });
      } else {
        vokRef.current?.pause();

        setAudioState({
          isPaused: true, isPlaying: true, url: offer.originalMessageLink,
        });
      }
    } else {
      if (vokRef?.current) {
        vokRef.current?.pause();
        vokRef.current = null;
      }
      vokRef.current = new Audio(`https://storage.googleapis.com/voklizer-dev/${offer.originalMessageLink}`);

      vokRef.current.oncanplaythrough = () => {
        setAudioState({
          isPaused: false, isPlaying: true, url: offer.originalMessageLink,
        });
        vokRef.current.play();
      };

      vokRef.current.onended = () => {
        setAudioState({
          isPaused: false, isPlaying: false, url: null,
        });
      };

      vokRef.current.load();
    }
  };

  return (<>
    <div className={clsx("flex flex-col gap-3 ", value === 100 && "mr-6")}>
      <div
        className={clsx("flex gap-3 items-end -mb-1", value === 100 ? "justify-start  ml-4" : "justify-end  mr-4")}
        onClick={() => modal.current?.present()}
      >
        <div className="flex flex-col items-start gap-0.5">
          <div className="text-[8px] leading-[8px] text-[#8A8A8A]">
            {offer.User.ServiceProvider.city}
          </div>
          <div className="text-[12px] leading-[10px] text-[#8A8A8A]">
            {offer.User.ServiceProvider.companyName}
          </div>
        </div>

        <div
          className="bg-[#8532D8] text-[15px] leading-6 text-[#FFFFFF] flex rounded-lg items-center px-[7px] gap-1">
          <Star/>
          <div> {offer.User.rating}</div>
        </div>
      </div>

      <Slider
        defaultValue={0}
        className={clsx("py-2 px-1 border border-[#ADADAD] rounded-[13px] min-w-[230px] relative h-[45px] bg-[#F1F1F1] z-10 flex  items-center ",)}
        value={value}
        onChange={setValue}
        aria-label="slider"
        isDisabled={offer.isBooked}
      >
        <SliderTrack className='w-full'>
          <div onClick={listen}>

            <SliderThumb
              className={clsx(" w-[61px] h-[61px]  flex items-center justify-center rounded-full   z-30", value === 100 ? "bg-[#000000]" : "bg-[#D9D9D9]")}
            >
              {audioState.isPlaying && audioState.url === offer.originalMessageLink ? (audioState.isPaused ? (
                <PlayIcon
                  className={clsx(value === 100 ? "text-white" : "text-purple")}
                />) : (<Pause
                className={clsx("w-8 h-8", value === 100 ? "text-white" : "text-purple")}
              />)) : (<PlayIcon
                className={clsx(value === 100 ? "text-white" : "text-purple")}
              />)}
            </SliderThumb>
          </div>
        </SliderTrack>
        <div
          className={clsx("w-[196px] bg-[#fff] h-7 absolute z-20 rounded-[13px] flex items-center", value === 100 ? "flex-row-reverse  justify-between pl-5" : "justify-center gap-2")}
        >
          <img
            className={clsx("w-[86px] h-[23px]", value === 100 ? "mr-4" : "ml-8")}
            src="/Ripple.svg"
            alt=""
          />
          <div className="text-[12px] leading-3 text-[#000000]">
            From £500
          </div>
        </div>
      </Slider>
      <div className="flex justify-between mt-1">
        <div
          className={clsx("text-[6px] leading-[8px] text-[#8A8A8A] -mt-2", value === 100 ? "ml-2" : "ml-6")}
        >
          {value === 100 ? (<div className="flex gap-1">
            <Ticks/>
            <div className="text-[12px] text-[#8A8A8A] leading-[8px]">
              Accepted
            </div>
          </div>) : (<div className="text-[12px] text-[#8A8A8A] leading-[8px]">
            Slide to accept
          </div>)}
        </div>
        <div
          className={clsx("text-[12px] leading-[8px] text-[#8A8A8A] -mt-2", value === 100 && "mr-6")}
        >
          {format(offer.createdAt, "dd/MM/yyyy - HH:mm")}
        </div>
      </div>

      <IonModal
        ref={modal}
        initialBreakpoint={1}
        breakpoints={[0, 0.25, 0.5, 0.75, 1]}
        handleBehavior="cycle"
      >
        <IonContent>
          <div className="flex flex-col gap-5 bg-[#f5f5f5] h-screen p-6">
            <div className="flex gap-5 w-full">
              <div className="bg-slate-400 w-full max-w-[180px] rounded-lg"></div>
              <div className="flex flex-col gap-5">
                <div className="flex bg-[#32C889] gap-1 items-center rounded-md justify-center w-[60px] h-[25px]">
                  <Star className="text-white"/>
                  <div className="leading-[18px] text-[15px] text-white">
                    {offer.User.rating}
                  </div>
                </div>
                <div className="text-purple font-bold text-[16px] leading-5 w-24">
                  {offer.User.ServiceProvider.companyName}
                </div>
                <div className="w-full bg-black h-0.5"/>
                <div className="flex gap-1">
                  <PersonAlt/>
                  <div className="text-purple text-[20px] leading-[25px] font-bold">
                    88%
                  </div>
                </div>
                <div className="flex gap-1">
                  <CloseIcon/>
                  <div className="text-purple text-[20px] leading-[25px] font-bold">
                    4%
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 items-center">
                    <CloseBadge/>

                    <div className="text-purple text-[20px] leading-[25px] font-bold">
                      500
                    </div>
                  </div>
                  Reviews
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[#B2B2B2] text-[14px] leading-[18px]">
                Preferred Language/s
              </div>
              <div className="flex gap-2">
                {offer.User.ServiceProvider.PreferredLanguages.map((item) => (<div
                  className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer"
                  key={id}
                >
                  {item.language}
                </div>))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-[#B2B2B2] text-[14px] leading-[18px]">
                Areas of Expertise
              </div>
              {offer.User.ServiceProvider.PracticeAreas.map((item) => (<div
                className="flex gap-1"
                onClick={() => setSelected(item)}
                key={item.id}
              >
                <div className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer">
                  {item.area}
                </div>
                <div className="bg-[#C9C9C9] px-3 py-0.5 text-p1 text-black w-max rounded-[14px] cursor-pointer">
                  {item.rate}/{item.rate_type}
                </div>
              </div>))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[#B2B2B2] text-[14px] leading-[18px]">
                Website
              </div>
              <div className="text-[13px] leading-4">
                www.absolicitors.co.uk
              </div>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </div>

    <IonModal
      isOpen={value === 100 && !booked}
      initialBreakpoint={1}
      breakpoints={[0, 0.25, 0.5, 0.75, 1]}
      handleBehavior="cycle"
      className="rounded-modal"
      onWillDismiss={() => {
        let step = 20;
        let interval = setInterval(() => {
          setValue(prev => {
            if (prev <= 0) {
              clearInterval(interval);
              return 0;
            }
            return prev - step;
          });
        }, 20); // (20ms per step) → 10 steps in 0.2s
      }}

      ref={calenderRef}
    >

      <div className="bg-white w-full h-max rounded-xl pt-2">
        <div className="flex flex-col gap-6 w-full py-6">
          <CalenderBooking
            mode="single"
            selected={date}
            onSelect={setDate}
            className={"bg-white"}
          />


          <TimeSlotSelector data={data} book={book} isLoading={isLoading}/>

        </div>

      </div>
    </IonModal>

    <BookingEvent value={offer.isBooked ? 100 : 0}/>
  </>);
}


export const TimeSlotSelector = ({data, isLoading, book}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storedData, setStoredData] = useState(data?.data || []);

  const toggleDropdown = () => {
    if (!isLoading) {
      setIsOpen((prev) => !prev);
    }
  };

  return (<div className="flex flex-col gap-1.5 px-6">
    <div className="text-[#8A8A8A] text-sm">Select Time Slot</div>
    <div
      className="flex justify-between border-b-2 border-purple pb-[10px] items-end cursor-pointer"
      onClick={toggleDropdown}
    >
      <div className="text-purple">10:00 till 10:45</div>
      <motion.div animate={{rotate: isOpen ? 180 : 0}}>
        <SelectIcon className={"pb-1"}/>
      </motion.div>
    </div>
    <motion.div
      initial={{height: 0, opacity: 0}}
      animate={{height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0}}
      transition={{duration: 0.3}}
      className="overflow-hidden"
    >
      <div className="text-[#8A8A8A] text-sm mt-2 text-semibold">Available slots</div>
      <div
        className="flex flex-wrap gap-3 mt-4   items-stretch">          {(isLoading ? storedData : data?.data)?.map((date, index) => (
        <div
          key={index}
          onClick={() => book(date.start.slice(0, -3), date.end.slice(0, -3))}
          className="bg-purple px-6 py-1.5 text-p1 text-white w-[140px] text-center rounded-[14px] cursor-pointer hover:bg-purple-700"
        >
          {date.start.slice(0, -3)} - {date.end.slice(0, -3)}
        </div>))}
      </div>
    </motion.div>

    <div className='flex w-full justify-between mt-2 flex items-center'>
      <Book/>

      <div className='flex justify-end flex-col items-end'>
        <div className='text-[15px] text-[#8A8A8A] cursor-pointer'>Book your</div>
        <div className='text-[20px] text-[#8A8A8A] cursor-pointer'>Appointment</div>
      </div>


    </div>
  </div>);
};


export default MessageReplies;
