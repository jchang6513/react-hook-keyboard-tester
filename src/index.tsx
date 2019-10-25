import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./assets/scss/style.scss";
import Keyboard from "./components/keyboard";

const App = () => {
  const [keyPressing, setKeyPressing] = useState<string>('');
  const [keyPress, setKeyPress] = useState<string>('');
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const pushPressedKeys = (e: KeyboardEvent) => {
    const { code, key } = e;
    setKeyPress(key);
    if (!pressedKeys.includes(code)) {
      setPressedKeys([...pressedKeys, code]);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      setKeyPressing(e.code);
    });
    document.addEventListener('keyup', () => {
      setKeyPressing('');
    });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', pushPressedKeys);
    return () => document.removeEventListener('keydown', pushPressedKeys);
  }, [pressedKeys.length]);

  return (
    <div className="App">
      <h1>Keyboard tester</h1>
      <h2>
        Last key pressed: <span>{keyPress}</span>
      </h2>
      <Keyboard
        keyPressing={keyPressing}
        pressedKeys={pressedKeys}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
