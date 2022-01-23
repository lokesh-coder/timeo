import { useEffect, useState, useLayoutEffect } from "react";
import { GlobalHotKeys, configure } from "react-hotkeys";
import "./App.css";
import { format, listenTap } from "./utils";

configure({
    simulateMissingKeyPressEvents: false
});

function App() {
    const [duration, setDuration] = useState(0);
    const [state, setState] = useState("INITIAL");

    useEffect(() => {
        listenTap(
            () => {
                if (state === "INITIAL") setState("RUNNING");
                if (state === "RUNNING") setState("PAUSED");
                if (state === "PAUSED") setState("RUNNING");
            },
            () => {
                setState("INITIAL");
            }
        );
    }, [state]);

    useEffect(() => {
        if (state === "INITIAL") {
            clearInterval(window.timer);
            setDuration(0);
        }
        if (state === "RUNNING") {
            window.timer = setInterval(() => {
                setDuration((duration) => duration + 1);
            }, 100);
        }
        if (state === "PAUSED") {
            clearInterval(window.timer);
        }
    }, [state]);

    const { minutes, seconds, milliseconds } = format(duration * 100);

    return (
        <div className="App">
            <main>
                <h1>
                    <span>{minutes}</span>
                    <span>:</span>
                    <span>{seconds}</span>
                    <small>{milliseconds}</small>
                </h1>
                <p>Press spacebar once - stop . twice to reset</p>
            </main>
        </div>
    );
}

export default App;
