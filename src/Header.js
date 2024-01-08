import './Header.css';
import SearchIcon from './icons/SearchIcon';
import { useRef } from 'react';

function Header ({ handleSearch, returnHome }) {
    const ref = useRef(null);

    function handleSubmit (e) {
        e.preventDefault();
        handleSearch(ref.current.value);
        ref.current.value = "";
    }

    return (
        <header>
            <button
                className="return-home"
                onClick={returnHome}
                title="Home"
            >
                Th.
            </button>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input type="text" ref={ref} placeholder="Search thesaurus" />
                    <button type="submit" className="submit">
                        <SearchIcon />
                    </button>
                </div>
            </form>
        </header>
    )
}

export default Header;