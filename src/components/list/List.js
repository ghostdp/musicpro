import React , { Component } from 'react';
import axios from 'axios';
import './List.css';
import { connect } from 'react-redux';
import Loading from '../loading/Loading.js';
import { getSessionStorage , setSessionStorage } from '../../tools/index.js';

class ListUI extends Component {
	constructor(){
		super();
		this.state = {
			musicList : [],
			isLoading : true
		};
		this.isMove = false;
		this.handleMove = this.handleMove.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
	}
	render(){
		return (
			<div id="musicList" ref="musicList">
				<ul>
					{/*<li>
						<div className="listOrder">1</div>
						<div className="listName">
							<h3>如歌</h3>
							<p>张杰 ·《烈火如歌》电视剧主题曲</p>
						</div>
					</li>*/}
					{
						this.state.isLoading ? <Loading/> : 

						this.state.musicList.map((item,index)=>{
							return (
								<li className={ this.props.musicNameId ===  '' + item.id ? 'active' : '' } key={item.id} onTouchMove={ this.handleMove } onTouchEnd={ ()=>{this.handleEnd(item.id,item.title)} }>
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
		
		var musicList =  getSessionStorage('musicList');	
		
		if(musicList){  //第二次以后
			
			this.setState({
				musicList : JSON.parse(musicList),
				isLoading : false
			},()=>{
				this.listScrollTop();
			});

		}
		else{   //第一次进来
			axios.post('/api/index/index',{
				"TransCode":"020111",
				"OpenId":"Test",
				"Body":{"SongListId":"141998290"}
			}).then((res)=>{
				//console.log(res.data);
				if( res.data.ErrCode === 'OK' ){
					var musicList = res.data.Body.songs;
					this.setState({
						musicList,
						isLoading : false
					},()=>{
						//console.log( this.refs.musicListUl.offsetHeight );
						this.listScrollTop();
						//设置数据缓存   
						setSessionStorage( 'musicList' , JSON.stringify(this.state.musicList)  );
					});
				}
			});
		}
		//触发箭头的状态管理
		this.props.headerArrowFn();
	}
	listScrollTop(){
		var musicList = this.refs.musicList;
		var musicListLi = musicList.getElementsByTagName('li');
		for(var i=0;i<musicListLi.length;i++){
			if( musicListLi[i].className ){
				musicList.scrollTop = musicListLi[i].offsetTop;
			}
		}
	} 
	handleMove(){
		this.isMove = true;
	}
	handleEnd(id,musicName){
		if(this.isMove){    //滑动的时候
			this.isMove = false;
		}
		else{    //点击的时候
			//编程式路由
			this.props.history.push('/pic/' + id);
			this.props.musicNameIdFn(id);
			this.props.isMusicPlayFn();
			this.props.musicNameFn(musicName);
		}
	}
}

//ul.scrollTop = 200;

function mapStateToProps(state){
	return {
		musicNameId : state.musicNameId
	};
}
function mapDispatchToProps(dispatch){
	return {
		headerArrowFn(){
			dispatch({ type : 'HEADERARROW_CHANGE' , payload : false });
		},
		musicNameIdFn(id){
			dispatch({ type : 'MUSICNAMEID_CHANGE' , payload : id });
		},
		isMusicPlayFn(){
			dispatch({ type : 'ISMUSICPLAY_CHANGE' , payload : true });
		},
		musicNameFn(musicName){
			dispatch({ type : 'MUSICNAME_CHANGE' , payload : musicName });
		}
	};
}

var List = connect(mapStateToProps , mapDispatchToProps)(ListUI);

export default List;