import { useState } from "react";

const Display = () => {
    const [operation, setOperation] = useState("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "9", "0"];
    const operators = ["+", "-", "x", "*", "/", "="];
    const functions = ["c", "Backspace", "(", ")", "%"];
    const validKeys = numbers.concat(operators, functions);
    const lineBreak = document.createElement("br");

    const keyDownHandler = (e) => {
        e.preventDefault();

        const pressedKey = e.key;

        if (!validKeys.includes(pressedKey)) {
            console.log("This is not a valid key");
            return;
        }

        if (
            pressedKey !== "=" &&
            pressedKey !== "c" &&
            pressedKey !== "Backspace"
        ) {
            setOperation(`${operation}${pressedKey}`);
            setOperation(operation + pressedKey);
        } else {
            if (pressedKey === "=") {
                setOperation(eval(operation));
            } else if (pressedKey === "c") {
                setOperation("");
            } else if (pressedKey === "Backspace") {
                setOperation(operation.slice(0, -1));
            }
        }

        // if the number of characters in the operation is greater than 15, the breakLine element is added to the operation input element
        if (operation.length >= 15) {
            document
                .getElementsByClassName("operation-container")[0]
                .appendChild(lineBreak);
        }
    };

    return (
        <div className="display">
            <div className="container">
                <textarea
                    name="operation"
                    className="operation"
                    onKeyDown={(e) => keyDownHandler(e)}
                ></textarea>
                <div className="operation-input">
                    <p className="operation-container">{operation}</p>
                </div>
            </div>
        </div>
    );
};

export default Display;
