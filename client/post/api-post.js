
export const listNewsFeed = async (params,credential,signal) => {
    try{
        let response = await fetch(`/api/posts/feed/${params.userId}`,{
            method:'GET',
            signal:signal,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`Bearer ${credential.token}`
            }
        })
        return await response.json()
    }catch(err){
        console.log(err)        
    }
}
export const create = async (params,credentials,post) => {
    try{
        let response = await fetch(`/api/posts/new/${params.userId}`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Authorization':`Bearer ${credentials.token}`
            },
            body:post
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}