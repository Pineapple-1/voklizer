
function Meet({ meet }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="bg-purple text-white rounded-md pl-1.5 text-base pr-4 py-0.5 whitespace-nowrap">
          {meet.date}
        </div>
        <div className="text-base capitalize">{meet.title.toLowerCase()}</div>
      </div>
      <div className="flex justify-between">
        <div className='capitalize'>{meet.description.toLowerCase()}</div>

        <div className="flex gap-3 items-center justify-center">
          <div>{meet.startTime}</div>
          <span className="font-bold">&gt;</span>

          <div>{meet.endTime}</div>
        </div>
      </div>
      <hr className="bg-purple h-0.5" />
    </div>
  );
}

export default Meet;
