export default function Bio({ texts }) {
    const bio = texts.flavor_text_entries.find(entrie => entrie.language.name === 'es')
    return (
        <div>
            {bio.flavor_text}
        </div>
    )
}