import { addDays , format} from 'date-fns'

export const getDateFromPeriod = (period: string, date: Date) => {
	console.log({period, date});
	
	switch (period) {
		case 'Daily':
			return format(addDays(new Date(date), 1), 'yyyy-MM-dd');
			break;
		case 'Two':
			return format(addDays(new Date(date), 2), 'yyyy-MM-dd');
			break;
		case 'Three':
			return format(addDays(new Date(date), 3), 'yyyy-MM-dd');
			break;
		case 'Weekly':
			return format(addDays(new Date(date), 7), 'yyyy-MM-dd');

			break;
	}
}

