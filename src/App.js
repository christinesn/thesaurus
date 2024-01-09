import './App.css';
import { Fragment } from 'react';
import Word from './Word';
import WordNotFound from './WordNotFound';
import Loading from './Loading';
import Header from './Header';
import Nyms from './Nyms';
import Footer from './Footer';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';

function App ({
    handleSearch,
    returnHome,
    data,
    loading,
    error,
    offensive,
    notFound,
    searched
}) {
    return (
        <div className="app">
            <Header
                handleSearch={handleSearch}
                returnHome={returnHome}
            />
            <div className="content-container">
                {!loading && !error && !data && !notFound && !offensive && (
                    <Welcome
                        handleSearch={handleSearch}
                    />
                )}
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
                        <div className="nyms-container">
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
                        </div>
                    </Fragment>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default App