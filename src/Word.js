import './Word.css';
import convertItTags from './helpers/convertItTags';

function Word ({ data }) {
    const word = data[0].hwi.hw;

    const meanings = (() => {
        return data.map(meaning => {
            if (process.env.NODE_ENV === "development") {
                console.log("meaning:", meaning)
            }

            return {
                partOfSpeech: meaning.fl,
                definitions: meaning.def[0].sseq.map((def, i) => {
                    const entry = def[0][1].dt
        
                    const sentence = (() => {
                        if (entry[1]) {
                            return convertItTags(entry[1][1][0].t)
                        } else {
                            return null
                        }
                    })();
        
                    return {
                        def: convertItTags(entry[0][1]),
                        sentence
                    }
                })
            }
        })
    })();

    return (
        <article>
            <h2>Word</h2>
            <h3>{word}</h3>
            {meanings.map((meaning, i) => (
                <div key={i}>
                    <div>{meaning.partOfSpeech}</div>
                    <ol>
                        {meaning.definitions.map((def, i) => (
                            <li key={i}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: def.def
                                    }}
                                />
                                <div className="sample-sentence"
                                    dangerouslySetInnerHTML={{
                                        __html: def.sentence
                                    }}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </article>
    )
}

export default Word