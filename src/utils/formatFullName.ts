export const formatFullName = (name: string, lastName: string) => {
    if (!name || !lastName) {
        throw new Error("Name and Last Name cannot be empty or undefined");
    }
    return name + " " + lastName;
}