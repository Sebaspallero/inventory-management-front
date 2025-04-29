export const calculateOrderTotal = (items: any) => {
    return items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
};