import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import Select from "./components/Select";

function Locale() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    history.replace("/play");
  };

  const language = [
    {
      name: "Urdu",
    },
    {
      name: "English",
    },
  ];

  const country = [
    {
      name: "United Kingdom",
    },
    {
      name: "Canada",
    },
  ];

  return (
    <AuthLayout>
      <div className="flex justify-between flex-col gap-8 h-full">
        <div />

        <div className="text-2xl leading-8 w-full text-center">Locale Info</div>
        <div className="flex justify-between flex-col gap-8">
          <Select label={"Language"} data={language}/>
          <Select label={"Country"}  data={country}/>
        </div>
        {/* <form
          className="flex justify-between flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        > */}
        {/* <div className="flex flex-col gap-1.5">
            <input
              className={
                "rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none"
              }
              placeholder="Preferred Language"
              {...register("language", {
                required: "Required",
              })}
              type="text"
              name="language"
            />
            {errors.language && (
              <p className="text-purple text-sm">{errors.language.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              className={
                "rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none"
              }
              placeholder="Country"
              {...register("country", {
                required: "Required",
              })}
              type="text"
              name="country"
            />
            {errors.country && (
              <p className="text-purple text-sm">{errors.country.message}</p>
            )}
          </div> */}

        <button
          className="bg-[#D9D9D960]  flex justify-between items-center rounded-xl py-[9px] px-3"
          // type="submit"
          onClick={() => history.replace("/play")}
        >
          <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
          <div className="text-sm">Done</div>
        </button>
        {/* </form> */}
        <div />
      </div>
    </AuthLayout>
  );
}

export default Locale;
