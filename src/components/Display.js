import { useState } from "react";
import OperationLine from "./OperationLine";

const Display = () => {
    const [operation, setOperation] = useState("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operators = ["+", "-", "x", "*", "×", "/", "÷"];
    const functions = ["c", "Backspace", "=", "Enter", "%"];
    const validKeys = numbers.concat(operators, functions);

    const handleKey = (key) => {
        const findChar = (char) => {
            [...operation].reverse().forEach((opChar) => {
                if (operators.includes(opChar)) return false;
                if (opChar === char) return true;
            });

            // let charFound = false;

            // [...operation].reverse().forEach((opChar) => {
            //     if (operators.includes(opChar)) return;
            //     if (opChar === char) {
            //         charFound = true;
            //         return;
            //     }
            // });

            // return charFound;
        };

        // Prevents the existence of two operators together ("+-") and the existence of an operator after a dot (".+").
        if (
            operators.includes(key) &&
            (operators.includes(operation.at(-1)) || operation.at(-1) === ".")
        )
            return;

        // Prevents the existence of a "." or a "%" after anything other than a number ("+.", "-%").
        if ((key === "." || key === "%") && !numbers.includes(operation.at(-1)))
            return;

        // TODO: clean the messy code.
        if (key === "x" || key === "*") setOperation(operation + "×");
        if (key === "/") setOperation(operation + "÷");
        if (key === "c" || key === "C") setOperation("");
        if (key === "Backspace") setOperation(operation.slice(0, -1));
        if (key === "=" || key === "Enter") {
            if (operators.includes(operation.at(-1))) return;

            const operationToEval = operation
                .replace("×", "*")
                .replace("÷", "/")
                .replace("%", "*0.01");
            // TODO: replace eval() with Function()
            const result = eval(operationToEval);

            setOperation(result.toString());
        } else if (key === "%") {
            const lastOperator = operators.find((operator) =>
                operation.includes(operator)
            );

            // Forces the "%" to only be used with a multiplication.
            if (lastOperator !== "×") return;

            // Only appends the "%" if there are no other "%" signs inside the current operand.
            if (!findChar("%")) setOperation(operation + "%");
        } else if (key === ".") {
            // Only appends the "." if ther eare no other "." characters inside the current operand.
            if (!findChar(".")) setOperation(operation + ".");
        } else {
            // Prevents the existence of a number after a "%" ("4%3").
            if (operation.at(-1) === "%" && numbers.includes(key)) return;
            setOperation(operation + key);
        }
    };

    const keyDownHandler = (e) => {
        e.preventDefault();
        const pressedKey = e.key;

        // If the pressed key is not a valid key, do nothing.
        if (!validKeys.includes(pressedKey)) return;

        handleKey(pressedKey);
    };

    return (
        <div className="display">
            <div className="container">
                {/* The text area only receives input to be eveluated, it doesn't output anything. */}
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
