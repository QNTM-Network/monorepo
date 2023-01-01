import { addDays , format, isBefore } from 'date-fns'

export const getDateFromPeriod = (period: string, date: Date) => {
	console.log({period, date});
	
	switch (period) {
		case 'Daily':
			return format(addDays(new Date(date.setHours(3,0,0,0)), 1), 'yyyy-MM-dd hh:mm:ss');
			break;
		case 'Two':
			return format(addDays(new Date(date.setHours(3,0,0,0)), 2), 'yyyy-MM-dd hh:mm:ss');
			break;
		case 'Three':
			return format(addDays(new Date(date.setHours(3,0,0,0)), 3), 'yyyy-MM-dd hh:mm:ss');
			break;
		case 'Weekly':
			return format(addDays(new Date(date.setHours(3,0,0,0)), 7), 'yyyy-MM-dd hh:mm:ss');
		case 'Fortnightly':
			return format(addDays(new Date(date.setHours(3,0,0,0)), 14), 'yyyy-MM-dd hh:mm:ss');
			break;
		case 'Monthly':
			return format(addDays(new Date(date.setHours(3,0,0,0)), 30), 'yyyy-MM-dd hh:mm:ss');
			break;
	}
}

