import './Word.css';
import convertItTags from './convertItTags';

function Word ({ data }) {
    const word = data[0].hwi.hw;
    const partOfSpeech = data[0].fl;

    const definitions = (() => {
        return data[0].def[0].sseq.map(def => {
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
    })();

    return (
        <article>
            <h2>Word</h2>
            <h3>{word}</h3>
            <div>{partOfSpeech}</div>
            <ol>
                {definitions.map((def, i) => (
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
        </article>
    )
}

export default Word