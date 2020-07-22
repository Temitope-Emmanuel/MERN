
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
  
  const read = async (params, signal) => {
    try {
      let response = await fetch('/api/user/' + params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + params.token
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const update = async (params,user) => {
    try {
      let response = await fetch('/api/user/' + params.userId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + params.token
        },
        body: JSON.stringify(user)
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
  
  export {
    list,
    read,
    update,
    remove
  }