import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import { GeometricButton } from "../../../components/GeometricButton";
import { useHistory, useLocation } from "react-router-dom";
import Instance from "../../../axios/Axios";
import clsx from "clsx";
import useSWR from "swr";
import MultiSelectDialog from "../../../components/MultiSelect.jsx";
import PracticeAreaModal from "../../../components/PracticeAreaModal.jsx";

function PracticeArea() {
  const history = useHistory();
  const location = useLocation();
  const {data: userData} = useSWR("auth/me");
  const {data:areas} = useSWR("service-provider/secondary-area");



  // Check if we're in edit mode
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";

  const { register, handleSubmit, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [areaDetails, setAreaDetails] = useState({});
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState([]);


  const packages = ["Per Hour", "Per Case", "Per Application", "Flat Fee"];


  // Helper function to map API rate type to display format
  const mapRateType = (apiRateType) => {
    const rateTypeMap = {
      "hour": "Per Hour",
      "case": "Per Case",
      "application": "Per Application",
      "flat": "Flat Fee"
    };
    return rateTypeMap[apiRateType.toLowerCase()] || apiRateType;
  };

  // Helper function to map experience number to dropdown value
  const mapExperience = (experienceYears) => {
    const years = parseInt(experienceYears);
    if (years >= 1 && years <= 3) return "1-3 years";
    if (years >= 4 && years <= 5) return "3-5 years";
    if (years > 5) return "5+ years";
    return "1-3 years"; // default
  };

  // Populate practice area data from userData when in edit mode
  useEffect(() => {
    if (isEditMode && userData?.data?.ServiceProvider?.PracticeAreas && !initialDataLoaded) {


      const practiceAreas = userData?.data?.ServiceProvider?.PracticeAreas;
      const transformedAreaDetails = {};

      practiceAreas.forEach((area) => {
        // Use area name as-is since API returns what we send
        transformedAreaDetails[area.area] = {
          experience: mapExperience(area.experience),
          payment: mapRateType(area.rate_type),
          price: area.rate.toString()
        };
      });

      setAreaDetails(transformedAreaDetails);
      setSelectedPracticeAreas(Object.keys(transformedAreaDetails));
      setInitialDataLoaded(true);
    }
  }, [isEditMode, userData, initialDataLoaded]);

  useEffect(() => {
    if (selectedArea && areaDetails[selectedArea]) {
      setValue("experience", areaDetails[selectedArea].experience || "");
      setValue("payment", areaDetails[selectedArea].payment || "");
      setValue("price", areaDetails[selectedArea].price || "");
    }
  }, [selectedArea, setValue]);

  const postData = (data) => {
    setLoading(true);
    const practiceAreas = selectedPracticeAreas
        .filter((area) => areaDetails[area]?.price && areaDetails[area]?.payment)
        .map((area) => {
          // Use area name as-is since API returns what we send
          const apiAreaName = area;
          const apiRateType = areaDetails[area].payment.toLowerCase().replace("per ", "");

          // Map experience back to number
          let experienceValue = 1;
          const exp = areaDetails[area].experience;
          if (exp === "1-3 years") experienceValue = 2;
          else if (exp === "3-5 years") experienceValue = 4;
          else if (exp === "5+ years") experienceValue = 6;

          return {
            area: apiAreaName,
            rate_type: apiRateType,
            rate: parseInt(areaDetails[area].price),
            experience_type: "year",
            experience: experienceValue,
          };
        });

    Instance.post("service-provider/practice-area", { practiceArea: practiceAreas }).then((res) => {
          console.log(res);
          if (isEditMode) {
            history.replace("/edit-company-info");
          } else {
            history.push("/video");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        })
        .finally(() => setLoading(false));
  };

  const toggleAreaSelection = (area) => {
    setSelectedArea(area);
    setAreaDetails((prev) => ({
      ...prev,
      [area]: prev[area] || { experience: "", payment: "", price: "" },
    }));
  };

  const handleDetailChange = (key, value) => {
    if (!selectedArea) return;
    setAreaDetails((prev) => ({
      ...prev,
      [selectedArea]: { ...prev[selectedArea], [key]: value },
    }));
  };

  const handlePracticeAreaSelection = (areas) => {
    setSelectedPracticeAreas(areas);
    
    // Initialize areaDetails for newly selected areas
    const newAreaDetails = { ...areaDetails };
    areas.forEach(area => {
      if (!newAreaDetails[area]) {
        newAreaDetails[area] = { experience: "", payment: "", price: "" };
      }
    });
    
    // Remove details for unselected areas
    Object.keys(newAreaDetails).forEach(area => {
      if (!areas.includes(area)) {
        delete newAreaDetails[area];
      }
    });
    
    setAreaDetails(newAreaDetails);
    
    // Auto-select first area if no area is currently selected or current area is no longer in the list
    if (areas.length > 0 && (!selectedArea || !areas.includes(selectedArea))) {
      setSelectedArea(areas[0]);
    } else if (areas.length === 0) {
      setSelectedArea(null);
    }
  };

  const removePracticeArea = (areaToRemove) => {
    const updatedAreas = selectedPracticeAreas.filter(area => area !== areaToRemove);
    handlePracticeAreaSelection(updatedAreas);
  };

  return (
      <ServiceProviderRegistrationLayout>
        <div className="flex flex-col gap-9 h-full justify-between">
          <div className="flex flex-col gap-4 w-full relative">
            <div className="text-sm leading-4">Practice Area</div>
            
            <PracticeAreaModal 
              items={areas?.data}
              placeholder="Select practice areas..."
              searchPlaceholder="Search practice areas..."
              selectedItems={selectedPracticeAreas}
              onSelectionChange={handlePracticeAreaSelection}
            />
            
            {selectedPracticeAreas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedPracticeAreas.map((area) => (
                  <div
                    key={area}
                    className={clsx(
                      "bg-black px-3 py-1 text-sm text-white rounded-[14px] flex items-center gap-2 transition-all duration-150 capitalize",
                      selectedArea === area ? "bg-purple" : "",
                      areaDetails[area]?.price ? "border border-white" : ""
                    )}
                  >
                    <span 
                      className="cursor-pointer"
                      onClick={() => toggleAreaSelection(area)}
                    >
                      {area} {areaDetails[area]?.price && ` (£${areaDetails[area].price})`}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePracticeArea(area);
                      }}
                      className="ml-1  text-white hover:text-purple transition-colors duration-150"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedArea && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                >
                  <form onSubmit={handleSubmit(postData)} className="flex flex-col gap-4">
                    <div className="text-sm leading-4">Experience Level ({selectedArea})</div>
                    <select
                        className="border-purple border-b-2 bg-transparent py-1.5 focus:outline-none rounded-none"
                        {...register("experience")}
                        value={areaDetails[selectedArea]?.experience || ""}
                        onChange={(e) => handleDetailChange("experience", e.target.value)}
                    >
                      <option value="">Select Experience</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>

                    <div className="text-sm leading-4">Payment Type ({selectedArea})</div>
                    <select
                        className="border-purple border-b-2 bg-transparent py-1.5 focus:outline-none rounded-none"
                        {...register("payment")}
                        value={areaDetails[selectedArea]?.payment || ""}
                        onChange={(e) => handleDetailChange("payment", e.target.value)}
                    >
                      <option value="">Select Payment Type</option>
                      {packages.map((item) => (
                          <option key={item} value={item}>{item}</option>
                      ))}
                    </select>

                    <div className="text-sm leading-4">Price ({selectedArea})</div>
                    <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="border-purple border-b-2 bg-transparent py-1.5 focus:outline-none w-40 text-sm rounded-none"
                        placeholder="£"
                        {...register("price")}
                        value={areaDetails[selectedArea]?.price || ""}
                        onChange={(e) => handleDetailChange("price", e.target.value)}
                    />

                    <div className="flex mt-4">
                      <div className="w-3/5 shrink-0">
                        <GeometricButton
                          type="submit"
                          variant="primary"
                          cut="right"
                          className="w-full"
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
                                type="button"
                                variant="primary"
                                onClick={() => history.push("/address")}
                                cut="left"
                                className="w-full"
                            >
                              Back
                            </GeometricButton>
                        )}
                      </div>
                    </div>
                  </form>
                </motion.div>
            )}
          </div>
        </div>
        <Loading open={loading} message={isEditMode ? "Updating Info" : "Saving Info"} />
      </ServiceProviderRegistrationLayout>
  );
}

export default PracticeArea;
