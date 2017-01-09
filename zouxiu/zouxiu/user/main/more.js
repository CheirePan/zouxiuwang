import {Header,Content} from  "../../common/components/common"
import React, {Component} from  "react"
import "../styles/more.css"


/*更多内容列表*/
class MoreList extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
        	<ul className="more-list">
        	 <li>
        	 	<a href="#/changePassword">
	        	 	<span className="fleft">修改密码</span>
	        	 	<span className="fright">></span>
        	 	</a>
        	 </li>
        	 <li>
        	 	<a href="#/feedBack">
	        	 	<span className="fleft">用户反馈</span>
	        	 	<span className="fright">></span>
        	 	</a>
        	 </li>
        	 <li>
        	 	<a>
        	 		<span className="fleft">关于</span>
        	 		<span className="fright">></span>
        	 	</a>
        	 </li>
        	</ul>
        )
    }
}
MoreList.defaultProps={
    MoreData:[]
};


/*更多页面的顶层组件*/
class MorePage extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    

    render (){
        return (
            <div className="page" id="list-page">
            	<Header title="更多" />
                <Content>
					<MoreList />
                </Content>
                
            </div>
        )
    }
}
export  default  MorePage
