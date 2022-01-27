const OperationLine = ({ operation, operators }) => {
    const operationKeys = [...operation];

    return (
        <p className="operation-line">
            {operationKeys.map((key) =>
                operators.includes(key) ? (
                    <span style={{ color: "#D77576" }}>{key}</span>
                ) : (
                    key
                )
            )}
        </p>
    );
};

export default OperationLine;

