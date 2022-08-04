import Logo from '../../images/logo.png'
import Image from 'next/image'
import styles from '../../styles/Loading.module.css'

export default function Loading() {
    return (
        <div className={styles.cargando}>
            <Image src={Logo} />
            <span className={styles.spinner}></span>
        </div>
    )
}
