import React from 'react';

export class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className='popup'>
      {this.props.text}
    </div>);
  }
}