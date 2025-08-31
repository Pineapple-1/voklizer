import {useState, useEffect} from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import {GeometricButton} from "../../../components/GeometricButton";
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
  
  // Debug logs removed to avoid noisy console output

  const {data: userData} = useSWR("auth/me");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      companyName: ""
    }
  });

  // Update form values when userData is available and we're in edit mode
  useEffect(() => {
    if (isEditMode && userData?.data?.ServiceProvider) {
      setValue("companyName", userData.data.ServiceProvider.companyName || "");
    }
  }, [userData, isEditMode, setValue]);

  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/company-name", data)
      .then(() => {
        setLoading(false);
        if (isEditMode) {
          history.replace("/edit-company-info");
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
      <div className="flex flex-col gap-9 h-full justify-between">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 h-full justify-between">
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
          <div className="flex">
            <div className="w-3/5">
              <GeometricButton
                  type={"submit"}
                  variant="primary"
                  cut="right"
                  className="w-full"
              >
                  {isEditMode ? "Save" : "Next"}
              </GeometricButton>
            </div>
            <div className="w-2/5">
              {isEditMode ? (
                <GeometricButton
                  type={"button"}
                  variant="secondary"
                  cut="left"
                  className="w-full"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); history.replace("/edit-company-info"); }}
                >
                  Cancel
                </GeometricButton>
              ) : (
                <GeometricButton 
                  variant="primary"
                  onClick={() => history.push("/preferred-language")}
                  cut="left"
                  className="w-full"
                >
                  Back
                </GeometricButton>
              )}
            </div>
          </div>
        </form>
      </div>
      <Loading open={loading} message={isEditMode ? "Updating Info" : "Saving Info"}/>
    </ServiceProviderRegistrationLayout>
  );
}

export default CompanyName;
