export const existsInArray = (id: string, array: any[]) => {
    return array.filter((e) => e._id === id)[0];
}