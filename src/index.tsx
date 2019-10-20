import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./assets/scss/style.scss";
import Keyboard from "./components/keyboard";

const App = () => {
  const [pressedKey, setPressedKey] = useState<string>();
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const pushPressedKeys = (e: KeyboardEvent) => {
    const { code } = e;
    setPressedKey(code);
    if (!pressedKeys.includes(code)) {
      setPressedKeys([...pressedKeys, code]);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', pushPressedKeys);
    return () => document.removeEventListener('keydown', pushPressedKeys);
  }, [pressedKeys.length]);

  return (
    <div className="App">
      <h1>Keyboard tester</h1>
      <h3>
        輸入文字：
        <input type="text" value={pressedKey}/>
      </h3>
      <Keyboard
        pressedKeys={pressedKeys}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
