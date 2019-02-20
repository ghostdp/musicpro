import React , { Component } from 'react';
import './Audio.css';

class Audio extends Component {
	render(){
		return (
			<div id="musicAudio">
				<div className="audioPlay"></div>
				<div className="audioProgress">
					<div className="audioBar"></div>
					<div className="audioNow"></div>
				</div>
			</div>
		);
	}
}
export default Audio;