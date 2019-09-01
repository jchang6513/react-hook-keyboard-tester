import React, { useEffect, useState } from 'react';
import '../assets/scss/keyboard.scss';

import ansi104 from '../assets/layout/ANSI104.json';

type TKey = string | {
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
  pressedKeys: string[];
}
const Keyboard = (props: KeyboardProps) => {
  const { pressedKeys } = props;
  const keyMap: KeyMap = ansi104;
  const unit = '60px';
  const unitWidth = (value: number) => `calc(${value} * ${unit})`;

  let nextKeyWidth = 1;
  let nextKeyHeight = 1;
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
                  const keyWidth = nextKeyWidth;
                  const keyHeight = nextKeyHeight
                  nextKeyWidth = 1;
                  nextKeyHeight = 1;
                  if (typeof key === 'object') {
                    const {
                      w, h, x, y, legend, keyCode
                    } = key;
                    if (w) { nextKeyWidth = w }
                    if (h) { nextKeyHeight = h }
                    if (x) {
                      currentRowWidth += x;
                      return <div className="key-space" style={{height: unit, width: unitWidth(x)}} />
                    }
                    if (legend && keyCode) {
                      return (
                        <div
                          className={`key ${keyCode} ${pressedKeys.includes(keyCode) && 'pressed'}`}
                          style={{
                            height: unitWidth(nextKeyHeight),
                            width: unitWidth(nextKeyWidth)
                          }}
                        >
                          <div className="keyCap">
                            { legend.split('\n').map(k => <p>{k}<br/></p>) }
                          </div>
                        </div>
                      )
                    }
                  } else {
                    currentRowWidth += keyWidth;
                    return (
                      <div className="key" style={{height: unitWidth(keyHeight), width: unitWidth(keyWidth)}}>
                        <div className="keyCap">
                          { key.split('\n').map(k => <p>{k}<br/></p>) }
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
