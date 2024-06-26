import { useState } from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import ChipButton from "../../../components/ChipButton";
import { useHistory } from "react-router-dom";
import Instance from "../../../axios/Axios";
import SelectIcon from "../../../assets/icons/SelectIcon";

function PracticeArea() {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const languages = [
    "imigration",
    "Property",
    "Personal Injury",
    "Criminal Law",
    "Family Law",
    "Property Law",
  ];
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  const submit = () => {
    setLoading(true);
    Instance.post("service-provider/practice-area", {
      practiceArea: value,
    })
      .then((res) => {
        console.log(res);
        history.push("/listing");
      })
      .finally(() => setLoading(false));
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div
          className="flex flex-col gap-4 w-full relative"
          onClick={() => setOpen(true)}
        >
          <div className="flex gap-2 absolute -top-6 left-0">
            {value &&
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
              ))}
          </div>
          <div
            className={
              "caret-transparent cursor-pointer rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none h-0.5"
            }
          />
          <div className="absolute -top-1 right-0">
            <SelectIcon />
          </div>
          <div className="text-[14px] leading-4">Practice Area</div>
          {open && (
            <div className="flex flex-col gap-2 flex-wrap">
              {languages.map((item) => (
                <div className="flex gap-2">
                  <div
                    className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer capitalize"
                    onClick={() =>
                      value?.includes(item) ? value : setValue([item])
                    }
                    key={item}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <ChipButton onClick={() => submit()}>Next</ChipButton>
        </div>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export default PracticeArea;
