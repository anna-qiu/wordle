import React from 'react';
import { Board } from './board';
import { Keyboard } from './keyboard';
import { Popup } from './popup';
import { VALID_GUESSES } from './valid';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: this.generateWords().map(w => w.toUpperCase()),
      guesses: [],
      currentGuess: '',
      popupText: '',
      popupTimer: null
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
    // const words = this.generateWords().map(w => w.toUpperCase());
    // this.setState({
    //   ...this.state,
    //   words: words
    // });
    const words = this.state.words;
    // console.log('words', words);

    const boards = [];
    for (let i = 0; i < words.length; i++) {
      // console.log('word', words[i]);
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
      <Popup text={this.state.popupText}></Popup>
      <div className='boards'>{boards}</div>
      <Keyboard defaultClick={defaultClick} specialClicks={specialClicks} />
    </div>);
  }

  componentDidMount() {
    if (window.localStorage.getItem("15210-dordle")) {
      this.setState({
        ...this.state,
        guesses: JSON.parse(window.localStorage.getItem("15210-dordle"))
      })
    }

    document.onkeydown = e => {
      // console.log(e.key);
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

  showPopup(text) {
    if (this.state.popupTimer != null) {
      clearTimeout(this.state.popupTimer);
    }

    this.setState({
      ...this.state,
      popupText: text,
      popupTimer: setTimeout(() => {
        this.setState({
          ...this.state,
          popupText: '',
          popupTimer: null
        })
      }, 1500)
    })
  }

  checkEnter() {
    if (this.state.guesses.length >= 7)
      return;
    
    if (this.state.words.every(word => this.state.guesses.includes(word.toUpperCase())))
      return;

    if (this.state.currentGuess.length === 5) {
      if (VALID_GUESSES.includes(this.state.currentGuess.toLowerCase())) {
        this.setState({
          ...this.state,
          guesses: this.state.guesses.concat(this.state.currentGuess),
          currentGuess: ''
        }, () => {
          console.log(this.state.guesses);
          window.localStorage.setItem("15210-dordle", JSON.stringify(this.state.guesses));
          if (this.state.guesses.length === 7) {
            this.showPopup(`the words were ${this.state.words.join(" and ")}`);
          }
        })
      } else {
        this.showPopup("not in word list");
      }
    } else {
      this.showPopup("not enough letters");
    }
  }

  deleteLetter() {
    this.setState({
      ...this.state,
      currentGuess: this.state.currentGuess.substring(0, this.state.currentGuess.length - 1)
    })
  }
}