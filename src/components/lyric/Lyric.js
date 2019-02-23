import React , { Component } from 'react';
import './Lyric.css';
import axios from 'axios';
import { connect } from 'react-redux';

class LyricUI extends Component {
	constructor(){
		super();
		this.state = {
			/*{ time : [00:11.22] , lyric : 'aaaa' }*/
			lyricList : [],
			active : -1
		};
		this.handleTouch = this.handleTouch.bind(this);
	}
	render(){
		return (
			<div id="musicLyric">
				<ul ref="musicLyricUl" onTouchStart={ this.handleTouch }>
					{
						this.state.lyricList.map((item,index)=>{
							return <li key={index} className={ this.state.active === index ? 'active' : '' }>{item.lyric}</li>;
						})
					}
				</ul>
			</div>
		);
	}
	componentDidMount(){
		var id = this.props.match.params.id;
		//console.log(id);
		axios.get('/music/Music/Music?id='+id+'&type=lrc').then((res)=>{
			//console.log(res);
			this.setState({
				lyricList : this.formatLyricData(res.data)
			});
		});
		//触发箭头的状态管理
		this.props.headerArrowFn();
		this.props.musicNameIdFn(id);

		if(this.props.isMusicPlay){
			this.lyricPlay();
		}
		else{
			this.lyricPause();   // 暂停的时候不触发
		}

	}
	componentWillReceiveProps(nextProps){  //当传递进入当前组件的props发生变化的时候
		if(nextProps.isMusicPlay){
			this.lyricPlay();
		}
		else{
			this.lyricPause();   // 暂停的时候不触发
		}
	}
	componentWillUnmount(){
		this.lyricPause();
	}
	formatLyricData(lyrics){
		var result = [];
		
		var re = /\[([^\]]+)\]([^[]+)/g;

		lyrics.replace(re,($0,$1,$2)=>{
			result.push({ time : this.formatTimeToSec($1) , lyric : $2 });
		});
		return result;
	}
	formatTimeToSec(time){
		var arr = time.split(':');
		return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(2);
	}
	lyricPlay(){
		this.playing();
		this.timer = setInterval( this.playing.bind(this) , 500 );
	}
	lyricPause(){
		clearInterval(this.timer);
	}
	playing(){
		var lyricList = this.state.lyricList;
		var audio = document.getElementById('audio');
		var musicLyricUl = this.refs.musicLyricUl;
		var musicLyricLi = musicLyricUl.getElementsByTagName('li')[0];

		for(var i=0;i<lyricList.length;i++){
			if( lyricList[i].time < audio.currentTime && lyricList[i+1].time > audio.currentTime ){
				//console.log( lyricList[i].lyric );
				this.setState({
					active : i
				});
				if( i > 5 ){
					musicLyricUl.style.top = - (i-5) * (musicLyricLi.offsetHeight + 15) + 'px';
				}
			}
		}
	}
	handleTouch(){
		var id = this.props.match.params.id;
		this.props.history.push('/pic/' + id);
	}
}

function mapStateToProps(state){
	return {
		isMusicPlay : state.isMusicPlay
	};
}
function mapDispatchToProps(dispatch){
	return {
		headerArrowFn(){
			dispatch({ type : 'HEADERARROW_CHANGE' , payload : true });
		},
		musicNameIdFn(id){
			dispatch({ type : 'MUSICNAMEID_CHANGE' , payload : id });
		}
	};
}

var Lyric = connect(mapStateToProps , mapDispatchToProps)(LyricUI);

export default Lyric;