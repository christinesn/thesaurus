import './Welcome.css';

const exampleWords = [
    "lively",
    "scary",
    "glamorous",
    "immense",
    "defeated"
]

function Welcome ({ handleSearch }) {
    return (
        <div className="welcome">
            <div className="big-welcome">thesaurii.</div>
            <div className="welcome-description">A simple thesaurus app.</div>
            <div className="prompt">Can't decide where to start? Try one of these words.</div>
            <div className="examples nyms">
                {exampleWords.map(word => (
                    <div className="nym-container">
                        <button class="nym syn" onClick={() => handleSearch(word)}>
                            {word}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Welcome