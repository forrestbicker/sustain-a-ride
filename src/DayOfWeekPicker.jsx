import { useState } from "react";

const DayOfWeekPicker = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => (
        <div
          key={day}
          onClick={() => toggleDay(day)}
          className={`h-12 w-12 m-2 rounded-md flex justify-center items-center cursor-pointer mx-0.5 ${
            selectedDays.includes(day)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-500 hover:bg-blue-200"
          }`}
        >
          <div>{day[0]}</div>
        </div>
      ))}
    </div>
  );
};

export default DayOfWeekPicker;
