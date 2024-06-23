import React from "react";
import UserHomeLayout from "../../layout/UserHomeLayout";

import Pitch from "./components/Pitch";
import useSwr from "swr";
import Loading from "../../components/Loading";
function QueryListing() {
  const { data, isLoading } = useSwr("job-notifications?page=1&pageSize=5");

  return (
    <UserHomeLayout>
      <div className="flex flex-col items-center h-full justify-end gap-6 my-6">
        {!isLoading &&
          data?.data.map((item, index) => (
            <Pitch
              location={"Lahore"}
              area={item.category}
              focus={index === 0 ? true : false}
              url={item.userMessageLink}
              jobId={item.jobId}
            />
          ))}
      </div>
      <Loading open={isLoading} message={"Fetching jobs"} />
    </UserHomeLayout>
  );
}

export default QueryListing;
