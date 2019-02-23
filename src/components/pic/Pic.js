import React , { Component } from 'react';
import './Pic.css';
import { connect } from 'react-redux';

class PicUI extends Component {
	constructor(){
		super();
		this.handleTouch = this.handleTouch.bind(this);
	}
	render(){
		return (
			<div id="musicPic">
				<div ref="musicPicDiv" onTouchStart={ this.handleTouch }>
					<img src={ '/music/Music/Music?id='+this.props.match.params.id+'&type=pic' } alt="" />
				</div>
			</div>
		);
	}
	componentDidMount(){
		var id = this.props.match.params.id;
		this.props.headerArrowFn();
		this.props.musicNameIdFn(id);
		if(this.props.isMusicPlay){
			this.picPlay();
		}
		else{
			this.picPause();
		}
	}
	componentDidUpdate(){
		if(this.props.isMusicPlay){
			this.picPlay();
		}
		else{
			this.picPause();
		}
	}
	picPlay(){
		this.refs.musicPicDiv.style.animationPlayState = 'running';
	}
	picPause(){
		this.refs.musicPicDiv.style.animationPlayState = 'paused';
	}
	handleTouch(){
		var id = this.props.match.params.id;
		this.props.history.push('/lyric/' + id);
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

var Pic = connect(mapStateToProps , mapDispatchToProps)(PicUI);

export default Pic;