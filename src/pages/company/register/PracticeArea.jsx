import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import ChipButton from "../../../components/ChipButton";
import { useHistory } from "react-router-dom";
import Instance from "../../../axios/Axios";
import clsx from "clsx";

function PracticeArea() {
  const history = useHistory();
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [areaDetails, setAreaDetails] = useState({});

  const languages = [
    "Immigration",
    "Property",
    "Personal Injury",
    "Criminal Law",
    "Family Law",
    "Property Law",
  ];
  const packages = ["Per Hour", "Per Case", "Per Application", "Flat Fee"];

  useEffect(() => {
    if (selectedArea && areaDetails[selectedArea]) {
      setValue("experience", areaDetails[selectedArea].experience || "");
      setValue("payment", areaDetails[selectedArea].payment || "");
      setValue("price", areaDetails[selectedArea].price || "");
    }
  }, [selectedArea, setValue]);

  const postData = (data) => {
    setLoading(true);
    const practiceAreas = Object.keys(areaDetails)
      .filter((area) => areaDetails[area].price && areaDetails[area].payment)
      .map((area) => ({
        area: area.toLowerCase().replace(" ", ""),
        rate_type: areaDetails[area].payment,
        rate: areaDetails[area].price,
        experience_type: "year",
        experience: areaDetails[area].experience,
      }));

    Instance.post("service-provider/practice-area", { practiceArea: practiceAreas })
      .then((res) => {
        console.log(res);
        history.push("/video");
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

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9 h-full justify-center">
        <div className="flex flex-col gap-4 w-full relative">
          <div className="text-sm leading-4">Practice Area</div>
          <div className="flex flex-wrap gap-2">
            {languages.map((item) => (
              <div
                key={item}
                className={clsx(
                  "bg-black px-3 py-0.5 text-sm text-white w-max rounded-[14px] cursor-pointer capitalize transition-all duration-150",
                  selectedArea === item ? "bg-purple" : "",
                  areaDetails[item]?.price ? "border border-white" : ""
                )}
                onClick={() => toggleAreaSelection(item)}
              >
                {item} {areaDetails[item]?.price && ` (£${areaDetails[item].price})`}
              </div>
            ))}
          </div>

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
                  className="border-purple border-b-2 bg-transparent py-1.5 focus:outline-none"
                  {...register("experience")}
                  onChange={(e) => handleDetailChange("experience", e.target.value)}
                >
                  <option value="">Select Experience</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>

                <div className="text-sm leading-4">Payment Type ({selectedArea})</div>
                <select
                  className="border-purple border-b-2 bg-transparent py-1.5 focus:outline-none"
                  {...register("payment")}
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
                  onChange={(e) => handleDetailChange("price", e.target.value)}
                />

                <div className="flex justify-end mt-4">
                  <ChipButton type="submit">Next</ChipButton>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export default PracticeArea;
