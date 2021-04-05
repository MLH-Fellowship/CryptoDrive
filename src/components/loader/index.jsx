import React from 'react';
import styles from './index.module.css'
import Logo from './../../assets/logo.svg'
const Loader = (props) =>{
    let width = "80px"
    if(props.width)
    width = props.width

    return(<div >
    <img className={styles.loaderAnim} src={Logo} width={width}/>
    </div>)

}
export default Loader;