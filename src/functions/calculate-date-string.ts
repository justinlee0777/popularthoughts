import { format } from 'date-fns';

export function calculateDateString(isoString: string = null): string {
	return format(new Date(isoString), 'MMMMMM dd, yyyy');
}
