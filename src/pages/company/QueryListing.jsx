import React from "react";
import UserHomeLayout from "../../layout/UserHomeLayout";

import Pitch from "./components/Pitch";
import useSwr from "swr";

function QueryListing() {
  const { data, isLoading } = useSwr("user-jobs?page=1&limit=5");

  console.log(data);

  return (
    <UserHomeLayout>
      <div className="flex flex-col items-center h-full justify-end gap-6 my-6">
        {!isLoading ? (
          data.jobs.map((item, index) => (
            <Pitch
              location={"Lahore"}
              area={"Medical"}
              focus={index === 0 ? true : false}
              url={item.messageLink}
              jobId={item.id}
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
