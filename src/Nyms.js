import './Nyms.css';

function Nyms ({ meaning, handleSearch }) {
    function makeNymsList (list_types) {
        const nyms = []

        list_types.forEach(list => {
            if (meaning.entry[list]) {
                meaning.entry[list][0].forEach(nym => nyms.push(nym.wd));
            }
        });

        return [...new Set(nyms)]
    }

    const synonyms = makeNymsList(["syn_list", "rel_list", "sim_list"]);
    const antonyms = makeNymsList(["ant_list", "near_list", "opp_list"]);

    return (
        <div className="nyms-listing">
            {synonyms.length ? (
                <div className="nyms">
                    {synonyms.map((syn, i) => (
                        <button
                            key={i}
                            className="nym syn"
                            onClick={() => handleSearch(syn)}
                            title={"Synonym: " + syn}
                        >
                            {syn}
                        </button>
                    ))}
                </div>
            ) : ""}
            {antonyms.length ? (
                <div className="nyms">
                    {antonyms.map((ant, i) => (
                        <button
                            key={i}
                            className="nym ant"
                            onClick={() => handleSearch(ant)}
                            title={"Antonym: " + ant}
                        >
                            {ant}
                        </button>
                    ))}
                </div>
            ) : ""}
        </div>
    )
}

export default Nyms