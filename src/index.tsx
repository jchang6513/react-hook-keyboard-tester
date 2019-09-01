import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./assets/scss/style.scss";
import Keyboard from "./components/keyboard";

const App = () => {
  const didMounted = true;
  const [currentKey, setCurrentKey] = useState("");
  const setKeyDownDesc = (keyCode: string) =>
    setCurrentKey(`The key you just press is "${keyCode.replace("Key", "")}".`);

  useEffect(() => {
    document.addEventListener("keydown", e => {
      setKeyDownDesc(e.code);
    });
  }, [didMounted]);
  return (
    <div className="App">
      <h1>Keyboard tester</h1>
      <h3>{currentKey}</h3>
      <Keyboard />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
