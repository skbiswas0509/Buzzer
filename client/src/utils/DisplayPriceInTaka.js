export const DisplayPriceInTaka = (price)=>{
    return new Intl.NumberFormat('en-US',{
        style : 'currency',
        currency : 'BDT'
    }).format(price)
}