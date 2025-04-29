export const calculatehHoursSinceCreation = (createdAtString: string) => {

    const trimmedDateStr = createdAtString.split('.')[0];

    const createdAt = new Date(trimmedDateStr);
    const now = new Date();

    const diffInMs = now.getTime() - createdAt.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return Math.floor(diffInHours);
}