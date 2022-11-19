export const date = {
    format: (date: Date | string): string => {
        date = (typeof date ===  'string') ? new Date(date) : date;

        const options: Intl.DateTimeFormatOptions = {
            dateStyle: 'medium',
        }

        return Intl.DateTimeFormat('de-DE', options).format(date)
    }
}