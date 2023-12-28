import './Nyms.css';

function Nyms ({ type = "syn", searched, data, handleSearch }) {
    const synLists = ["syn_list", "rel_list", "sim_list"];
    const antLists = ["ant_list", "near_list", "opp_list"];

    /**
     * @returns ["nym1", "nym2", ...]
     */
    function makeNyms () {
        const lists = type === "syn" ? synLists : antLists
        const nyms = [];

        data.forEach(el => {
            /** If the entry doesn't match the searched word exactly, don't include */
            if (el.meta.id !== searched) {
                return
            }

            el.def.forEach(def => {
                const defLists = def.sseq[0][0][1];

                lists.forEach(list => {
                    if (defLists[list]) {
                        defLists[list][0].forEach(nym => {
                            nyms.push(nym.wd);
                        })
                    }
                })
            });
        })

        return nyms
    }

    const nyms = makeNyms();

    /** Don't render anything if there are no nyms */
    if (!nyms.length) {
        return null
    }

    return (
        <section className={"nyms " + type}>
            <h3>{type === "syn" ? "Synonyms" : "Antonyms"}</h3>
            <div className="nyms-section">
                {nyms.map(nym => (
                    <div key={nym} className="nym-container">
                        <button
                            className={"nym " + type}
                            onClick={() => handleSearch(nym)}
                        >
                            {nym}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Nyms