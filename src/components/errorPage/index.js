import SecondaryButton from "components/buttons/secondary";

const ErrorPage = ({ refetch }) => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ marginBottom: "40px", fontSize: "40px" }}>Error on fetching data</div>
                <SecondaryButton onClick={refetch}>Refetch</SecondaryButton>
            </div>
        </div>
    );
};

export default ErrorPage;
