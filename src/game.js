import React from 'react';
import { Board } from './board';
import { Keyboard } from './keyboard';
import { VALID_GUESSES } from './valid';

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
    
    const defaultClick = key => () => {
      this.setState({
        ...this.state,
        currentGuess: this.state.currentGuess.length < 5 ? this.state.currentGuess + key.toUpperCase() : this.state.currentGuess
      });
    }

    const specialClicks = {
      "Enter": () => this.checkEnter(),
      "Delete": () => this.deleteLetter()
    }

    return (<div className='game'>
      <div className='boards'>{boards}</div>
      <Keyboard defaultClick={defaultClick} specialClicks={specialClicks} />
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
      else if (e.key === "Backspace" || e.key === "Clear" || e.key === "Delete") {
        this.deleteLetter();
      }
      else if (e.key === "Enter") {
        this.checkEnter();
      }
    }
  }

  checkEnter() {
    if (this.state.currentGuess.length === 5){ 
      if (VALID_GUESSES.includes(this.state.currentGuess.toLowerCase())) {
        this.setState({
          ...this.state,
          guesses: this.state.guesses.concat(this.state.currentGuess),
          currentGuess: ''
        })
      } else {
        this.setState({
          ...this.state,
          currentGuess: ''
        })
      }
    }
  }

  deleteLetter() {
    this.setState({
      ...this.state,
      currentGuess: this.state.currentGuess.substring(0, this.state.currentGuess.length - 1)
    })
  }
}