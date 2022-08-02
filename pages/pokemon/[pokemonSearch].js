import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import Image from "next/image";
import pokeball from '../../images/pokeball.png'
import {
    FaArrowLeft as BackIcon,
    FaRegHeart as HeartIcon,
    FaInfoCircle as InfoIcon
} from 'react-icons/fa'
import styles from '../../styles/pokemonSearch.module.css'
import Link from "next/link";
import getColor from "../../helper/colorHelper";
import logo from '../../images/logo.png'
import Footer from "../../components/footer";

const Bio = ({ texts }) => {
    const bio = texts.flavor_text_entries.find(entrie => entrie.language.name === 'es')
    return (
        <>
            {bio.flavor_text}
        </>
    )


}

export default function Pokemon() {
    const router = useRouter()
    const { pokemonSearch } = router.query
    const [pokemonData, setPokemonData] = useState()
    const [pokemonSpecies, setPokemonSpecies] = useState()

    const getPokemon = () => {
        const localPokedex = (localStorage.getItem('pokedex')) ? JSON.parse(localStorage.getItem('pokedex')) : []
        const findPokemon = localPokedex.find(poke => poke.name === pokemonSearch)
        if (findPokemon) {
            setPokemonData(findPokemon)
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`, { method: 'GET' })
                .then(response => response.text())
                .then(response => {
                    if (response !== "Not Found") {
                        setPokemonData(JSON.parse(response))
                        localPokedex.push(JSON.parse(response))
                        localStorage.setItem('pokedex', JSON.stringify(localPokedex))
                    } else {
                        setPokemonData(null)
                    }
                })
        }
    }
    const getPokemonSpecies = () => {
        const localPokedex = (localStorage.getItem('pokedex-species')) ? JSON.parse(localStorage.getItem('pokedex-species')) : []
        const findPokemon = localPokedex.find(poke => poke.name === pokemonSearch)
        if (findPokemon) {
            setPokemonSpecies(findPokemon)
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonSearch}`, { method: 'GET' })
                .then(response => response.text())
                .then(response => {
                    if (response !== "Not Found") {
                        setPokemonSpecies(JSON.parse(response))
                        localPokedex.push(JSON.parse(response))
                        localStorage.setItem('pokedex-species', JSON.stringify(localPokedex))
                    } else {
                        setPokemonSpecies(null)
                    }
                })
        }
    }
    useEffect(() => {
        getPokemon()
        getPokemonSpecies()
    }, [])
    if (pokemonData && pokemonSpecies) {
        return (
            <div className={styles.container} style={{ backgroundColor: getColor(pokemonSpecies.color.name) }}>
                <div className={styles.header}>
                    <div className={styles.backButton}>
                        <Link href="/">
                            <BackIcon />
                        </Link>
                    </div>
                    <div className={styles.heartButton}>
                        <HeartIcon />
                    </div>
                    <div className={styles.number}>
                        #{pokemonData.id}
                    </div>
                </div>
                <div className={styles.hero}>
                    <div className={styles.pokeball}>
                        <Image src={pokeball} />
                    </div>
                    <div className={styles.pokemonImage}>
                        <Image src={pokemonData.sprites.other['official-artwork']['front_default']} width={300} height={330} />
                    </div>
                    <div className={styles.pokemonName}>
                        {pokemonData.name}
                    </div>
                </div>
                <div className={styles.pokemonCard}>
                    <div className={styles.tabHeader}>
                        <div>
                            Información
                        </div>
                        <InfoIcon />
                    </div>
                    <div className={styles.cardContent}>
                        <div>
                            <p>
                                {pokemonSpecies.genera.map(gen => {
                                    if (gen.language.name === 'es') {
                                        return (
                                            <>{gen.genus}</>
                                        )
                                    }
                                })}
                            </p>
                            {
                                pokemonSpecies &&
                                <Bio texts={pokemonSpecies} />
                            }
                        </div>
                        <div>
                            <p><strong>Datos adicionales</strong></p>
                            <p>Estatura: {Math.round((pokemonData.height * 0.1) * 10) / 10} M</p>
                            <p>Peso: {Math.round((pokemonData.weight * 0.1) * 10) / 10} KG</p>
                            <p>Habilidades: {pokemonData.abilities.map(ability => <>{ability.ability.name}, </>)}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (pokemonData === null || pokemonSpecies === null) {
        return (
            <div class={styles.notFound}>
                <Image src={logo} />
                <div>
                    <p></p>Pokemon no encontrado o mal escrito
                    <p>¿ Problemas para escribir el nombre de tu pokemon ?</p>
                    <p>Haz click <a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number" target="_blank">AQUI</a> para encontrar los nombres de tus pokemones favoritos</p>
                </div>
                <Link href="/">
                    <button className={styles.button}>Volver</button>
                </Link>
                <Footer />
                
            </div>
        )
    } else {
        return (
            <div className={styles.cargando}>
                <Image src={logo} />
                <span class={styles.spinner}></span>
                <Footer />
            </div>
        )
    }

}