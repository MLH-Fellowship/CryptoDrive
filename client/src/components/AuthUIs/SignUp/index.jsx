import React from 'react';
import {TextField, Grid} from '@material-ui/core'
import loadWeb3 from './../../../Web3/LoadWeb3';
import ContractConnect from './../../../Web3/ContractConnect'
import EncrptPublicKey from './../../Cryptography/Encryption'
import DecryptPrivateKey from './../../Cryptography/Decryption'
const NodeRSA = require("node-rsa");
const SignUp=()=>{

    const [username,setUsername] = React.useState("") 
    const [pubKey,setPubKey] = React.useState("")
    const [privateKey,setPrivate] = React.useState("")
    const [contract, setContract] = React.useState("")

    React.useEffect(async()=>{
        
        await loadWeb3();
        console.log("Web3 Loaded")
        const Contract = await ContractConnect();
        setContract(Contract)
        await generateKeyPair();
        
    },[])

    const generateKeyPair = async () => {
        const key = await new NodeRSA({ b: 2048 });
        const public_key = key.exportKey("public");
        const private_key = key.exportKey("private");
        setPrivate(private_key);
        setPubKey(public_key);
        const encrypted_text= await EncrptPublicKey("username",public_key);
        console.log(encrypted_text);
        const decrypted_text= await DecryptPrivateKey(encrypted_text,private_key);
        console.log(decrypted_text==='username')
    };
    
    
    
    return(
        <Grid container spacing={4}>
               <Grid item xs={12} sm={12} md={4} lg={4}><br/>
        <b>You will be recieving a Private Key, which you need to keep it safe, in order to access the files.</b>
        <br/><br/>
        {pubKey&&<h3>Public Key<br/>
         <TextField disabled value={pubKey} > <span  style={{color:'red'}}>
             {pubKey}
             </span>
        </TextField></h3>
        } <br/><br/>
        {privateKey&&<h3>Private Key<br/>
         <TextField disabled value={privateKey} >
              <span style={{color:'red'}} >{privateKey}</span>
              </TextField>
        </h3>}
        </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
        <TextField fullWidth label="Enter A Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        </Grid>
        
        </Grid>
    )
}
export default SignUp