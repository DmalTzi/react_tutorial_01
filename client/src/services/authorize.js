export const authenticate = (response,next)=>{
    if(window !=="undefined"){
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.username))
    }next()
}

// pull token data
export const getToken=()=>{
    if(window !=="undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

// pull token data
export const getUser= () => {
    if(window !== "undefiend"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
    }
}

export const logout= (next) =>{
    if(window !== "undefiend"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }next()
}