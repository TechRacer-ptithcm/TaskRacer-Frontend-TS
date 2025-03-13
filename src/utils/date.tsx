import dayjs from "dayjs";
import "dayjs/locale/vi";

export const getCurrentDate = () => dayjs().toDate();

export const formatVietnameseDate = (date: Date) => {
  return dayjs(date).locale("vi").format("D [tháng] M, YYYY");
};

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  const arr = [];
  let currentDay = 1 - firstDayOfMonth;

  for (let week = 0; week < 6; week++) {
    const weekArr = [];
    for (let day = 0; day < 7; day++) {
      weekArr.push(dayjs(new Date(year, month, currentDay)));
      currentDay++;
    }
    arr.push(weekArr);
  }

  return arr;
};

export const formatVietnameseMonth = (date: Date): string => {
  return `Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
};

export const getWeekDays = (selectedDay: Date) => {
  const today = dayjs();
  const startOfWeek = dayjs(selectedDay).startOf('week');
  
  return Array.from({ length: 7 }, (_, i) => {
    const day = startOfWeek.add(i, 'day');
    return {
      date: day,
      isToday: day.isSame(today, 'day'),
      isSelected: day.isSame(selectedDay, 'day'),
    };
  });
};

export const get24Hours = () => {
  const startOfDay = dayjs().startOf('day');
  return Array.from({ length: 24 }, (_, i) => startOfDay.add(i, 'hour'));
};

export const isCurrentDate = (date: dayjs.Dayjs): boolean => {
  return date.isSame(dayjs(), 'day');
};
