import React from "react";
import useSwr from "swr";
import Base from "../../layout/Base";
import MessageGroup from "./components/MessageGroup";
import Loading from "../../components/Loading";

function Queries() {
  const { data, isLoading } = useSwr("user-jobs?page=1");
  return (
    <Base>
      <div className="flex flex-col gap-8">
        {!isLoading &&
          data?.jobs?.map((item) => (
            <MessageGroup job={item} />
          ))}
      </div>
      <Loading open={isLoading} message={"Fetching Queries"} />
    </Base>
  );
}

export default Queries;
