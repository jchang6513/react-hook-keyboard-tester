import React, { useEffect, useState } from 'react';
import '../assets/scss/keyboard.scss';

import ansi104 from '../assets/layout/ANSI104.json';

type TKey = {
  w?: number;
  h?: number;
  x?: number;
  y?: number;
  legend?: string;
  keyCode?: string;
};
type KeyRow = TKey[];
type KeyMap = KeyRow[];

type KeyboardProps = {
  keyPressing: string;
  pressedKeys: string[];
}
const Keyboard = (props: KeyboardProps) => {
  const {
    keyPressing,
    pressedKeys
  } = props;
  const keyMap: KeyMap = ansi104;
  const unit = '60px';
  const unitWidth = (value: number) => `calc(${value} * ${unit})`;

  let maxKeyWidth = 0;
  let currentRowWidth = 0;

  useEffect(() => {
    (document.getElementById('keyboard') as any).style.width = `calc(${maxKeyWidth} * ${unit})`
  }, [maxKeyWidth]);

  return (
    <div id="keyboard">
      {
        keyMap.map(row => {
          if ( maxKeyWidth < currentRowWidth) {
            maxKeyWidth = currentRowWidth;
          }
          currentRowWidth = 0;
          return (
            <div className="row" style={{height: unit}}>
              {
                row.map(key => {
                  const {
                    w, h, x, legend, keyCode
                  } = key;
                  const keyWidth = w || 1;
                  const keyHeight = h || 1;
                  if (x) {
                    currentRowWidth += x;
                    return <div className="key-space" style={{height: unit, width: unitWidth(x)}} />
                  }

                  if (legend && keyCode) {
                    currentRowWidth += keyWidth;
                    return (
                      <div
                        className={`key ${keyCode} ${pressedKeys.includes(keyCode) && 'pressed'} ${keyPressing === keyCode && 'pressing'}`}
                        style={{
                          height: unitWidth(keyHeight),
                          width: unitWidth(keyWidth)
                        }}
                      >
                        <div className="keyCap">
                          { legend.split('\n').map(k => <p>{k}<br/></p>) }
                        </div>
                      </div>
                    )
                  }
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Keyboard
