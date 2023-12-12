import './App.css';
import { useRef, useState, Fragment } from 'react';
import fetchData from './helpers/fetchData';
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

    async function handleSearch (input) {
        setOffensive(false)
        setNotFound(false)
        setLoading(true)
        setError(null)
        setData(null)

        if (!input.trim()) {
            setLoading(false)
            return
        }

        try {
            const response = await fetchData(input)
            setData(response)

            if (process.env.NODE_ENV === "development") {
                console.log("response:", response)
            }

            const wordNotFound = !response[0].hwi;

            if (wordNotFound) setNotFound(true)

            setOffensive(wordNotFound ? false : response[0].meta.offensive)

            if (!wordNotFound) {
                ref.current.value = "";
            }
        } catch (error) {
            setError(error)
        }

        setLoading(false)

        if (process.env.NODE_ENV === "development") {
            console.log("loading:", loading, "\nnot found:", notFound, "\noffensive:", offensive, "\nerror:", error)
        }
    }

    async function handleSubmit (e) {
        e.preventDefault();
        handleSearch(ref.current.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={ref}></input>
                <button type="submit">Search</button>
            </form>
            {!loading && !error && notFound && <WordNotFound data={data} handleSearch={handleSearch} />}
            {!loading && !error && offensive && (
                <div>Offensive.</div>
            )}
            {!loading && !error && data && !offensive && !notFound && (
                <Fragment>
                    <Word data={data} />
                    <Nyms data={data} handleSearch={handleSearch} type="syn" />
                    <Nyms data={data} handleSearch={handleSearch} type="ant" />
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