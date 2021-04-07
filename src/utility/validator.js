// This module is used for validation of different possible edge cases with respect to sessions and used effectively for checking the passhash and public key

// Function used to get the passhash from the local storage

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

// Function used to get the username from the local storage

function getUserName() {
    const tokenString = localStorage.getItem("user_name");
    if(tokenString){
    const userToken = JSON.parse(tokenString);
    return userToken;}
    else{
      return false;
    }
}

// Validation Function to get the username and passhash in one go

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

// Exporting the Validator

export default Validator;