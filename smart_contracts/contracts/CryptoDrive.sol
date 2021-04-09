// SPDX-License-Identifier: MIT
pragma solidity >=0.5.11;
pragma experimental ABIEncoderV2;

contract CryptoDrive{
    // Structure for storing the filehash,filename as File 
    
    struct File{
        string filehash;
        string filename;
    }
    
    // Structure for storing the filehash,filename,sender user_id as ShareFile 
    
    struct ShareFile{
        string filehash;
        string filename;
        string sender;
    }
    
    
    // Mapping for Storing user id as string and File Structure array as value
    // Mapping is private
    
    mapping(string=>File[]) private FileHashes;
    mapping(string=>string) private PassHash;
    mapping(string=>string) private PublicKeys;
    mapping(string=>ShareFile[]) private SharedData;
    
    
    // Function CheckUser to check whether the user id exist in the database
    // It checks the key is present or not based on the byte length for each map key value
    
    function checkUser(string memory user_id) public view returns(bool){
        if(bytes(PassHash[user_id]).length>0 && bytes(PublicKeys[user_id]).length>0){
            return true;
        }
        else{
            return false;
        }
    }
    
    
    // Function AddFileHash which takes user id , filehash , filename
    // It is pushes the structure in Filehash Mapping
    
    function AddFileHash(string memory user_id,string memory filehash,string memory filename) public {
        FileHashes[user_id].push(File(filehash,filename));
    }
    
    // Function GetFilehash which takes the user id 
    // It will return the struct array
    
    function GetFilehash(string memory user_id) public view returns (File[] memory){
        return FileHashes[user_id];
    }
    
    // Funtion to Save the user id , pass hash, public keys in the different mappings while SignUp
    
    function SignUp(string memory user_id,string memory pass_hash,string memory public_keys) public{
        PassHash[user_id]=pass_hash;
        PublicKeys[user_id]=public_keys;
    }
    
    // Function to GetPassHash which takes user id as input and returns PassHash which is saved earlier
    
    function GetPassHash(string memory user_id) public view returns (string memory){
        return PassHash[user_id];
    }
    
    // Function to get public keys for a particular input user id
    
    function getPublicKey(string memory user_id) public view returns (string memory){
        return PublicKeys[user_id];
    }
    
    // Function to save the shared data with respective of the receiver 
    // The input parameters are user id of receiver , filehash , filename , sender username
    
    function AddShareFile(string memory user_id,ShareFile[] memory shareFiles) public {
        for(uint i =0; i< shareFiles.length ; i=i+1){
        SharedData[user_id].push(ShareFile(shareFiles[i].filehash,shareFiles[i].filename,shareFiles[i].sender));
        }
    }
    
    
    // function to get the details of shared files for given receiver user id
    
    function GetShareDetails(string memory user_id) public view returns (ShareFile[] memory){
        return SharedData[user_id];
    }
    
    
    
}