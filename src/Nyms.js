import './Nyms.css';
import convertItTags from './convertItTags';

function Nyms ({ data, type = "syn" }) {
    const list = type === "syn" ? "syn_list" : "ant_list";

    const meanings = (() => {
        const entries = data[0].def[0].sseq.map(entry => {
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
                nyms
            }
        })

        return entries.filter(entry => entry !== null);
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
                                __html: meaning.def
                            }}
                        />
                        <div className="nyms">
                            {meaning.nyms.map((nym, nym_i) => (
                                <span className="nym-entry" key={nym_i}>{nym}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default Nyms