import { useLocation, useHistory } from "react-router-dom";
import Base from "../../layout/Base";

function Error() {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const errorMessage = params.get("message") || "An unexpected error occurred";

  return (
    <Base>
      <div className="h-full flex flex-col items-center justify-center px-4 bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-red-500 text-white text-2xl font-bold p-4 text-center">
            Error
          </div>
          <div className="p-6">
            <p className="text-gray-700 text-lg mb-4">Something Went Wrong</p>
            <p className="text-gray-600 break-words">{errorMessage}</p>
          </div>
          <div className="bg-gray-100 px-4 pb-4">
            <button
              onClick={() => {
                history.go(-1);
              }}
              className="w-full bg-purple text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2  transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Error;
