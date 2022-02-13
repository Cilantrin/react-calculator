import { useState } from "react";
import Display from "./Display";
import Keyboard from "./Keyboard";

const Calculator = () => {
    const [operation, setOperation] = useState("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operators = ["+", "-", "x", "*", "×", "/", "÷"];
    const functions = ["c", "Backspace", "=", "Enter", "%"];
    const validKeys = numbers.concat(operators, functions);

    const handleKey = (key) => {
        // Prevents the existence of two operators together ("+-") and the existence of an operator after a dot (".+").
        if (
            operators.includes(key) &&
            (operators.includes(operation.at(-1)) || operation.at(-1) === ".")
        )
            return;

        // Prevents the existence of a "." or a "%" after anything other than a number ("+.", "-%").
        if ((key === "." || key === "%") && !numbers.includes(operation.at(-1)))
            return;

        if (key === "x" || key === "*") setOperation(operation + "×");
        else if (key === "/") setOperation(operation + "÷");
        else if (key === "c" || key === "C") setOperation("");
        else if (key === "Backspace") setOperation(operation.slice(0, -1));
        else if (key === "=" || key === "Enter") {
            if (operators.includes(operation.at(-1))) return;

            const operationToEval = operation
                .replace(new RegExp("×", "g"), "*")
                .replace(new RegExp("÷", "g"), "/")
                .replace(new RegExp("%", "g"), "*0.01");

            const result = eval(operationToEval);

            setOperation(result.toString());
        } else if (key === "%") {
            const lastOperator = [...operation]
                .reverse()
                .find((opChar) => operators.includes(opChar));

            // Forces the "%" to only be used with a multiplication.
            if (lastOperator !== "×") return;

            // Only appends the "%" if there are no other "%" signs inside the current operand.
            setOperation(operation + "%");
        } else if (key === ".") {
            let dotFound = false;

            for (let i = operation.length; i !== 0; i--) {
                if (operators.includes(operation[i]) || dotFound) break;
                if (operation[i] === ".") dotFound = true;
            }

            if (!dotFound) setOperation(operation + ".");
        } else {
            // Prevents the existence of a number after a "%" ("4%3").
            if (operation.at(-1) === "%" && numbers.includes(key)) return;
            setOperation(operation + key);
        }
    };

    return (
        <div className="calculator">
            <Display
                operation={operation}
                setOperation={setOperation}
                operators={operators}
                validKeys={validKeys}
                handleKey={handleKey}
            />
            <Keyboard
                operation={operation}
                setOperation={setOperation}
                handleKey={handleKey}
            />
        </div>
    );
};

export default Calculator;
