import styles from "../../styles/StatsBar.module.css"

export default function StatsBar({ progress, name }) {

    let bgcolor, progressPercentage

    switch (name) {
        case 'hp':
            progressPercentage = ((progress * 100) / 255).toFixed(2)
            bgcolor = '#556b8f'
            break;
        case 'attack':
            progressPercentage = ((progress * 100) / 190).toFixed(2)
            bgcolor = '#d56d7d'
            break;
        case 'defense':
            progressPercentage = ((progress * 100) / 250).toFixed(2)
            bgcolor = '#de5523'
            break;
        case 'special-attack':
            progressPercentage = ((progress * 100) / 194).toFixed(2)
            bgcolor = '#75c69b'
            break;
        case 'special-defense':
            progressPercentage = ((progress * 100) / 250).toFixed(2)
            bgcolor = '#c2a6cc'
            break;
        case 'speed':
            progressPercentage = ((progress * 100) / 200).toFixed(2)
            bgcolor = '#c04c4b'
            break;
        default:
            break;
    }
    const progressBar = {
        height: '100%',
        width: `${progressPercentage}%`,
        backgroundColor: `${bgcolor}`,
        borderRadius: '20px'
    }

    return (
        <div className={styles.progressContainer}>
            <div>
                {name}
            </div>
            <strong>
                {progress}
            </strong>
            <div style={styles.progressBackground}>
                <div style={progressBar}></div>
            </div>
        </div>

    )
}