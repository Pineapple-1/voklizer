import React from "react";
import SingleTick from "../../../assets/icons/SingleTick";
import Translate from "../../../assets/icons/Translate";
import Retry from "../../../assets/icons/Retry";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useState } from "react";

function BookingEvent({ value }) {
  const [booking, setBooking] = useState(false);

  return (
    <AnimatePresence>
      {value === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.3 }}
          className="w-full flex items-center justify-center "
        >
          <div className="w-full">
            <div className="mb-1 font-bold text-[16px] text-[#161A1D]">
              Interpreter Required?
            </div>
            <div className="bg-[#8532D8] h-[26px] gap-11 px-[14px] flex items-center justify-between rounded-lg mb-3">
              <div className="text-xs font-bold text-white"> No</div>

              <div className="h-2 bg-white flex-1 rounded-lg"></div>
              <div className=" text-xs font-bold text-white">Yes</div>
            </div>
            <div className="bg-[#F5EBFF] p-6 rounded-2xl">
              <div className=" font-bold text-[12px] leading-[15px] text-[#161A1D] mb-1">
                23/12/2003
              </div>
              {booking ? (
                <div className="flex  items-center justify-between gap-11 mb-1">
                  <div className=" font-bold text-[16px] leading-[20px] text-[#161A1D]">
                    Appointment Booked
                  </div>
                  <SingleTick />
                </div>
              ) : (
                <div className="flex flex-col">
                  <div
                    className="flex  items-center justify-between gap-11 mb-1"
                    onClick={() => {}}
                  >
                    <div className=" font-bold text-[16px] leading-[20px] text-[#161A1D] capitalize">
                      Book available time
                    </div>

                    <CalendarCheck className="w-6 h-6 text-purple" />
                  </div>
                  <div>
                    <button>open calender</button>
                  </div>
                </div>
              )}
              <div className="h-0.5 w-full bg-[#606161] my-3"></div>
              <div className=" font-bold text-[20px] leading-[25px] text-[#606161]">
                Tuesday at 15:30 PM
              </div>
              <div className="flex items-center justify-between">
                <div className=" font-bold text-[16px] leading-[20px] text-[#606161]">
                  Interpreter Included
                </div>
                <Translate />
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
