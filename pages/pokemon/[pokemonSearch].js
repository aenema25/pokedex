import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import Image from "next/image";
import pokeball from '../../images/pokeball.png'
import {
    FaArrowLeft as BackIcon,
    FaRegHeart as HeartIcon,
    FaInfoCircle as InfoIcon,
    FaChartBar as StatsIcon
} from 'react-icons/fa'
import styles from '../../styles/pokemonSearch.module.css'
import Link from "next/link";
import getColor from "../../helper/colorHelper";
import { Info, Loading, NotFound, Stats } from "../../components/pokemonSearch";

export default function Pokemon() {
    const router = useRouter()
    const { pokemonSearch } = router.query
    const [pokemonData, setPokemonData] = useState()
    const [pokemonSpecies, setPokemonSpecies] = useState()
    const [show, setShow] = useState(1);
    const handleOpen = (e) => {
        setShow(e.currentTarget.id)
    };

    const tabContent = [
        {
            id: 1,
            name: 'Información',
            content: <Info pokemonData={pokemonData} pokemonSpecies={pokemonSpecies} />,
            icon: <InfoIcon />
        },
        {
            id: 2,
            name: 'Stats',
            content: <Stats pokemonData={pokemonData} />,
            icon: <StatsIcon />
        },
    ]

    const getPokemonData = () => {
        const localPokedex = (localStorage.getItem('pokedex')) ? JSON.parse(localStorage.getItem('pokedex')) : []
        const findPokemon = localPokedex.find(poke => poke.name === pokemonSearch.toLowerCase())
        if (findPokemon) {
            setPokemonData(findPokemon)
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch.toLowerCase()}`, { method: 'GET' })
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
        const findPokemon = localPokedex.find(poke => poke.name === pokemonSearch.toLowerCase())
        if (findPokemon) {
            setPokemonSpecies(findPokemon)
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonSearch.toLowerCase()}`, { method: 'GET' })
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
        getPokemonData()
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
                        <Image src={pokemonData.sprites.other['official-artwork']['front_default']} width={280} height={310} />
                    </div>
                    <div className={styles.pokemonName}>
                        {pokemonData.name}
                    </div>
                </div>
                <div className={styles.pokemonCard}>
                    <div className={styles.accordion}>
                        {
                            tabContent.map(tab => (
                                <div className={(tab.id == show) ? styles.active : ''} id={tab.id} onClick={handleOpen}>
                                    <div className={styles.tabHeader}>
                                        {tab.name}
                                        {tab.icon}
                                    </div>
                                    {(tab.id == show) ? tab.content : ''}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    } else if (pokemonData === null || pokemonSpecies === null) {
        return (
            <NotFound />
        )
    } else {
        return (
            <Loading />
        )
    }

}
