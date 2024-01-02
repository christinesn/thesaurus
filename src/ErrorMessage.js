import './ErrorMessage.css';

function ErrorMessage ({ error }) {
    console.error(error)
    
    return (
        <div className="error">
            Sorry, something went wrong.
            <p>Please try again in a couple of minutes.</p>
        </div>
    )
}

export default ErrorMessage