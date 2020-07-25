export const create = (params,auction) => {
    return fetch(`/api/auctions/by/${params.userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${params.token}`
        },
        body:auction
    }).then((response) => (
        response.json()
    )).catch(err => console.log(err))
}
export const listByOpen = async (signal) => {
    try{
        const response = await fetch('/api/auctions',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            signal
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}
export const listByBidder = async (params) => {
    console.log(params)
    try{
        const response = await fetch(`/api/auctions/bid/${params.userId}`,{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                Authorization:`Bearer ${params.token}`
            }
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}
export const listBySeller = async (params,signal) => {
    try{
        const response = await fetch(`/api/auctions/by/${params.userId}`,{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                Authorization:`Bearer ${params.token}`
            },
            signal
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}
export const update = async (params,auction) => {
    try{
        const response = await fetch(`/api/auctions/${params.auctionId}`,{
            method:'PUT',
            headers:{
                Accept:'application/json',
                Authorization:`Bearer ${params.token}`
            },
            body:auction
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}
export const remove = async (params) => {
    try{
        const response = await fetch(`/api/auctions/${params.auctionId}`,{
            method:'DELETE',
            headers:{
                Accept:'application/json',
                Authorization:`Bearer ${params.token}`
            }
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}
export const read = async (params,signal) => {
    try{
        const response = await fetch(`/api/auction/${params.auctionId}`,{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            signal
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}