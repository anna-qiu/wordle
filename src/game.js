import React from 'react';
import { Board } from './board';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guesses: [],
      currentGuess: ''
    }
  }

  generateWords() {
    return ['April', 'Mooos'];
  }

  filterGuesses(word) {
    if (this.state.guesses.includes(word)) {
      return this.state.guesses.slice(0, this.state.guesses.indexOf(word) + 1);
    }

    return this.state.guesses;
  }

  render() {
    const words = this.generateWords().map(w => w.toUpperCase());
    console.log('words', words);

    const boards = [];
    for (let i = 0; i < words.length; i++) {
      console.log('word', words[i]);
      boards.push(<Board 
        key={`board-${i}`} 
        numRows={7} 
        word={words[i]}
        guesses={this.filterGuesses(words[i])}
        currentGuess={this.state.currentGuess} />);
    }
    
    return (<div className='game'>
      {boards}
    </div>);
  }

  componentDidMount() {
    document.onkeydown = e => {
      console.log(e.key);
      if (!e.isComposing && e.key.length === 1 && e.key.match(/[a-z]/i)) {
        this.setState({
          ...this.state,
          currentGuess: this.state.currentGuess.length < 5 ? this.state.currentGuess + e.key.toUpperCase() : this.state.currentGuess
        })
      }
      else if (e.key === "Backspace" || e.key === "Clear" || e.key == "Delete") {
        this.setState({
          ...this.state,
          currentGuess: this.state.currentGuess.substring(0, this.state.currentGuess.length - 1)
        })
      }
      else if (e.key === "Enter") {
        if (this.state.currentGuess.length === 5) {
          this.setState({
            ...this.state,
            guesses: this.state.guesses.concat(this.state.currentGuess),
            currentGuess: ''
          })
        }
        else {
          this.setState({
            ...this.state,
            currentGuess: ''
          })
        }
      }
    }
  }
}