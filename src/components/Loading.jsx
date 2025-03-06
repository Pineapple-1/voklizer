
import { motion, AnimatePresence } from "framer-motion";
import Bars from "../assets/icons/Bars";

function Loading({ open, message }) {
  return (
    <div>
      {open && <div className="absolute inset-0 bg-black/10 z-40" />}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 100, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className=" z-50 bg-gray-80 fixed inset-0 flex items-center justify-center "
          >
            <div className="bg-[#EEEEEE] shadow-lg  h-[120px]  w-[120px] rounded-lg flex flex-col items-center justify-between relative ">
              <div className="text-xs opacity-0 ">Transmitting</div>
              <div className="w-10 h-10">
                <Bars />
              </div>
              <div className="text-xs mb-4">{message}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Loading;
