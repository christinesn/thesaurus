import './Header.css';
import SearchForm from './SearchForm';

function Header ({ handleSearch, returnHome }) {
    return (
        <header>
            <div className="header-content">
                <button
                    className="return-home small"
                    onClick={returnHome}
                    title="Home"
                >
                    th.
                </button>
                <button
                    className="return-home full"
                    onClick={returnHome}
                    title="Home"
                >
                    thesaurii.
                </button>
                <SearchForm handleSearch={handleSearch} />
            </div>
        </header>
    )
}

export default Header;