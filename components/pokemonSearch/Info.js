import Bio from "./Bio"
import styles from '../../styles/Info.module.css'

export default function Info({ pokemonData, pokemonSpecies }) {
    return (
        <div className={styles.infoContent}> 
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
                <Bio texts={pokemonSpecies} />
            </div>
            <div>
                <p><strong>Datos adicionales</strong></p>
                <p>Estatura: {Math.round((pokemonData.height * 0.1) * 10) / 10} M</p>
                <p>Peso: {Math.round((pokemonData.weight * 0.1) * 10) / 10} KG</p>
                <p>Habilidades: {pokemonData.abilities.map(ability => <>{ability.ability.name}, </>)}</p>
            </div>
        </div>

    )
}
