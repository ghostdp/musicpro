import React , { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

/*class Header extends Component {
	render(){
		return (
			<div id="musicHeader">
				巅峰榜 · 热歌
			</div>
		);
	}
}*/

class HeaderUI extends Component {
	render(){
		return (
			<div id="musicHeader">
			{ this.props.headerArrow && <NavLink to="/list"><span>&lt;</span></NavLink> } { this.props.musicName }
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		headerArrow : state.headerArrow,
		musicName : state.musicName
	};
}
function mapDispatchToProps(dispatch){
	return {};
}

var Header = connect(mapStateToProps , mapDispatchToProps)(HeaderUI);

export default Header;