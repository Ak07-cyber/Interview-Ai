import "./loading-spinner.scss";

const LoadingSpinner = () => {
    return (
        <div className="loading-screen">
            <div className="loading-spinner" />
            <p className="loading-text">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
