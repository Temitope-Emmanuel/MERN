

export const create = async (params) => {
    console.log(params)
    try {
        let response = await fetch('/api/enrollment/new/'+params.courseId, {
          method: 'POST',
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

export const read = async(params,signal) =>{
    try{
        const response = await fetch(`/api/enrollment/${params.enrollmentId}`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${params.token}`,
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            signal
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
} 
export const complete = async (params,enrollment) => {
  console.log("Raehinc")
  try{
    let response = await fetch(`/api/enrollment/complete/${params.enrollmentId}`,{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        Authorization:`Bearer ${params.token}`
      },
      body:JSON.stringify(enrollment)
    })
    return await response.json()
  }catch(err){
    console.log(err)
  }
}

export const listEnrolled = async (credentials, signal) => {
  try {
    let response = await fetch('/api/enrollment/enrolled', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.token
      },
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
