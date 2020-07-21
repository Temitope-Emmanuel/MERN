

export const create = async (params,product) => {
    try{
        const response = await fetch(`/api/products/by/${params.shopId}`,{
            method:'POST',
            headers:{
                Authorization:`Bearer ${params.token}`,
                Accept:"application/json"
            },
            body:product
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}
export const listByShop = async (params, signal) => {
    try {
      let response = await fetch('/api/products/by/'+params.shopId, {
        method: 'GET',
        signal: signal
      })
      return response.json()
    } catch(err) {
      console.log(err)
    }
  }

export const remove = async (params) => {
    try{
        const response = await fetch(`/api/product/${params.shopId}/${params.productId}`,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${params.token}`,
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}