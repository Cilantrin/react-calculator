import { useState } from "react";
import OperationLine from "./OperationLine";

const Display = () => {
    const [operation, setOperation] = useState("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operators = ["+", "-", "x", "*", "×", "/", "÷"];
    const functions = ["c", "Backspace", "=", "Enter", "%"];
    const validKeys = numbers.concat(operators, functions);

    const handleKey = (key) => {
        // Prevents the existence of two operators together "+-" and the existence of an operator after a dot ".+"
        if (
            operators.includes(key) &&
            (operators.includes(operation.at(-1)) || operation.at(-1) === ".")
        )
            return;

        if (key === "x" || key === "*") setOperation(operation + "×");
        else if (key === "/") setOperation(operation + "÷");
        else if (key === "c" || key === "C") setOperation("");
        else if (key === "Backspace") setOperation(operation.slice(0, -1));
        else if (key === "=" || key === "Enter") {
            if (operators.includes(operation.at(-1))) return;

            const operationToEval = operation
                .replace("×", "*")
                .replace("÷", "/")
                .replace("%", "*0.01");
            const result = eval(operationToEval);

            setOperation(result.toString());
            return;
        } else if (key === "%") {
            const lastOperator = operators.find((operator) =>
                operation.includes(operator)
            );

            if (lastOperator !== "×") return;
            if (!numbers.includes(operation.at(-1))) return;

            let percentSignFound = false;

            for (let i = operation.length; i !== 0; i--) {
                const currentChar = operation[i];

                if (operators.includes(currentChar)) return;
                if (currentChar === "%") percentSignFound = true;
            }

            if (!percentSignFound) {
                setOperation(operation + "%");
            }
            return;
        } else if (key === ".") {
            if (!numbers.includes(operation.at(-1))) return;
            let dotFound = false;

            for (let i = operation.length; i !== 0; i--) {
                const currentChar = operation[i];

                if (operators.includes(currentChar)) return;
                if (currentChar === ".") dotFound = true;
            }

            if (!dotFound) {
                setOperation(operation + ".");
            }
            return;
        } else {
            if (operation.at(-1) === "%" && numbers.includes(key)) return;

            setOperation(operation + key);
            return;
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
