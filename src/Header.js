import './Header.css';
import SearchForm from './SearchForm';

function Header ({ handleSearch, returnHome }) {
    return (
        <header>
            <button
                className="return-home"
                onClick={returnHome}
                title="Home"
            >
                th.
            </button>
            <SearchForm handleSearch={handleSearch} />
        </header>
    )
}

export default Header;