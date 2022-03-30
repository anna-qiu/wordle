import React from 'react';
import { Row } from './row';

export class Board extends React.Component {
  constructor(props) {
    super(props);
    // console.log('board', props);
  }

  getGuess(i) {
    if (i < this.props.guesses.length) 
      return this.props.guesses[i];
    
    if (i === this.props.guesses.length 
      && this.props.guesses[this.props.guesses.length - 1] !== this.props.word)
      return this.props.currentGuess;
    
    return '';
  }

  renderRows() {
    const rows = [];

    for (let i = 0; i < this.props.numRows; i++)
      rows.push(<Row 
        key={`row-${i}`} 
        guess={this.getGuess(i)} 
        word={this.props.word}
        incomplete = {
          i === this.props.guesses.length &&
          this.props.guesses[this.props.guesses.length - 1] !== this.props.word
        }
        />);

    return rows;
  }

  render() {
    return (<div className='board'>
      {this.renderRows()}
    </div>);
  }
}