import { useState } from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import ChipButton from "../../../components/ChipButton";
import { useHistory, useLocation } from "react-router-dom";
import Instance from "../../../axios/Axios";
import { useForm } from "react-hook-form";
import useSWR from "swr";

function CompanyEmailWebsite() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // Check if we're in edit mode
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";

  // Fetch user data
  const { data: userData } = useSWR("auth/me");

  // Get initial values for the form
  const getInitialValues = () => {
    if (isEditMode && userData?.data?.ServiceProvider) {
      return {
        companyWebsite: userData.data.ServiceProvider.companyWebsite || "",
        companyEmail: userData.data.ServiceProvider.companyEmail || ""
      };
    }
    return {
      companyWebsite: "",
      companyEmail: ""
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getInitialValues()
  });

  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/company-info", data)
      .then(() => {
        setLoading(false);
        if (isEditMode) {
          history.replace("/landing");
        } else {
          history.push("/otp");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setLoading(false);
      })
      .finally(() => reset());
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7" onReset={() => history.replace("/landing")}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 w-full">
              <input
                className={
                  "rounded-none text-base border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none w-full"
                }
                {...register("companyWebsite", {
                  required: "Company website is required",
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
              <div className="text-sm leading-[17px]">Company Website</div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <input
                className={
                  "rounded-none text-base border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none w-full"
                }
                {...register("companyEmail", {
                  required: "Company email is required",
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
              <div className="text-sm leading-[17px]">
                Company Email Address
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            {isEditMode ? (
              <ChipButton
                type={"reset"}
                className="bg-gray-200 text-purple"
              >
                Cancel
              </ChipButton>
            ) : (
              <ChipButton onClick={() => history.push("/reg-num")}>
                Back
              </ChipButton>
            )}
            <ChipButton type={"submit"}>
              {isEditMode ? "Save" : "Next"}
            </ChipButton>
          </div>
        </form>
      </div>
      <Loading open={loading} message={isEditMode ? "Updating Info" : "Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export default CompanyEmailWebsite;