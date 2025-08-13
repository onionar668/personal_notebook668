import styles from './Logo.module.css'

function Logo({image}){
    return <h1 className={styles.logo}>{image}</h1>
    
}
export default Logo