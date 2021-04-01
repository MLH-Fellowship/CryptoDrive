function getPassHash() {
    const tokenString = localStorage.getItem("public_hash");
    if(tokenString){
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    else{
        return false;
    }
  }

function getUserName() {
    const tokenString = localStorage.getItem("user_name");
    if(tokenString){
    const userToken = JSON.parse(tokenString);
    return userToken;}
    else{
      return false;
    }
}

function Validator(key){
    switch (key) {
        case 'publicHash':
            return getPassHash();
        case 'username':
            return getUserName();
        default:
            break;
    }
}

export default Validator;