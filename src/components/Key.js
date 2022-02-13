const Key = ({ icon, action, operation, setOperation, handleKey }) => {
    return (
        <button className="key" onClick={() => handleKey(action)}>
            {icon}
        </button>
    );
};

export default Key;
