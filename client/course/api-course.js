export const create = async (params, course) => {
    try {
        let response = await fetch('/api/courses/by/'+ params.userId, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + params.token
          },
          body: course
        })
          return response.json()
        } catch(err) { 
          console.log(err)
        }
}

export const listByInstructor = async (params, signal) => {
    try {
      let response = await fetch('/api/courses/by/'+params.userId, {
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
export const read = async (params, signal) => {
    try {
      let response = await fetch('/api/courses/' + params.courseId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}
export const newLesson = async (params, lesson) => {
  try {
    let response = await fetch('/api/courses/'+params.courseId+'/lesson/new', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + params.token
      },
      body: JSON.stringify({lesson})
    })
    return response.json()
  } catch(err){
    console.log(err)
  }
}

export const update = async (params,course) => {
  try {
    let response = await fetch('/api/courses/' + params.courseId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + params.token
      },
      body: course
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
export const remove = async (params) => {
  try {
    let response = await fetch('/api/courses/' + params.courseId, {
      method: 'DELETE',
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



  