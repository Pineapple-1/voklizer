import { useState } from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import ChipButton from "../../../components/ChipButton";
import { useHistory } from "react-router-dom";
import Instance from "../../../axios/Axios";
import { useForm } from "react-hook-form";

function CompanyEmailWebsite() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/company-info", data)
      .then(() => {
        setLoading(false);
        history.push("/otp");
      })
      .finally(() => reset());
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 w-full">
              <input
                className={
                  "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
                }
                {...register("companyWebsite", {
                  required: "company website is required?",
                })}
                type="text"
                name="companyWebsite"
                autoComplete="off"
                aria-invalid={errors.companyWebsite ? "true" : "false"}
              />
              {errors.companyWebsite && (
                <p className="text-purple text-sm">
                  {errors.companyWebsite.message}
                </p>
              )}
              <div className="text-[14px] leading-[17px]">Company Website</div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <input
                className={
                  "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
                }
                {...register("companyEmail", {
                  required: "company email is required?",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email Address e.g johndoe@example.com",
                  },
                })}
                type="text"
                name="companyEmail"
                autoComplete="off"
                aria-invalid={errors.companyEmail ? "true" : "false"}
              />
              {errors.companyEmail && (
                <p className="text-purple text-sm">
                  {errors.companyEmail.message}
                </p>
              )}
              <div className="text-[14px] leading-[17px]">
                Company Email Address
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <ChipButton onClick={() => history.push("reg-num")}>
              Back
            </ChipButton>
            <ChipButton type={"submit"}>Next</ChipButton>
          </div>
        </form>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export default CompanyEmailWebsite;
