import { format, startOfDay } from 'date-fns';

export const formatDate = (date: Date | undefined): string | null => {
    if (!date) return null; 

    return format(startOfDay(date), 'yyyy-MM-dd');
};
