export function formatDateTime(date: Date,isDay : boolean = true): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    if(isDay) {
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    } else {
        return `${day}/${month}/${year}`;
    }
}
export function fomatDateHours(date : Date) : string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function getRandomDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = Math.random() * (endTime - startTime) + startTime;
    return new Date(randomTime);
}

export function getDaysLeft(createdDate: Date): { days: number, status: string } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  
    const timeDiff = createdDate.getTime() - today.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); 
    if (dayDiff < 0) {
        return { days: Math.abs(dayDiff), status: "Day Left" };
    } else if (dayDiff === 0) {
        return { days: 0, status: "Today" };
    }
    return { days: dayDiff, status: "Reminder" };
}

