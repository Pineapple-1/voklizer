import Star from "../../../assets/icons/Star";
import {useHistory} from "react-router-dom";
import {CircleX} from "lucide-react";
import {User} from "lucide-react";


function Reel({id, name, place, thumbnail}) {
  const history = useHistory();
  return (
    <div
      className="flex flex-col gap-2 relative shrink-0 "
      onClick={() => history.push(`/player/${id}`)}
    >
      <div className='rounded-lg overflow-hidden w-[118px] h-[213px]  border-2 border-black bg-black'>
        <div className=" relative  h-[167px] overflow-hidden">
          <img className="w-[118px] h-[180px]  " src={thumbnail} alt=""/>
        </div>
        <div className=' h-12 w-full flex flex-col relative z-10 items-center justify-between -mt-8 '>
          <div
            className='bg-black w-12 h-12 rounded-full flex items-center justify-center border border-white shrink-0'>
            <img src="/Play.svg" className='w-4' alt=""/>
          </div>

          <div
            className="mx-auto mt-1  items-center justify-center flex  gap-1">
            <Star/>
            <div className="text-base leading-[18px] text-white ">4.98</div>
          </div>

        </div>
      </div>
      <div className="flex justify-between">
        <div className='flex gap-1 items-center font-bold'>
          <CircleX className='w-4 h-4'/>
          4%
        </div>
        <div className='flex gap-1 items-center font-bold'><User className='w-4 h-4'/>
          88%
        </div>

      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="text-base leading-[13px] font-bold">{name}</div>
        <div className="text-sm leading-[10px] text-[#B1B1B1]">{place}</div>
      </div>
    </div>
  );
}

export default Reel;
