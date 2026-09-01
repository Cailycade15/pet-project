export type type_Get_Product = {
    id: number,
    title: string,
    price: number,
    image: string,
    description: string,
    category: string,
    rating: {
        rate: number,
        count: number
    }
}
export type type_Cart = {
    product: type_Get_Product,
    quantity: number;
}