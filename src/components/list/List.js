import React , { Component } from 'react';
import axios from 'axios';
import './List.css';
import { connect } from 'react-redux';

class ListUI extends Component {
	constructor(){
		super();
		this.state = {
			musicList : []
		};
		this.isMove = false;
		this.handleMove = this.handleMove.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
	}
	render(){
		return (
			<div id="musicList">
				<ul>
					{/*<li>
						<div className="listOrder">1</div>
						<div className="listName">
							<h3>如歌</h3>
							<p>张杰 ·《烈火如歌》电视剧主题曲</p>
						</div>
					</li>*/}
					{
						this.state.musicList.map((item,index)=>{
							return (
								<li key={item.id} onTouchMove={ this.handleMove } onTouchEnd={ ()=>{this.handleEnd(item.id)} }>
									<div className="listOrder">{ index + 1 }</div>
									<div className="listName">
										<h3>{ item.title }</h3>
										<p>{ item.author }</p>
									</div>
								</li>
							); 		
						})
					}
				</ul>
			</div>
		);
	}
	componentDidMount(){
		axios.post('/api/index/index',{
			"TransCode":"020111",
			"OpenId":"Test",
			"Body":{"SongListId":"141998290"}
		}).then((res)=>{
			//console.log(res.data);
			if( res.data.ErrCode === 'OK' ){
				var musicList = res.data.Body.songs;
				this.setState({
					musicList
				});
			}
		});
		//触发箭头的状态管理
		this.props.headerArrowFn();
	}
	handleMove(){
		this.isMove = true;
	}
	handleEnd(id){
		if(this.isMove){    //滑动的时候
			this.isMove = false;
		}
		else{    //点击的时候
			//编程式路由
			this.props.history.push('/lyric/' + id);
		}
	}
}

function mapStateToProps(state){
	return {
		
	};
}
function mapDispatchToProps(dispatch){
	return {
		headerArrowFn(){
			dispatch({ type : 'HEADERARROW_CHANGE' , payload : false });
		}
	};
}

var List = connect(mapStateToProps , mapDispatchToProps)(ListUI);

export default List;