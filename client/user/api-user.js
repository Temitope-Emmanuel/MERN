
const follow = async (params,credentials,followId) => {
  try{
    let response = await fetch('/api/users/follow/',{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        Authorization:'Bearer ' + credentials.token
      },
      body:JSON.stringify({
        userId:params.userId,
        followId:followId
      })
    })
    return await response.json()
  }catch(err){
    console.log(err)
  }
}
const unfollow = async (params,credentials,unfollowId) => {
  try{
    let response = await fetch('/api/users/unfollow',{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.token
      },
      body:JSON.stringify({
        userId:params.userId,unfollowId:unfollowId
      })
    })
    return await response.json()
  }catch(err){
    console.log(err)
  }
}


export const create = async (user) => {
    try {
        let response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const list = async (signal) => {
    try {
      let response = await fetch('/api/user', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const read = async (params, credentials, signal) => {
    console.log("caling the read function")
    try {
      let response = await fetch('/api/user/' + params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.token
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const update = async (params, credentials, user) => {
    try {
      let response = await fetch('/api/user/' + params.userId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          // Comment out since we are sending a file
          // 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.token
        },
        body: user
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/user/' + params.userId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const findPeople = async (params,credentials,signal) => {
    try{
      let response = await fetch(`/api/users/findpeople/${params.userId}`,{
        method:'GET',
        signal:signal,
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization':`Bearer ${credentials.token}` 
        }
      })
      return await response.json()
    }catch(err){
      console.log(err)
    }
  }
  
  export {
    list,
    read,
    update,
    remove,
    follow,
    unfollow,
    findPeople
  }