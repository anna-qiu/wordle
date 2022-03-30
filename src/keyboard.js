import React from 'react';
import { Key } from './key';

export class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  genRow(keys) {
    const row = [];

    for (let i = 0; i < keys.length; i++)
      row.push(<Key 
          key={`key-${keys[i]}`}
          value={keys[i]} 
          onClick={keys[i] in this.props.specialClicks ? this.props.specialClicks[keys[i]] : this.props.defaultClick(keys[i])} />);

    return row;
  }

  genRows() {
    const keys = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"]
    ];

    const rows = [];
    
    for (let i = 0; i < keys.length; i++)
      rows.push(<div key={`keyrow-${i}`} className={`keyrow keyrow-${i}`}>
        {this.genRow(keys[i])}
      </div>)

    return rows;
  }

  render() {
    return (<div className='keyboard'>
      {this.genRows()}
    </div>)
  }
}