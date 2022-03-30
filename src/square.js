import React from 'react';

export class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={`square ${this.props.type}`}>{this.props.letter}</div>;
  }
}