import React, { useEffect } from 'react';
import '../assets/scss/keyboard.scss';

import ansi104 from '../assets/layout/ANSI104.json';

type TKey = string | {[key: string]: number};
type KeyRow = TKey[];
type KeyMap = KeyRow[];

const Keyboard = () => {
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
                    if (key.w) { nextKeyWidth = key.w }
                    if (key.h) { nextKeyHeight = key.h }
                    if (key.x) {
                      currentRowWidth += key.x;
                      return <div className="key-space" style={{height: unit, width: unitWidth(key.x)}} />
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
