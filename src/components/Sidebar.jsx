import {AnimatePresence, motion} from "framer-motion";
import {useHistory} from "react-router-dom";


import PersonIcon from "../assets/icons/PersonIcon";
import WalletIcon from "../assets/icons/WalletIcon";
import SupportIcon from "../assets/icons/SupportIcon";
import SpeakerIcon from "../assets/icons/SpeakerIcon";
import HomeIconSm from "../assets/icons/HomeIconSm";
import CardIcon from "../assets/icons/CardIcon";

import {SocialLogin} from '@capgo/capacitor-social-login';
import useSWR, {mutate} from "swr";
import {storage} from "../storage.js";

function Sidebar({open, setOpen}) {
    const history = useHistory();
    const {data, isLoading} = useSWR("auth/me");


    return (
        <div>
            {open && <div className="absolute inset-0 bg-black/0 z-40" onClick={() => setOpen(false)} />}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{x: "-100%"}}
                        animate={{x: 0}}
                        exit={{x: "-100%"}}
                        transition={{duration: 0.3}}
                        className="w-64 z-40 h-full bg-gray-800 text-white fixed top-0 left-0 shadow-lg overflow-y-auto bg-[#EEEEEE] "
                    >
                        <div className=" flex flex-col h-full justify-between">
                            <div className="pl-9 pr-4 pt-16 pb-10 h-full">
                                <div className="flex flex-col gap-7">
                                    <div className="flex justify-between items-start">
                                        <div className="text-[#CCCCCC] text-xl leading-[23px] w-24">
                                            It's that simple.
                                        </div>
                                        <div className="text-[40px] leading-[40px] text-black"
                                            onClick={() => setOpen(false)}>
                                            x
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-[16px] relative ">
                                        <div className="absolute flex-1 w-[2px] top-0 left-8 h-full bg-black" />
                                        <div className=" flex items-center gap-[20px]" onClick={() => {
                                            history.push("/landing");
                                            setOpen(false);
                                        }}>
                                            <div className="w-6 flex justify-center"><HomeIconSm /></div>
                                            <div className="text-xl   leading-6 text-[#000] font-semibold">Home</div>
                                        </div>
                                        <div className="flex items-center gap-[20px]" onClick={() => {
                                            history.push("/queries");
                                            setOpen(false);
                                        }}>
                                            <div className="w-6 flex justify-center"><SpeakerIcon /></div>
                                            <div className="text-xl leading-6 text-[#000] font-semibold">Voice Box</div>
                                        </div>
                                        <div className=" flex items-center gap-[20px]" onClick={() => {
                                            history.push("/profile");
                                            setOpen(false);
                                        }}>
                                            <div className="w-6 flex justify-center"><PersonIcon /></div>
                                            <div className="text-xl leading-6 text-[#000] font-semibold">Account</div>
                                        </div>
                                        <div className=" flex items-center gap-[20px]" onClick={() => {
                                            history.push("/billing");
                                            setOpen(false);
                                        }}>
                                            <div className="w-6 flex justify-center"><CardIcon /></div>
                                            <div className="text-xl leading-6 text-[#000] font-semibold">Billing Info
                                            </div>
                                        </div>
                                        <div className=" flex items-center gap-[20px]" onClick={() => {
                                            history.push("/wallet");
                                            setOpen(false);
                                        }}>
                                            <div className="w-6 flex justify-center"><WalletIcon /></div>
                                            <div className="text-xl leading-6 text-[#000] font-semibold">Wallet</div>
                                        </div>
                                        <div className=" flex items-center gap-[20px]">
                                            <div className="w-6 flex justify-center"><SupportIcon /></div>
                                            <div className="text-xl leading-6 text-[#000] font-semibold">Support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!isLoading && data?.data?.role === "serviceProvider" && (
                                <div className="flex flex-col gap-6 pl-9 pb-10">
                                    <div className="flex flex-col gap-6 mb-3">
                                        <div className="text-[18px] leading-4 text-[#000] font-semibold"
                                            onClick={() => {
                                                history.push("/listing");
                                                setOpen(false);
                                            }}>All Jobs
                                        </div>
                                        <div className="text-[18px] leading-4 text-[#000] font-semibold"
                                            onClick={() => {
                                                history.push("/all-replies");
                                                setOpen(false);
                                            }}>All Replies
                                        </div>
                                        <div className="text-[18px] leading-4 text-[#000] font-semibold"
                                            onClick={() => {
                                                history.push("/diary");
                                                setOpen(false);
                                            }}>Vok Diary
                                        </div>

                                        <div className="text-[18px] leading-4 text-[#000] font-semibold"
                                            onClick={() => {
                                                history.push("/edit-company-info");
                                                setOpen(false);
                                            }}>Edit Info
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-6 pl-9 pb-10">
                                <div className="text-[18px] leading-4 text-[#000] font-semibold" onClick={async () => {
                                    await SocialLogin.logout({provider: "google"});

                                    await storage.remove("token");
                                    await storage.remove("user");
                                    mutate(() => true)
                                    
                                    // Clear the entire navigation stack and navigate to login
                                    history.replace("/login");
                                    
                                    // Additional step to ensure clean navigation stack
                                    setTimeout(() => {
                                        window.history.replaceState(null, null, "/login");
                                        if (window.history.length > 1) {
                                            window.history.go(-(window.history.length - 1));
                                        }
                                    }, 100);
                                    
                                    setOpen(false);
                                }}>Logout
                                </div>
                                <div className="flex flex-col gap-14">
                                    <img className="w-[164px] h-[58px]" src="/NavBar.svg" />
                                    <img className="w-[178px] h-[44px]" src="/logos/Nav-Logo.svg" />
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