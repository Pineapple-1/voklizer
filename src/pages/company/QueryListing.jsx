import React from "react";
import UserHomeLayout from "../../layout/UserHomeLayout";

import Pitch from "./components/Pitch";
import useSwr from "swr";

function QueryListing() {
  const { data, isLoading } = useSwr("job-notifications?page=1&pageSize=5");

  return (
    <UserHomeLayout>
      <div className="flex flex-col items-center h-full justify-end gap-6 my-6">
        {!isLoading ? (
          data?.data.map((item, index) => (
            <Pitch
              location={"Lahore"}
              area={item.category}
              focus={index === 0 ? true : false}
              url={item.userMessageLink}
              jobId={item.jobId}
            />
          ))
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="w-full h-[200px]  bg-[#c0c0c0]  rounded-xl animate-pulse"></div>
            <div className="w-full h-[200px]  bg-[#c0c0c0]  rounded-xl animate-pulse"></div>
          </div>
        )}
      </div>
    </UserHomeLayout>
  );
}

export default QueryListing;
