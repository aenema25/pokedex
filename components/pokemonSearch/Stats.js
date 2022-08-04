import StatsBar from "./StatsBar"
import styles from "../../styles/Stats.module.css"


export default function Stats({ pokemonData }) {
    return (
        <div className={styles.statsContent}>
            {pokemonData.stats.map(stat => (
                <StatsBar progress={stat.base_stat} name={stat.stat.name} />
            ))}
        </div>
    )
}