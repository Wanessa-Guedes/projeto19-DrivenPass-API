
function checkUserId(userIdCredential: number, userIdLog: number){
    
    if(userIdCredential !== userIdLog){
        throw {
            type: "unauthorized",
            message: "User not authorized"
        }
    }

    return "ok"
}

export const checkUserAuthorization = {
    checkUserId
}