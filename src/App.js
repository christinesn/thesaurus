import { useRef, useState } from 'react';
import fetchData from './fetchData';
import sampleData from './sampleData';

function App () {
    const ref = useRef(null)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleSearch (e) {
        e.preventDefault();
        setLoading(true)
        setError(null)

        try {
            // const response = await fetchData(ref.current.value)
            // setData(response)

            setData(sampleData)
            ref.current.value = "";
        } catch (error) {
            setError(error)
        }

        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" ref={ref}></input>
                <button type="submit">Search</button>
                <div>Loading: {loading.toString()}</div>
                <div>Error: {error && error.message}</div>
                <div>Data:</div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </form>
        </div>
    )
}

export default App