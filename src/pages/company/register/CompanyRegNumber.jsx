import { useState } from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import ChipButton from "../../../components/ChipButton";
import { useHistory } from "react-router-dom";
import Instance from "../../../axios/Axios";
import { useForm } from "react-hook-form";

function CompanyRegNumber() {
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
    Instance.post("service-provider/company-registration-number", data)
      .then(() => {
        setLoading(false);
        history.push("/reg-email");
      })
      .finally(() => reset());
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <input
              className={
                "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
              }
              {...register("companyRegistrationNumber", {
                required: "company registration number is required?",
              })}
              type="text"
              name="companyRegistrationNumber"
              autoComplete="off"
              aria-invalid={errors.companyRegistrationNumber ? "true" : "false"}
            />
            {errors.companyRegistrationNumber && (
              <p className="text-purple text-sm">
                {errors.companyRegistrationNumber.message}
              </p>
            )}
            <div className="text-[14px] leading-[17px]">
              Company Registration Number
            </div>
          </div>
          <div className="flex justify-between">
            <ChipButton onClick={() => history.push("reg-name")}>
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

export default CompanyRegNumber;
