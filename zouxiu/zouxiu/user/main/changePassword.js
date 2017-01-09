import {Header,Content} from  "../../common/components/common"

import React, {Component} from  "react"
import ReactDOM from "react-dom"
import "../styles/changePassword.css"


/*修改密码内容列表*/
class ChangePasswordList extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
        	<ul className="changePassword-list">
                <li>
                    <input className="username" type="text" placeholder="请输入原密码" />

                </li>
                <li>
                   <input className="password" type="password" placeholder="请输入新密码"  />

                </li>
                <li>
                   <input className="password" type="password" placeholder="请再次输入新密码"  />

                </li>
                <li>
                    <input className="changePassword-btn" type="button" value="保存" />
                </li>
                
            </ul>
        )
    }
}
ChangePasswordList.defaultProps={
    ChangePasswordData:[]
};


/*修改密码页面的顶层组件*/
class ChangePasswordPage extends Component　{
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
            	<Header title="修改密码" />
                <Content>
					<ChangePasswordList />
                </Content>
                
            </div>
        )
    }
}
export  default  ChangePasswordPage

