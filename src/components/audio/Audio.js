import React , { Component } from 'react';
import './Audio.css';
import { connect } from 'react-redux';

class AudioUI extends Component {
	constructor(){
		super();
		this.handleTap = this.handleTap.bind(this);
	}
	render(){
		return (
			<div id="musicAudio">
				<div ref="audioPlay" className="audioPlay" onTouchStart={ this.handleTap }></div>
				<div ref="audioProgress" className="audioProgress">
					<div ref="audioBar" className="audioBar"></div>
					<div ref="audioNow" className="audioNow"></div>
				</div>
				{/*<audio autoPlay src="/music/Music/Music?id=115162&type=url"></audio>*/}
				<audio id="audio" ref="audio" src={ this.props.musicNameId && "/music/Music/Music?id="+ this.props.musicNameId +"&type=url"}></audio>
			</div>
		);
	}
	componentDidUpdate(){
		if( this.props.isMusicPlay ){
			this.audioPlay();
		}
		else{
			this.audioPause();
		}
	}
	componentDidMount(){
		this.handleDrag();
	}
	audioPlay(){
		this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPause.png)';
		this.refs.audio.play(); //让音频进行播放
		this.playing();
		this.timer = setInterval( this.playing.bind(this) , 1000 );
	}
	audioPause(){
		this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPlay.png)';
		this.refs.audio.pause(); //让音频进行暂停
		clearInterval(this.timer);
	}
	playing(){    //监听实时播放
		var audioProgress = this.refs.audioProgress;
		var audioBar = this.refs.audioBar;
		var audioNow = this.refs.audioNow;
		var audio = this.refs.audio;
		var scale = audio.currentTime / audio.duration;  //0~1
		audioBar.style.left = scale * audioProgress.offsetWidth + 'px';
		audioNow.style.width = scale * 100 + '%';
	}
	handleTap(){
		
		if( !this.refs.audio.getAttribute('src') ){
			return false;
		}

		if(this.refs.audio.paused){  //暂停状态
			this.props.isMusicPlayFn(true);
		}
		else{
			this.props.isMusicPlayFn(false);
		}
	}
	handleDrag(){
		var audioProgress = this.refs.audioProgress;
		var audioBar = this.refs.audioBar;
		var audioNow = this.refs.audioNow;
		var audio = this.refs.audio;
		var disX = 0;

		audioBar.ontouchstart = function(ev){
			//console.log(ev);
			var This = this;
			var touch = ev.changedTouches[0];
			disX = touch.pageX - this.offsetLeft;
			document.ontouchmove = function(ev){
				var touch = ev.changedTouches[0];
				var L = touch.pageX - disX;
				
				if(L < 0){
					L = 0;
				}
				else if( L > audioProgress.offsetWidth ){
					L = audioProgress.offsetWidth;
				}

				This.style.left = L + 'px';

				var scale = L / audioProgress.offsetWidth;  // 0~1

				audio.currentTime = scale * audio.duration;
				audioNow.style.width = scale * 100 + '%';

			};
			document.ontouchend = function(){
				document.ontouchmove = document.ontouchend = null;
			};
			return false;
		};

	}
}



function mapStateToProps(state){
	return {
		isMusicPlay : state.isMusicPlay,
		musicNameId : state.musicNameId
	};
}
function mapDispatchToProps(dispatch){
	return {
		isMusicPlayFn(bool){
			dispatch({ type : 'ISMUSICPLAY_CHANGE' , payload : bool });
		}
	};
}

var Audio = connect(mapStateToProps , mapDispatchToProps)( AudioUI );

export default Audio;