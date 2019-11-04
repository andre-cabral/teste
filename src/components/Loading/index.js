import React, { Component } from 'react';
import '../../assets/styles/Loading.css';

class Loading extends Component {
	render() {
		const {small = false} = this.props;
		return(
			<div className={`loading${small ? ' loading--small': ''}`}>
				<div className="loading__icon"></div>
			</div>
		);
	}
}

export default Loading;
