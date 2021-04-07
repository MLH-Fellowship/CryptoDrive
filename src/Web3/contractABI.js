// Smart Contract Crypto Drive ABI which is used while loading the smart contract
// This should be exported as a JSON

const data ={
    "abi": [
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "string",
              "name": "user_id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "filehash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "filename",
              "type": "string"
            }
          ],
          "name": "AddFileHash",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "string",
              "name": "user_id",
              "type": "string"
            }
          ],
          "name": "GetFilehash",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "filehash",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "filename",
                  "type": "string"
                }
              ],
              "internalType": "struct CryptoDrive.File[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "string",
              "name": "user_id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "pass_hash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "public_keys",
              "type": "string"
            }
          ],
          "name": "SignUp",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "string",
              "name": "user_id",
              "type": "string"
            }
          ],
          "name": "GetPassHash",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "string",
              "name": "user_id",
              "type": "string"
            }
          ],
          "name": "getPublicKey",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "string",
              "name": "user_id",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "filehash",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "filename",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "sender",
                  "type": "string"
                }
              ],
              "internalType": "struct CryptoDrive.ShareFile[]",
              "name": "shareFiles",
              "type": "tuple[]"
            }
          ],
          "name": "AddShareFile",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "string",
              "name": "user_id",
              "type": "string"
            }
          ],
          "name": "GetShareDetails",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "filehash",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "filename",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "sender",
                  "type": "string"
                }
              ],
              "internalType": "struct CryptoDrive.ShareFile[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ]
};

export default data;