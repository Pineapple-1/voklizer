import { useState } from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import ChipButton from "../../../components/ChipButton";
import { useHistory } from "react-router-dom";
import Instance from "../../../axios/Axios";
import SelectIcon from "../../../assets/icons/SelectIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import clsx from "clsx";

function PracticeArea() {
  const history = useHistory();
  const [loading, setLoading] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const languages = [
    "Imigration",
    "Property",
    "Personal Injury",
    "Criminal Law",
    "Family Law",
    "Property Law",
  ];

  const packages = ["Per Hour", "Per Case", "Per Application", "Flat Fee"];
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(true);
  const [payment, setPayment] = useState("Per Hour");
  const [rateList, setRateList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const postData = () => {
    setLoading(true);
    Instance.post("service-provider/practice-area", {
      practiceArea: rateList,
    })
      .then((res) => {
        console.log(res);
        history.push("/listing");
      })
      .finally(() => setLoading(false));
  };

  const select = (item) => {
    if (value) {
      return;
    } else {
      setValue(item);
    }
    setOpen(false);
  };

  const onSubmit = (data) => {
    if (rateList.some((item) => item.area === value)) {
      setRateList((rateList) => [
        ...rateList.filter((item) => item.area !== value),
        { ...data, experience_type: "year", area: value, rate_type: payment },
      ]);
    } else {
      setRateList((rateList) => [
        ...rateList,
        { ...data, experience_type: "year", area: value, rate_type: payment },
      ]);
    }

    console.log("---->", rateList);

    setOpen(false);
    setValue(null);
  };

  return (
    <ServiceProviderRegistrationLayout>
      <AnimatePresence>
        <motion.div
          layout
          transition={{
            layout: { duration: 0.2 },
          }}
          onLayoutAnimationComplete={() => setIsAnimating(true)}
        >
          <div className="flex flex-col gap-9 h-full justify-center">
            <div className="flex flex-col gap-4 w-full relative">
              <div className="flex gap-2 absolute -top-6 left-0">
                <AnimatePresence>
                  {value && (
                    <motion.div
                      initial={{ opacity: 0, translateX: 10 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      exit={{ opacity: 0, translateX: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer "
                        onClick={() => setValue(null)}
                      >
                        {value}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className={
                  "caret-transparent cursor-pointer rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none h-0.5"
                }
                onClick={() => !value && setOpen(!open)}
              />
              <div className="absolute -top-1 right-0">
                <SelectIcon />
              </div>
              <div className="text-[14px] leading-4">Practice Area</div>
              {open && (
                <motion.div layout transition={{ duration: 0.3 }}>
                  <div className="flex flex-col gap-2 flex-wrap">
                    {languages.map((item) => (
                      <div
                        key={item}
                        className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer capitalize"
                        onClick={() => select(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {rateList && !open && !value && isAnimating && (
                <motion.div
                  initial={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-60"
                >
                  <div className="flex flex-col gap-2 flex-wrap">
                    {rateList.map((item) => (
                      <div className="flex gap-2 items-center" key={item.area}>
                        <div
                          className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer capitalize"
                          onClick={() => select(item.area)}
                        >
                          {item.area}
                        </div>

                        <div
                          className="bg-[#C9C9C9] px-3 py-0.5 text-p1 text-black w-max rounded-[14px] cursor-pointer capitalize"
                          onClick={() => select(item.area)}
                        >
                          £{item.rate}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end  mt-4">
                    <ChipButton onClick={() => postData()}>Next</ChipButton>
                  </div>
                </motion.div>
              )}

              {!open && value && (
                <motion.div layout transition={{ duration: 0.3 }}>
                  <div className="flex flex-col gap-2 flex-wrap">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-7"
                    >
                      <div className="flex gap-2">
                        <div className="flex flex-col gap-3 w-1/2">
                          <input
                            className={
                              "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
                            }
                            {...register("rate", {
                              required: "Required?",
                            })}
                            type="number"
                            name="rate"
                            autoComplete="off"
                            aria-invalid={errors.rate ? "true" : "false"}
                          />
                          {errors.rate && (
                            <p className="text-purple text-xs">
                              {errors.rate.message}
                            </p>
                          )}
                          <div className="text-[14px] leading-[17px]">
                            Service Charges <span className="text-[10px] leading-3 text-neutral-600">(£)</span>
                          </div>

                          <div className="flex gap-2 flex-wrap mt-3">
                            {packages.map((item) => (
                              <div
                                key={item}
                                className={clsx(
                                  "px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer capitalize",
                                  payment === item ? "bg-purple" : "bg-black"
                                )}
                                onClick={() => setPayment(item)}
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 w-1/2">
                          <input
                            className={
                              "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
                            }
                            {...register("experience", {
                              required: "Required?",
                            })}
                            type="number"
                            name="experience"
                            autoComplete="off"
                            aria-invalid={errors.experience ? "true" : "false"}
                          />
                          {errors.experience && (
                            <p className="text-purple text-xs">
                              {errors.experience.message}
                            </p>
                          )}
                          <div className="text-[14px] leading-[17px]">
                            Experience <span className="text-[10px] leading-3 text-neutral-600">(years)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end  justify-self-end">
                        <ChipButton type={"submit"}>Save</ChipButton>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
        <Loading open={loading} message={"Saving Info"} />
      </AnimatePresence>
    </ServiceProviderRegistrationLayout>
  );
}

export default PracticeArea;
