import queryString from 'querystring'

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
export const read = async(params,signal) => {
    console.log(params)
    try{
        const response = await fetch(`/api/products/${params.productId}`,{
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

export const listLatest = async (signal) => {
    try{
        let response = await fetch('/api/products/latest',{
            method:'GET',
            signal
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}

export const listRelated = async (params,signal) => {
    try{
        let response = await fetch(`/api/products/related/${params.productId}`,{
            method:'GET',
            signal
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}
export const update = async (params, product) => {
    console.log("successful calling",params)
    try {
      let response = await fetch(`/api/product/${params.shopId}/${params.productId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + params.token
        },
        body: product
      })
      return response.json()
    } catch(err) {
      console.log(err)
    }
}

export const listCategories = async (signal) => {
    console.log("calling the list category")
    try{
        const response = await fetch('/api/products/categories',{
            method:'GET',
            signal:signal
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}

export const list = (params) => {
    const query = queryString.stringify(params)

    return fetch(`/api/products?${query}`,{
        method:'GET'
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}
  
  