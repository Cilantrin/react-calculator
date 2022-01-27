import { useState } from "react";
import OperationLine from "./OperationLine";

const Display = () => {
    const [operation, setOperation] = useState("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operators = ["+", "-", "x", "*", "/"];
    const functions = ["c", "Backspace", "=", "Enter", "(", ")", "%"];
    const validKeys = numbers.concat(operators, functions);

    const handleKey = (key) => {
        switch (key) {
            case "c":
                setOperation("");
                break;
            case "Backspace":
                setOperation(operation.slice(0, -1));
                break;
            case "=":
            case "Enter":
                setOperation(`${eval(operation)}`);
                break;
            case "%":
                setOperation(operation + "*0.01");
                break;
            case "(":
                setOperation(operation + "*(");
                break;
            case ".":
                let operatorFound = false;
                let index = string.length - 1;
                do {
                    if (operation[index] == ".") {
                        break;
                    }
                    index--;
                } while (operatorFound === false);
                break;
            default:
                if (!operators.includes(key) || !operation.endsWith(key)) {
                    setOperation(operation + key);
                }
                break;
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
                <div className="operation-container">
                    <OperationLine
                        operation={operation}
                        operators={operators}
                    />
                </div>
            </div>
        </div>
    );
};

export default Display;
