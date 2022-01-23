window.currentTimeInMs = Date.now();

const getElaspsedTimeInMs = () => {
    return Date.now() - window.currentTimeInMs;
};

const format = (duration) => {
    let milliseconds = parseInt((duration % 1000) / 100);
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    milliseconds = ((duration / 100) % parseInt(seconds * 100)) % 100;
    if (isNaN(milliseconds)) milliseconds = duration / 100;
    milliseconds = milliseconds.toString().padStart(2, "0");

    return { minutes, seconds, milliseconds };
};

const listenTap = (onSingleTap, onDoubleTap) => {
    let keyPressedCount = 0;
    window.addEventListener("keydown", (e) => {
        keyPressedCount++;
        e.preventDefault();
        if (e.code !== "Space") return;
        setTimeout(() => {
            if (keyPressedCount == 1) onSingleTap();
            if (keyPressedCount == 2) onDoubleTap();
            keyPressedCount = 0;
        }, 200);
    });
};

export { listenTap, format, getElaspsedTimeInMs };
