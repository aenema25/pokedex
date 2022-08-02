import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import logo from '../images/logo.png'
import Link from 'next/link'
import Footer from '../components/footer'

export default function Home() {
  const [pokemonName, setPokemonName] = useState()

  return (
    <div className={styles.container}>
      <div >
        <Image src={logo}></Image>
      </div>
      <div className={styles.buscador}>
        <input onChange={(e) => setPokemonName(e.target.value)} />
        <Link href={`/pokemon/${pokemonName}`}>
          <button className={styles.button}>Buscar pokemon</button>
        </Link>
      </div>
      <Footer />
    </div >
  )
}
