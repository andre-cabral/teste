import React, { Component } from 'react';
import '../../assets/styles/Loading.css';

class Loading extends Component {
  render() {
    return(
		<div className="loading">
			<div className="loading__icon"></div>
		</div>
    );
  }
}

export default Loading;
