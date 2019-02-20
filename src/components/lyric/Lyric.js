import React , { Component } from 'react';
import './Lyric.css';
import axios from 'axios';
import { connect } from 'react-redux';

class LyricUI extends Component {
	constructor(){
		super();
		this.state = {
			/*{ time : [00:11.22] , lyric : 'aaaa' }*/
			lyricList : []
		};
	}
	render(){
		return (
			<div id="musicLyric">
				<ul>
					{
						this.state.lyricList.map((item,index)=>{
							return <li key={index}>{item.lyric}</li>;
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
	}
	formatLyricData(lyrics){
		var result = [];
		var re = /\[([^\]]+)\]([^[]+)/g;
		lyrics.replace(re,function($0,$1,$2){
			result.push({ time : $1 , lyric : $2 });
		});
		return result;
	}
}

function mapStateToProps(state){
	return {
		
	};
}
function mapDispatchToProps(dispatch){
	return {
		headerArrowFn(){
			dispatch({ type : 'HEADERARROW_CHANGE' , payload : true });
		}
	};
}

var Lyric = connect(mapStateToProps , mapDispatchToProps)(LyricUI);

export default Lyric;