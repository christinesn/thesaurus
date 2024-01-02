import './App.css';
import { useState, Fragment } from 'react';
import fetchData from './helpers/fetchData';
import multiplePoS from './sampleData/multiplePoS';
import Word from './Word';
import WordNotFound from './WordNotFound';
import Loading from './Loading';
import Header from './Header';
import Nyms from './Nyms';
import Footer from './Footer';

function App () {
    const [data, setData] = useState(multiplePoS)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [offensive, setOffensive] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [searched, setSearched] = useState("inferior")

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

            const wordNotFound = !response[0].hwi;

            if (wordNotFound) setNotFound(true)

            setOffensive(wordNotFound ? false : response[0].meta.offensive)
        } catch (error) {
            setError(error)
        }

        setLoading(false)

        if (process.env.NODE_ENV === "development") {
            console.log("loading:", loading, "\nnot found:", notFound, "\noffensive:", offensive, "\nerror:", error)
        }
    }

    return (
        <div>
            <Header handleSearch={handleSearch} />
            {loading && <Loading />}
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