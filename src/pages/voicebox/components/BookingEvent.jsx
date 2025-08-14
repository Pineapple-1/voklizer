import SingleTick from "../../../assets/icons/SingleTick";
import Translate from "../../../assets/icons/Translate";
import Retry from "../../../assets/icons/Retry";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";
import {CalendarCheck} from "lucide-react";
import {useState} from "react";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import { format, parseISO } from "date-fns";

function BookingEvent({value,details}) {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return format(parseISO(dateString), 'do MMMM yyyy');
    };

    const getDayName = (dateString) => {
        if (!dateString) return '';
        return format(parseISO(dateString), 'EEEE');
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.slice(0, 5);
    };

    return (
        <AnimatePresence>
            {value === 100 && (
                <motion.div
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.75}}
                    transition={{duration: 0.3}}
                    className="w-full flex items-center justify-center "
                >
                    <div className="w-full">
                        <div className="bg-[#F5EBFF] p-6 rounded-2xl outline outline-[#E1D0FA]">
                            <div className=" font-bold text-sm leading-[15px] text-[#161A1D] mb-1">
                                {formatDate(details?.TimeSlot?.date)}
                            </div>

                            <div className="flex  items-center justify-between gap-11 mb-1">
                                <div className=" font-bold text-base leading-[20px] text-[#161A1D]">
                                    Appointment Booked
                                </div>
                                <SingleTick />
                            </div>
                            <div className="h-0.5 w-full bg-[#606161] my-3"></div>
                            <div className=" font-bold text-[20px] leading-[25px] text-[#606161]">
                                {getDayName(details?.TimeSlot?.date)} at {formatTime(details?.TimeSlot?.startTime)}
                            </div>
                            <div className="w-[165px] flex items-center">
                                <div className=" font-bold text-[19px] leading-[25px] text-purple">
                                    Re-Arrange Appointment
                                </div>
                                <Retry />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default BookingEvent;
