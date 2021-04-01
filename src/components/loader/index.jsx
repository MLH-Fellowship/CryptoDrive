import React from 'react';
import styles from './index.module.css'
import Logo from './../../assets/logo.svg'
const Loader = () =>{

    return(<div >
    <img className={styles.loaderAnim} src={Logo} width="80px"/>
    </div>)

}
export default Loader;