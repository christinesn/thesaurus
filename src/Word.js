import './Word.css';

function Word ({ data }) {
    const word = data[0].hwi.hw;

    /**
     * Extract definitions from API data
     * @returns [{ partOfSpeech, definitons: [] }]
     * */
    function getDefinitions () {
        const definitions = [];

        data.forEach(entry => {
            /**
             * API data includes definitions for words with the same stem;
             * for this, if the entry doesn't match the searched word exactly,
             * don't include it
             * */
            if (entry.meta.id !== word) return

            const partOfSpeech = entry.fl;
            const defs = [];

            entry.shortdef.forEach(def => {
                defs.push(def)
            })

            definitions.push({
                partOfSpeech,
                definitions: [...new Set(defs)] /* Defs should be unique */
            })
        })

        if (process.env.NODE_ENV === "development") {
            console.log("Definitions:", definitions);
        }

        return mergePoSEntries(definitions)
    }

    /**
     * Merge entries with the same part of speech.
     */
    function mergePoSEntries (definitions) {
        const entries = []

        definitions.forEach(def => {
            /** Don't repeat if part of speech was already filtered */
            if (entries.filter(el => el.partOfSpeech === def.partOfSpeech).length) {
                return
            }

            const samePoS = definitions.filter(el => el.partOfSpeech === def.partOfSpeech);
            
            entries.push({
                partOfSpeech: def.partOfSpeech,
                definitions: [...new Set(samePoS.flatMap(el => el.definitions))]
            })
        })

        return entries
    }

    const definitions = getDefinitions();

    return (
        <article className="word">
            <h2>{word}</h2>
            {definitions.map((entry, i) => (
                <div className="definition-section" key={i}>
                    <div className="part-of-speech">{entry.partOfSpeech}</div>
                    <ol>
                        {entry.definitions.map((def, def_i) => (
                            <li key={def_i}>{def}</li>
                        ))}
                    </ol>
                </div>
            ))}
        </article>
    )
}

export default Word