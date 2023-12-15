import './Nyms.css';
import { Fragment } from 'react';

function Nyms ({ type = "syn", searched, data, handleSearch }) {
    const synLists = ["syn_list", "rel_list", "sim_list"];
    const antLists = ["ant_list", "near_list", "opp_list"];

    /**
     * @returns [{ partOfSpeech: "noun", nyms: [] }]
     */
    function makeNyms () {
        const lists = type === "syn" ? synLists : antLists
        const nyms = [];

        data.forEach(el => {
            const entry = {
                partOfSpeech: el.fl,
                nyms: []
            };

            if (el.meta.id !== searched) {
                return
            }

            el.def.forEach(def => {
                const defLists = def.sseq[0][0][1];

                lists.forEach(list => {
                    if (defLists[list]) {
                        defLists[list][0].forEach(nym => {
                            entry.nyms.push(nym.wd);
                        })
                    }
                })
            });

            nyms.push(entry)
        })

        return nyms
    }

    const nyms = makeNyms();
    
    function aOrAn (partOfSpeech) {
        if (partOfSpeech === "adjective" || partOfSpeech === "adverb") {
            return "an"
        }

        return "a"
    }

    return (
        <section className={"nyms " + type}>
            <h3>{type === "syn" ? "Synonyms" : "Antonyms"}</h3>
            {nyms.map(entry => (
                <Fragment key={entry.partOfSpeech}>
                    {nyms.length > 1 ? (
                        <div>as {aOrAn(entry.partOfSpeech)} <em>{entry.partOfSpeech}</em></div>
                    ) : ""}
                    <div>
                        {entry.nyms.map(nym => (
                            <button
                                className={"nym " + type}
                                onClick={() => handleSearch(nym)}
                                key={nym}
                            >
                                {nym}
                            </button>
                        ))}
                    </div>
                </Fragment>
            ))}
        </section>
    )
}

export default Nyms