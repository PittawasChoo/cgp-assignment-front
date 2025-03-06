import "./styles.css";

const UserImage = ({ size, username }) => {
    const getImageSize = () => {
        switch (size) {
            case "sm":
                return "31px";
            case "md":
                return "40px";
            case "lg":
                return "48px";
            default:
                return "40px";
        }
    };

    return (
        <div
            className="root"
            style={{
                width: getImageSize(),
                height: getImageSize(),
            }}
        >
            {username[0]}
        </div>
    );
};

export default UserImage;
