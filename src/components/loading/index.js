const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "200px",
            }}
        >
            <span className="spinner-border spinner-border-xl text-primary" aria-hidden="true" />
        </div>
    );
};

export default Loading;
