import React from 'react'

const FileBar =(props)=>{
return(
    <div style={{height:"55px", width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <span style={{flexBasis:3}}><b>Filename</b><br/>{props.filename}</span><br/>
        <span  style={{flexBasis:1}}><b>Size(MB)</b>:<br/>{props.filesize/1000000}</span>
    </div>
)
}

export default FileBar;