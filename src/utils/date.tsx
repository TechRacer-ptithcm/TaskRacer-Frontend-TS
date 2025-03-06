import dayjs from 'dayjs';
import "dayjs/locale/vi";

export const getCurrentDate = () => dayjs().toDate();

export const formatVietnameseDate = (date: Date) => {
    return dayjs(date).locale("vi").format("D [tháng] M, YYYY");
};