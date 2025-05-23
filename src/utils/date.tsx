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

export const formatVietnameseWeek = (date: Date): string => {
  const startOfWeek = dayjs(date).startOf("week");
  const endOfWeek = dayjs(date).endOf("week");

  const startMonth = startOfWeek.month() + 1;
  const endMonth = endOfWeek.month() + 1;
  const year = startOfWeek.year(); // giả định cùng năm

  if (startMonth === endMonth) {
    return `Tháng ${startMonth}, ${year}`;
  }

  return `Tháng ${startMonth} – Tháng ${endMonth}, ${year}`;
};

export const getWeekDays = (selectedDayStr: string) => {
  const today = dayjs();
  const selectedDay = dayjs(selectedDayStr);
  const startOfWeek = selectedDay.startOf('week');

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
