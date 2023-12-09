import './App.css';
import { useRef, useState, Fragment } from 'react';
import fetchData from './fetchData';
import singleDef from './sampleData/singleDef';
import multipleDefs from './sampleData/multipleDefs';
import Word from './Word';
import Nyms from './Nyms';

function App () {
    const ref = useRef(null)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleSearch (e) {
        console.log("fetchData fired");
        
        e.preventDefault();
        setLoading(true)
        setError(null)

        try {
            const response = await fetchData(ref.current.value)
            setData(response)

            // setData(sampleData)
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
            </form>
            {data && (
                <Fragment>
                    <Word data={data} />
                    <Nyms data={data} type="syn" />
                    <Nyms data={data} type="ant" />
                </Fragment>
            )}
            <br /><br /><br />
            <div>Loading: {loading.toString()}</div>
            <div>Error: {error && error.message}</div>
            <div>Data:</div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default App