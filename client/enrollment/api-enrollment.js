

export const create = async (params) => {
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
