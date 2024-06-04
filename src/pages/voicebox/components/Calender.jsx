import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

function Calender({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={"p-6 bg-[#F9F3FF] w-full border-y border-black"}
      classNames={{
        months: "flex flex-col ",
        month: "space-y-6",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "flex items-center justify-between ",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full ",
        head_row: "flex justify-between  ",
        head_cell: "text-[#263238] rounded-md w-10 font-bold text-[0.8rem]",
        row: "flex w-full mt-2 justify-between  ",
        day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
        cell: "h-10 w-10 text-center text-[12px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",

        day_range_end: "day-range-end",
        day_selected:
          "bg-purple text-white hover:bg-purple hover:text-white  rounded-full",
        day_today: "bg-black text-white  rounded-full",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-[#263238]" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-[#263238]" />
        ),
      }}
      {...props}
    />
  );
}

export default Calender;
