import { useState } from "react";
import OperationLine from "./OperationLine";

const Display = ({
    operation,
    setOperation,
    operators,
    validKeys,
    handleKey,
}) => {
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
                {/* The text area only receives input to be evaluated, it doesn't output anything. */}
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
