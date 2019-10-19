import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./assets/scss/style.scss";
import Keyboard from "./components/keyboard";

const App = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const pushPressedKeys = (keyCode: string) => {
    if (!pressedKeys.includes(keyCode)) {
      console.log(keyCode)
      setPressedKeys([...pressedKeys, keyCode]);
    }
  }

  return (
    <div className="App">
      <h1>Keyboard tester</h1>
      <h3>
        輸入文字：
        <input type="text" onKeyDown={e => pushPressedKeys(e.nativeEvent.code)}/>
      </h3>
      <Keyboard
        pressedKeys={pressedKeys}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
