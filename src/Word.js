import './Word.css';
import Nyms from './Nyms';

function Word ({ data, handleSearch }) {
    const word = data[0].hwi.hw;

    function convertItTags (input) {
        return input.replace(/\{it\}/g, "<em>").replace(/\{\/it\}/g, "</em>")
    }

    /**
     * Format API data
     * @returns [{ partOfSpeech, definiton, entry }]
     * */
    const meanings = (() => {
        const definitions = [];

        data.forEach(entry => {
            const partOfSpeech = entry.fl;

            entry.def[0].sseq.forEach((def) => {
                definitions.push({
                    partOfSpeech,
                    definition: convertItTags(def[0][1].dt[0][1]),
                    entry: def[0][1]
                })
            })
        })

        return definitions
    })();

    return (
        <section>
            <h2>{word}</h2>
            <ol>
            {meanings.map((meaning, i) => (
                <li key={i} role="article">
                    <div className="meaning">
                        <span className="part-of-speech">({meaning.partOfSpeech})</span>
                        <span
                            className="definiton"
                            dangerouslySetInnerHTML={{
                                __html: meaning.definition
                            }}
                        />
                    </div>
                    <Nyms
                        data={data}
                        meaning={meaning}
                        handleSearch={handleSearch}
                    />
                </li>
            ))}
            </ol>
        </section>
    )
}

export default Word