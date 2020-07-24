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