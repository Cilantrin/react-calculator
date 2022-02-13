import Key from "./Key";

const Keyboard = ({ operation, setOperation, handleKey }) => {
    const keys = [
        {
            AC: "c",
            DEL: "Backspace",
            "%": "%",
            "÷": "/",
        },
        {
            7: "7",
            8: "8",
            9: "9",
            "×": "x",
        },
        {
            4: "4",
            5: "5",
            6: "6",
            "-": "-",
        },
        {
            1: "1",
            2: "2",
            3: "3",
            "+": "+",
        },
        {
            0: "0",
            ".": ".",
            "=": "=",
        },
    ];

    return (
        <div className="keyboard">
            {keys.map((rowKeys, index) => (
                <div className={`row row${index + 1}`}>
                    {Object.entries(rowKeys).map((rowKey) => (
                        <Key
                            icon={rowKey[0]} // key: icon
                            action={rowKey[1]} // value: action
                            operation={operation}
                            setOperation={setOperation}
                            handleKey={handleKey}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
