import './App.css';
import { useState, Fragment } from 'react';
import fetchData from './helpers/fetchData';
import Word from './Word';
import WordNotFound from './WordNotFound';
import Loading from './Loading';
import Header from './Header';
import Nyms from './Nyms';
import Footer from './Footer';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';

function App () {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [offensive, setOffensive] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [searched, setSearched] = useState(null)

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
            setSearched(input.toLowerCase())

            if (process.env.NODE_ENV === "development") {
                console.log("response:", response)
            }

            if (!response || !response.length) {
                throw new Error("No response")
            }

            const wordNotFound = !response[0].hwi;
            if (wordNotFound) setNotFound(true)

            setOffensive(wordNotFound ? false : response[0].meta.offensive)
        } catch (error) {
            setError(error)
        }

        setLoading(false)

        window.scrollTo(0,0);

        if (process.env.NODE_ENV === "development") {
            console.log("loading:", loading, "\nnot found:", notFound, "\noffensive:", offensive, "\nerror:", error)
        }
    }

    return (
        <div className="app">
            <Header handleSearch={handleSearch} />
            {!loading && !error && !data && !notFound && !offensive && <Welcome handleSearch={handleSearch} />}
            {loading && <Loading />}
            {error && <ErrorMessage error={error} />}
            {!loading && !error && (notFound || offensive) && (
                <WordNotFound
                    data={data}
                    handleSearch={handleSearch}
                    searched={searched}
                    offensive={offensive}
                />
            )}
            {!loading && !error && data && !offensive && !notFound && (
                <Fragment>
                    <Word
                        data={data}
                        searched={searched}
                    />
                    <Nyms
                        type="syn"
                        data={data}
                        handleSearch={handleSearch}
                        searched={searched}
                    />
                    <Nyms
                        type="ant"
                        data={data}
                        handleSearch={handleSearch}
                        searched={searched}
                    />
                </Fragment>
            )}
            <Footer />
        </div>
    )
}

export default App