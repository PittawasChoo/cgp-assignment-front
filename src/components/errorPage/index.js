import SecondaryButton from "components/buttons/secondary";

import "./styles.css";

const ErrorPage = ({ refetch }) => {
    return (
        <div className="error-page-root">
            <div className="error-page-content-container">
                <div className="error-text">Error on fetching data</div>
                <SecondaryButton onClick={refetch}>Refetch</SecondaryButton>
            </div>
        </div>
    );
};

export default ErrorPage;
