export const currency = {
    format: (num: number): string => {
        const options = {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }

        return Intl.NumberFormat("de-DE", options).format(num);
    }
}