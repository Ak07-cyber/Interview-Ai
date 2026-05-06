import { Link } from "react-router";
import "./not-found.scss";

const NotFound = () => {
    return (
        <main className="not-found">
            <div className="not-found__content">
                <h1 className="not-found__code">404</h1>
                <p className="not-found__message">Page not found</p>
                <p className="not-found__description">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="button primary-button not-found__link">
                    Go to Home
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
