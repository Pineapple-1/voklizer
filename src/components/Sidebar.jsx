import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router-dom";

import PersonIcon from "../assets/icons/PersonIcon";
import WalletIcon from "../assets/icons/WalletIcon";
import SupportIcon from "../assets/icons/SupportIcon";
import SpeakerIcon from "../assets/icons/SpeakerIcon";
import HomeIconSm from "../assets/icons/HomeIconSm";
import CardIcon from "../assets/icons/CardIcon";

function Sidebar({ open, setOpen }) {
  const history = useHistory();

  return (
    <div>
      {open && (
        <div
          className="absolute inset-0 bg-black/0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="w-64 z-40 h-full bg-gray-800 text-white fixed top-0 left-0 shadow-lg"
          >
            <div className="bg-[#EEEEEE]  h-screen flex flex-col justify-between">
              <div className="bg-[#EEEEEE] h-screen pl-9 pr-4">
                <div className="flex flex-col gap-7">
                  <div className="flex justify-between">
                    <div className="text-[#CCCCCC] text-[20px] leading-[23px] w-24 mt-7">
                      It's that simple.
                    </div>

                    <div
                      className="text-[40px] leading-[50px] text-black "
                      onClick={() => setOpen(false)}
                    >
                      x
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col gap-5">
                      <HomeIconSm />
                      <SpeakerIcon />
                      <CardIcon />
                      <PersonIcon />
                      <WalletIcon />
                      <SupportIcon />
                    </div>
                    <div className="w-[2px] h-[226px] bg-black"></div>
                    <div className="flex flex-col gap-4">
                      <div
                        className="text-[20px] leading-6 text-[#000] font-semibold"
                        onClick={() => {
                          history.push("/play");
                          setOpen(false);
                        }}
                      >
                        Home
                      </div>
                      <div
                        className="text-[20px] leading-6 text-[#000] font-semibold"
                        onClick={() => {
                          history.push("/queries");
                          setOpen(false);
                        }}
                      >
                        Voice Box
                      </div>
                      <div className="text-[20px] leading-6 text-[#000] font-semibold">
                        Billing Info
                      </div>
                      <div className="text-[20px] leading-6 text-[#000] font-semibold">
                        Account
                      </div>
                      <div className="text-[20px] leading-6 text-[#000] font-semibold">
                        Wallet
                      </div>
                      <div className="text-[20px] leading-6 text-[#000] font-semibold">
                        Support
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 pl-9 pb-10">
                <div className="flex flex-col gap-4">
                  <div
                    className="text-[13px] leading-4 text-[#000] font-semibold"
                    onClick={() => {
                      history.push("/listing");
                      setOpen(false);
                    }}
                  >
                    Listings
                  </div>
                  <div
                    className="text-[13px] leading-4 text-[#000] font-semibold"
                    onClick={() => {
                      history.push("/diary");
                      setOpen(false);
                    }}
                  >
                    Vok Diary
                  </div>

                  <div
                    className="text-[13px] leading-4 text-[#000] font-semibold"
                    onClick={() => {
                      history.push("/login");
                      setOpen(false);
                    }}
                  >
                    Logout
                  </div>
                </div>
                <div className="flex flex-col gap-14  ">
                  <img className="w-[164px] h-[58px]" src="/NavBar.svg" />
                  <img
                    className="w-[164px] h-[58px]"
                    src="/logos/Nav-Logo.svg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Sidebar;
