const { signout } = require("./api-auth")

function authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
}

function isAuthenticated(){
    if(typeof window === "undefined"){
        return false
    }
    if(sessionStorage.getItem('jwt')){
        return JSON.parse(sessionStorage.getItem('jwt'))
    }else{
        return false
    }
}

function clearJWT(callback){
    if(typeof window !== "undefined"){
        sessionStorage.removeItem('jwt')
    }
    callback()
    signout.then((data) => {
        document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    })
}
function updateUser(user, cb) {
    if(typeof window !== "undefined"){
      if(sessionStorage.getItem('jwt')){
         let auth = JSON.parse(sessionStorage.getItem('jwt'))
         auth.user = user
         sessionStorage.setItem('jwt', JSON.stringify(auth))
         cb()
       }
    }
}


export {clearJWT,isAuthenticated,authenticate,updateUser}