import './WordNotFound.css';

function WordNotFound ({ data }) {
    return (
        <div>
            We couldn't find that word. Did you mean one of these?
            <div>
                {data.map((word, i) => (
                    <span className="suggestion" key={i}>{word}</span>
                ))}
            </div>
        </div>
    )
}

export default WordNotFound