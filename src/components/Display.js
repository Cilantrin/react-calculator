import { useState, useRef } from "react";

const Display = () => {
    const [operation, setOperation] = useState("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "9", "0", "."];
    const operators = ["+", "-", "x", "*", "/", "="];
    const functions = ["c", "Backspace", "(", ")", "%"];
    const validKeys = numbers.concat(operators, functions);

    const handleKey = (key) => {
        if (key === "c") {
            setOperation("");
        } else if (key === "Backspace") {
            setOperation(operation.slice(0, -1));
        } else if (key === "=") {
            setOperation(eval(operation));
        } else if (key === "%") {
            setOperation(operation + "*0.01");
        } else if (key === "(") {
            setOperation(operation + "*(");
        } else if (key === ")") {
            setOperation(operation + ")");
        } else {
            setOperation(operation + key);
        }
    };

    const keyDownHandler = (e) => {
        e.preventDefault();

        const pressedKey = e.key;

        if (!validKeys.includes(pressedKey)) return;

        handleKey(pressedKey);
    };

    return (
        <div className="display">
            <div className="container">
                <textarea
                    name="operation"
                    className="operation"
                    onKeyDown={(e) => keyDownHandler(e)}
                ></textarea>
                <div className="operation-input"></div>
            </div>
        </div>
    );
};

export default Display;
