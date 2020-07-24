export const create = async (params,order) => {
    try{
        let response = await fetch(`/api/order/${params.userId}`,{
            method:'POST',
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json",
                Authorization:`Bearer ${params.token}`
            },
            body:JSON.stringify({order})
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}

export const listByShop = async (params,signal) => {
    try{
        const response = await fetch(`/api/orders/shop/${params.shopId}`,{
            method:'GET',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${params.token}`
            },
            signal
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}
export const getStatusValues = async () => {
    try{
        const response = await fetch('/api/order/status_values',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
};
export const update = async (params,product) => {
    try{
        const response = await fetch(`/api/order/status/${params.shopId}`,{
            method:'PUT',
            headers:{
                "Accept":'application/json',
                "Content-Type":'application/json',
                "Authorization":`Bearer ${params.token}`
            },
            body:JSON.stringify(product)
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
};
export const cancelProduct = async (params,product) => {
    try{
        let response = await fetch(
            `/api/order/${params.shopId}/cancel/${params.productId}`,{
            method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-Type":'application/json',
                Authorization:`Bearer ${params.token}`
            },
            body:JSON.stringify(product)
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
};
export const processCharge = async () => {};