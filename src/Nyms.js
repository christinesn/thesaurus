import './Nyms.css';
import convertItTags from './helpers/convertItTags';

function Nyms ({ data, type = "syn", handleSearch }) {
    const list = type === "syn" ? "syn_list" : "ant_list";

    const meanings = (() => {
        const entries = data.map(meaning => {
            return meaning.def[0].sseq.map(entry => {
                const def = convertItTags(entry[0][1].dt[0][1]);
                let nymsList = entry[0][1][list];
    
                if (!nymsList) {
                    if (type === "syn") {
                        nymsList = entry[0][1].sim_list
    
                        if (!nymsList) return null
                    } else {
                        return null
                    }
                }
    
                const nyms = nymsList.flat().map(nym => nym.wd);
    
                return {
                    def,
                    nyms,
                    partOfSpeech: meaning.fl
                }
            })
        })

        return entries.flat().filter(entry => entry !== null);
    })();

    if (meanings.length === 0) {
        return null
    }

    return (
        <article>
            <h2>{type === "syn" ? "Synonyms" : "Antonyms"}</h2>
            <div>
                {meanings.map((meaning, i) => (
                    <div key={i} className="meaning-section">
                        <div className="meaning"
                            dangerouslySetInnerHTML={{
                                __html: `<span>(${meaning.partOfSpeech})</span> ${meaning.def}`
                            }}
                        />
                        <div className="nyms">
                            {meaning.nyms.map((nym, nym_i) => (
                                <button
                                    className="nym-entry"
                                    key={nym_i}
                                    onClick={() => handleSearch(nym)}
                                >
                                    {nym}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default Nyms