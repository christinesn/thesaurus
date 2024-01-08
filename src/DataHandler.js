import { useState } from 'react';
import fetchData from './helpers/fetchData';
import App from './App';

function DataHandler () {
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

    /** Return to the welcome page */
    function returnHome () {
        setLoading(false)
        setError(false)
        setNotFound(false)
        setOffensive(false)
        setSearched(null)
        setData(null)
    }

    return (
        <App
            handleSearch={handleSearch}
            returnHome={returnHome}
            data={data}
            loading={loading}
            error={error}
            offensive={offensive}
            notFound={notFound}
            searched={searched}
        />
    )
}

export default DataHandler