import './Welcome.css';

const exampleWords = [
    "lively",
    "scary",
    "glamorous",
    "immense",
    "defeated",
    "zealous",
    "grumpy",
    "fierce"
]

function Welcome ({ handleSearch }) {
    return (
        <div className="welcome-container">
            <div className="welcome">
                <div className="big-welcome">thesaurus.</div>
                <div className="welcome-description">A thesaurus app.</div>
                <div className="prompt">Can't decide where to start? Try one of these words.</div>
                <div className="examples nyms-section">
                    {exampleWords.map(word => (
                        <div className="nym-container">
                            <button class="nym syn" onClick={() => handleSearch(word)}>
                                {word}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Welcome