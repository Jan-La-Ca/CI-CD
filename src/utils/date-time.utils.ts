import { format } from "date-fns";


export const formatDateToString = (date: string | Date) => {
    return format(date, 'yyyy-MM-dd HH:mm:ss'); 
}