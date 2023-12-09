import './WordNotFound.css';

function WordNotFound ({ data, handleSearch }) {
    return (
        <div>
            We couldn't find that word. Did you mean one of these?
            <div>
                {data.map((word, i) => (
                    <button
                        className="suggestion"
                        key={i}
                        onClick={() => handleSearch(word)}
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default WordNotFound