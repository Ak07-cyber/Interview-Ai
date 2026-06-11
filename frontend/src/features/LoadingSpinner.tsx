import "./loading-spinner.scss";

const LoadingSpinner = () => {
    return (
        <div className="loading-screen">
            <div className="loading-spinner">
                <div className="loading-spinner__dot" />
                <div className="loading-spinner__dot" />
                <div className="loading-spinner__dot" />
            </div>
            <p className="loading-text">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
