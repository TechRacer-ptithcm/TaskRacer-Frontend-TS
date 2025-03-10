import dayjs from 'dayjs';
import "dayjs/locale/vi";

export const getCurrentDate = () => dayjs().toDate();

export const formatVietnameseDate = (date: Date) => {
    return dayjs(date).locale("vi").format("D [tháng] M, YYYY");
};

export const getMonth = (month = dayjs().month()) => {
    const year = dayjs().year();
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
    const daysInMonth = dayjs(new Date(year, month + 1, 0)).date();
    
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
    