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
