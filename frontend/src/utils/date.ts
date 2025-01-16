export const formatDateTime = (date: Date | string) => {
    const dateObj = new Date(date);

    const time = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });

    return `${time} - ${formattedDate}`;
};