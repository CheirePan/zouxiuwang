import {Header,Content} from  "../../common/components/common"
import React, {Component} from  "react"
import ReactDOM from "react-dom"
import "../styles/feedBack.css"


/*意见反馈内容列表*/
class FeedBackList extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
        	<ul className="feedBack-list">
                <li>
                	<textarea className="textinput"></textarea>
                </li>
                <li>
                    <input className="feedBack-btn" type="button" value="保存" />
                </li>
                
            </ul>
        )
    }
}
FeedBackList.defaultProps={
    FeedBackData:[]
};


/*意见反馈页面的顶层组件*/
class FeedBackPage extends Component　{
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
            	<Header title="意见反馈" />
                <Content>
					<FeedBackList />
                </Content>
                
            </div>
        )
    }
}
export  default  FeedBackPage
