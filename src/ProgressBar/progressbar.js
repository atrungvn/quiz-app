import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import "./styles.css";

let interval = undefined;

export default function App() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 10);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    if (progress === 100) {
      setRunning(false);
      clearInterval(interval);
    }
  }, [progress]);

  return (
    <div className="App">
      <ProgressBar progress={progress} />
      <button
        onClick={() => {
          setRunning(false);
          setProgress(0);
        }}
      >
        Clear
      </button>
      <button onClick={() => setRunning(!running)}>
        {running ? "Stop" : "Start"}
      </button>
    </div>
  );
}
