import UserHomeLayout from "../../layout/UserHomeLayout";
import {useHistory} from "react-router-dom";
import ChipButton from "../../components/ChipButton";

const EditCompanyInfo = () => {
  const history = useHistory();

  const editOptions = [
    { title: "Company Name", route: "/reg-name" },
    { title: "Email & Website", route: "/reg-email" },
    { title: "Company Registration Number", route: "/reg-num" },
    { title: "Practice Area", route: "/practice-area" },
    { title: "Preferred Language", route: "/preferred-language" },
    { title: "Video Ad", route: "/video" },
  ];
  const handleNavigate = (route) => {
    history.push(`${route}?edit=true`);
  };

  return (
    <UserHomeLayout>
      <div className="h-full flex flex-col gap-6 pt-14 pb-10">
        <h1 className="text-2xl font-semibold text-black ">Edit Company Information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-md border border-neutral-200 p-4 flex flex-col">
              <h2 className="text-lg font-medium mb-2 text-neutral-800">{option.title}</h2>
              <p className="text-neutral-500 mb-6 flex-grow">
                Update your {option.title.toLowerCase()} information
              </p>
              <div className="flex justify-end">
                <ChipButton className='rounded-md p-0' onClick={() => handleNavigate(option.route)}>
                  Edit
                </ChipButton>
              </div>
            </div>
          ))}
        </div>

      </div>
    </UserHomeLayout>
  );
};

export default EditCompanyInfo;