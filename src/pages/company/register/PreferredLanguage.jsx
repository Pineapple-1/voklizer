import { useState } from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import ChipButton from "../../../components/ChipButton";
import { useHistory, useLocation } from "react-router-dom";
import Instance from "../../../axios/Axios";
import SelectIcon from "../../../assets/icons/SelectIcon";

function PreferredLanguage() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // Check if we're in edit mode
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";

  const languages = ["english", "urdu", "spanish", "french"];
  const [value, setValue] = useState([]);

  const submit = () => {
    setLoading(true);
    Instance.post("service-provider/preferred-language", {
      preferredLanguages: value,
    })
      .then((res) => {
        console.log(res);
        if (isEditMode) {
          history.replace("/landing");
        } else {
          history.push("/reg-name");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-4 w-full relative">
          <div className="flex gap-2 absolute -top-6 left-0">
            {value.length > 0 ? (
              value.map((item) => (
                <div
                  className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer"
                  onClick={() =>
                    setValue((value) => value.filter((v) => v !== item))
                  }
                  key={item}
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="mt-2 text-sm leading-4">
                Preferred Language/s
              </div>
            )}
          </div>
          <div
            className={
              "caret-transparent cursor-pointer rounded-none text-base border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none h-0.5"
            }
          />
          <div className="absolute -top-1 right-0">
            <SelectIcon />
          </div>

          <div className="flex gap-2 flex-wrap">
            {languages.map((item) => (
              <div
                className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer capitalize"
                onClick={() =>
                  value.includes(item)
                    ? value
                    : setValue((value) => [...value, item])
                }
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          {isEditMode ? (
            <ChipButton
              onClick={() => history.replace("/landing")}
              className="bg-gray-200 text-purple"
            >
              Cancel
            </ChipButton>
          ) : (
            <div></div> // Empty div to maintain spacing when no back button is needed
          )}
          <ChipButton
            onClick={() => submit()}
            disabled={value.length === 0}
          >
            {isEditMode ? "Save" : "Next"}
          </ChipButton>
        </div>
      </div>
      <Loading open={loading} message={isEditMode ? "Updating Info" : "Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export default PreferredLanguage;