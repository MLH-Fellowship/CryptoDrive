import React from 'react';
import {TextField} from '@material-ui/core'
const SignUp=()=>{

    const [username,setUsername] = React.useState("") 
    return(
        <>
        <TextField label="Enter A Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        </>
    )
}

export default SignUp