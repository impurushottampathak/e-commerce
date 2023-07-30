export interface cart{
    name:string,
    price:string,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number | undefined,
    quantity?:number,
    productId:number,
    userId:number
}