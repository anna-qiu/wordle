import React from 'react';

export class Key extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={`key`} onClick={this.props.onClick}>
      {this.props.value}
    </div>);
  }
}