import { useEffect } from 'react';
import { Link } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import LoadingSpinner from '../../LoadingSpinner';
import '../reports.scss';

const Reports = () => {
    const { reports, fetchReports, loading, downloadResume } = useInterview();

    useEffect(() => {
        fetchReports();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="reports-page">
            <div className="reports-container">
                <div className="reports-header">
                    <div>
                        <h1>Your Reports</h1>
                        <p className="reports-header__subtitle">View and manage your interview preparation reports</p>
                    </div>
                    <Link to="/" className="button primary-button reports-header__new">
                        + New Report
                    </Link>
                </div>

                {reports.length === 0 ? (
                    <div className="reports-empty">
                        <div className="reports-empty__icon">📋</div>
                        <h2>No reports yet</h2>
                        <p>Generate your first interview preparation report to get started.</p>
                        <Link to="/" className="button primary-button">
                            Create Your First Report
                        </Link>
                    </div>
                ) : (
                    <div className="reports-grid">
                        {reports.map((report) => {
                            const scoreColor =
                                report.matchScore >= 80 ? 'score--high' :
                                report.matchScore >= 60 ? 'score--mid' : 'score--low';

                            return (
                                <div key={report._id} className="report-card">
                                    <div className="report-card__header">
                                        <h3 className="report-card__title">{report.title}</h3>
                                        <span className={`report-card__score ${scoreColor}`}>
                                            {report.matchScore}%
                                        </span>
                                    </div>
                                    <p className="report-card__description">
                                        {report.jobDescription.length > 120
                                            ? report.jobDescription.slice(0, 120) + '...'
                                            : report.jobDescription}
                                    </p>
                                    <div className="report-card__meta">
                                        <span className="report-card__date">
                                            {new Date(report.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="report-card__actions">
                                        <Link to={`/interview/${report._id}`} className="button secondary-button">
                                            View Report
                                        </Link>
                                        <button
                                            className="button outline-button"
                                            onClick={() => downloadResume(report._id)}
                                        >
                                            Download Resume
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
