import './WordNotFound.css';

function WordNotFound ({ data, handleSearch, searched, offensive }) {
    if (offensive) {
        return (
            <div className="not-found">
                <div className="not-found-prompt">
                    Sorry, we couldn't find that word.
                    <p>Try searching something else.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="not-found">
            <div className="not-found-prompt">
                Sorry, we couldn't find <span className="searched">{searched}</span>.
                <p>Did you mean one of these words?</p>
            </div>
            <div className="suggestions nyms-section">
                {data.map((word, i) => (
                    <div className="nym-container" key={i}>
                        <button
                            className="suggestion nym"
                            onClick={() => handleSearch(word)}
                        >
                            {word}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WordNotFound