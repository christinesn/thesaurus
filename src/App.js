import './App.css';
import { useRef, useState, Fragment } from 'react';
import fetchData from './fetchData';
import singleDef from './sampleData/singleDef';
import multipleDefs from './sampleData/multipleDefs';
import Word from './Word';
import Nyms from './Nyms';
import WordNotFound from './WordNotFound';

function App () {
    const ref = useRef(null)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [offensive, setOffensive] = useState(false)
    const [notFound, setNotFound] = useState(false)

    async function handleSearch (e) {
        e.preventDefault();
        setOffensive(false)
        setNotFound(false)
        setLoading(true)
        setError(null)

        if (!ref.current.value.trim()) {
            setLoading(false)
            return
        }

        try {
            const response = await fetchData(ref.current.value)
            setData(response)

            console.log("response:", response)

            if (!response[0].hwi) {
                setNotFound(true)
            }

            setOffensive(!response[0].hwi ? false : response[0].meta.offensive)

            if (!notFound) {
                ref.current.value = "";
            }
        } catch (error) {
            setError(error)
        }

        setLoading(false)

        console.log("loading:", loading, "\nnot found:", notFound, "\noffensive:", offensive, "\nerror:", error)
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" ref={ref}></input>
                <button type="submit">Search</button>
            </form>
            {!loading && !error && notFound && <WordNotFound data={data} />}
            {!loading && !error && offensive && (
                <div>Offensive.</div>
            )}
            {!loading && !error && data && !offensive && !notFound && (
                <Fragment>
                    <Word data={data} />
                    <Nyms data={data} type="syn" />
                    <Nyms data={data} type="ant" />
                </Fragment>
            )}
            <br /><br /><br />
            <div>Loading: {loading.toString()}</div>
            <div>Offensive: {offensive.toString()}</div>
            <div>Not found: {notFound.toString()}</div>
            <div>Error: {error && error.message}</div>
            <div>Data:</div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default App