import React from 'react';
import { Square } from './square';

export class Row extends React.Component {
  constructor(props) {
    super(props);
    // console.log('row', props);

    this.state = {
      squares: []
    }
  }

  computeType(i) {
    if (this.props.guess.length === 0)
      return "empty";
    
    if(this.props.incomplete)
      return i < this.props.guess.length ? "incomplete" : "empty";

    if (this.props.guess.length > 0 
      && this.props.guess[i] === this.props.word[i])
      return "correct";
    
    if (this.props.word.split('').filter(c => c === this.props.guess[i]).length >= this.props.guess.split('').filter(c => c === this.props.guess[i]).length)
      return "shifted";
    
    return "wrong";
  }

  renderSquares() {
    const squares = [];

    for (let i = 0; i < 5; i++)
      squares.push(<Square 
        key={`square-${i}`} 
        letter={this.props.guess.length > 0 ? this.props.guess[i] : ''} 
        type={this.computeType(i)} />);

    return squares;
  }

  render() {
    return (<div className='row'>
      {this.renderSquares()}
    </div>);
  }
}