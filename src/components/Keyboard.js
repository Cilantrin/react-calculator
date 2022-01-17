import Key from "./Key";

const Keyboard = () => {
    return (
        <div className="keyboard">
            <div className="row row1">
                <Key icon={"AC"} />
                <Key icon={"( )"} />
                <Key icon={"%"} />
                <Key icon={"÷"} />
            </div>
            <div className="row row2">
                <Key icon={"7"} />
                <Key icon={"8"} />
                <Key icon={"9"} />
                <Key icon={"×"} />
            </div>
            <div className="row row3">
                <Key icon={"4"} />
                <Key icon={"5"} />
                <Key icon={"6"} />
                <Key icon={"-"} />
            </div>
            <div className="row row4">
                <Key icon={"1"} />
                <Key icon={"2"} />
                <Key icon={"3"} />
                <Key icon={"+"} />
            </div>
            <div className="row row5">
                <Key icon={"+/-"} />
                <Key icon={"0"} />
                <Key icon={"."} />
                <Key icon={"="} />
            </div>
        </div>
    );
};

export default Keyboard;
