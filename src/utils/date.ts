import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

const toDoubleTimeDigits = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

export const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${toDoubleTimeDigits(year)}-${toDoubleTimeDigits(month)}-${toDoubleTimeDigits(day)} ${toDoubleTimeDigits(hour)}:${toDoubleTimeDigits(minute)}:${toDoubleTimeDigits(second)}`;
  return result;
};

export const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  return formattedDate;
};
