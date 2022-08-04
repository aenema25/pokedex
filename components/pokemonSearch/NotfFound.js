import Image from "next/image"
import Link from "next/link"
import Logo from '../../images/logo.png'
import styles from "../../styles/NotFound.module.css"

export default function NotFound() {
    return (
        <div class={styles.notFound}>
            <Image src={Logo} />
            <div>
                <p></p>Pokemon no encontrado o mal escrito
                <p>¿ Problemas para escribir el nombre de tu pokemon ?</p>
                <p>Haz click <a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number" target="_blank">AQUI</a> para encontrar los nombres de tus pokemones favoritos</p>
            </div>
            <Link href="/">
                <button className={styles.button}>Volver</button>
            </Link>
        </div>
    )
}