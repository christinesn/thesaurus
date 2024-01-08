import './SearchForm.css';
import SearchIcon from './icons/SearchIcon';
import { useRef } from 'react';

function SearchForm ({ handleSearch }) {
    const ref = useRef(null);

    function handleSubmit (e) {
        e.preventDefault();
        handleSearch(ref.current.value);
        ref.current.value = "";
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-container">
                <input type="text" ref={ref} placeholder="Search thesaurus" />
                <button type="submit" className="submit">
                    <SearchIcon />
                </button>
            </div>
        </form>
    )
}

export default SearchForm