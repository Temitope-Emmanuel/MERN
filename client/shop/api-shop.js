export const create = async (params, shop) => {
    try {
      let response = await fetch('/api/shops/by/'+ params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + params.token
        },
        body: shop
      })
        return response.json()
      } catch(err) { 
        console.log(err)
      }
  }

export const list = async (signal) => {
    try {
      let response = await fetch('/api/shops', {
        method: 'GET',
        signal: signal
      })
      return response.json()
    }catch(err) {
      console.log(err)
    }
  }
export const listByOwner = async (params, signal) => {
    try {
    let response = await fetch('/api/shops/by/'+params.userId, {
    method: 'GET',
    signal: signal,
    headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + params.token
    }
    })
    return response.json()
  } catch(err){
    console.log(err)
    }
    }
export const read = async(params,signal) => {
  try{
    const response = await fetch(`/api/shop/${params.shopId}`,{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      signal
    })
    return await response.json()
  }catch(err){
    console.log(err)
  }
}
export const update = async (params,body) => {
  try{
    const response = await fetch(`/api/shop/${params.shopId}`,{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        Authorization:`Bearer ${params.token}`
      },
      body
    })
    return response.json()
  }catch(err){
    console.log(err)
  }
}
  