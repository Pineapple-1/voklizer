import {useState} from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import ChipButton from "../../../components/ChipButton";
import {useHistory, useLocation} from "react-router-dom";
import Instance from "../../../axios/Axios";
import {useForm} from "react-hook-form";
import useSWR from "swr";

function CompanyName() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // Check if we're in edit mode
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";

  const {data: userData} = useSWR("auth/me");

  // Get initial values for the form
  const getInitialValues = () => {
    if (isEditMode && userData?.data?.ServiceProvider) {
      return {
        companyName: userData.data.ServiceProvider.companyName || ""
      };
    }
    return {
      companyName: ""
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: getInitialValues()
  });

  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/company-name", data)
      .then(() => {
        setLoading(false);
        if (isEditMode) {
          history.replace("/landing");
        } else {
          history.push("/reg-num");
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
          <div className="flex flex-col gap-3">
            <input
              className={
                "rounded-none text-base border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none w-full"
              }
              {...register("companyName", {
                required: "Company name is required",
              })}
              type="text"
              name="companyName"
              autoComplete="off"
              aria-invalid={errors.companyName ? "true" : "false"}
            />
            {errors.companyName && (
              <p className="text-purple text-sm">
                {errors.companyName.message}
              </p>
            )}
            <div className="text-sm leading-[17px]">Company Name</div>
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
              <ChipButton onClick={() => history.push("/preferred-language")}>
                Back
              </ChipButton>
            )}
            <ChipButton type={"submit"}>
              {isEditMode ? "Save" : "Next"}
            </ChipButton>
          </div>
        </form>
      </div>
      <Loading open={loading} message={isEditMode ? "Updating Info" : "Saving Info"}/>
    </ServiceProviderRegistrationLayout>
  );
}

export default CompanyName;