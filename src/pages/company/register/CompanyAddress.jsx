import React, {useState} from "react";
import {useForm} from "react-hook-form";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";
import {useHistory, useLocation} from "react-router-dom";
import Textbox from "../../../components/Textbox";
import {GeometricButton} from "../../../components/GeometricButton.jsx";
import Loading from "../../../components/Loading";
import Instance from "../../../axios/Axios";
import useSWR from "swr";

function CompanyAddress() {
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
                addressLine1: userData.data.ServiceProvider.addressLine1 || "",
                addressLine2: userData.data.ServiceProvider.addressLine2 || "",
                city: userData.data.ServiceProvider.city || "",
                postCode: userData.data.ServiceProvider.postCode || "",
                county: userData.data.ServiceProvider.county || ""
            };
        }
        return {
            addressLine1: "",
            addressLine2: "",
            city: "",
            postCode: "",
            county: ""
        };
    };
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: getInitialValues()
    });

    const onSubmit = (data) => {
        setLoading(true);
        Instance.post("service-provider/company-address", data)
            .then(() => {
                setLoading(false);
                if (isEditMode) {
                    history.replace("/edit-company-info");
                } else {
                    history.push("/practice-area");
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 justify-between h-full">
                <div className="flex flex-col gap-5">
                    <Textbox
                        label={"Address Line 1"}
                        {...register("addressLine1", {required: "Address Line 1 is required"})}
                        subtitle={errors.addressLine1?.message}
                    />

                    <Textbox
                        label={"Address Line 2"}
                        {...register("addressLine2")}
                    />

                    <div className="w-6/12">
                        <Textbox
                            label={"City"}
                            {...register("city", {required: "City is required"})}
                            subtitle={errors.city?.message}
                        />
                    </div>

                    <div className="w-4/12">
                        <Textbox
                            label={"Post Code"}
                            {...register("postCode", {
                                required: "Post Code is required"
                            })}
                            subtitle={errors.postCode?.message}
                        />
                    </div>

                    <div className="w-4/12">
                        <Textbox
                            label={"County"}
                            {...register("county", {required: "County is required"})}
                            subtitle={errors.county?.message}
                        />
                    </div>

                </div>

                <div className="flex">
                    <div className="w-3/5 shrink-0">
                        <GeometricButton
                            type="submit"
                            variant="primary"
                            cut="right"
                            className="w-full"
                            disabled={loading}
                        >
                            {isEditMode ? "Save" : "Next"}
                        </GeometricButton>
                    </div>
                    <div className="w-full -ml-2">
                        {isEditMode ? (
                            <GeometricButton
                                type="button"
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
                                onClick={() => history.push("/landline")}
                                cut="left"
                                className="w-full"
                            >
                                Back
                            </GeometricButton>
                        )}
                    </div>
                </div>
            </form>
            <Loading open={loading} message={isEditMode ? "Updating Info" : "Saving Info"}/>
        </ServiceProviderRegistrationLayout>
    );
}

export default CompanyAddress;
