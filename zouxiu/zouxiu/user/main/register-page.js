/**
 * Created by Administrator on 2017/1/6.
 */

import {Header,Content} from  "../../common/components/common"
import React, {Component} from  "react"
import ReactDOM from "react-dom"
import "../styles/register.css"
import {Tools} from "../../common/tools/tools"
/*注册内容列表*/
class RegisterList extends Component　{
    constructor(props){
        super(props);
        this.state={
            username :"",
            password :"",
            passwordcommon:"",
            status:"register"
        }
    }
    filterUsername(ev){
        this.setState({
            //正则匹配过滤数字和中文
            username:ev.target.value.replace(/[(0-9\u4e00-\u9fa5)]/g,"")
        })
    }
    filterPassword(ev){
        this.setState({
            //正则匹配过滤中文
            password:ev.target.value.replace(/[\u4e00-\u9fa5]/g,"")
        })
    }
    filterPasswordCommon(ev){
        this.setState({
            passwordcommon:ev.target.value.replace(/[\u4e00-\u9fa5]/g,"")
        })
    }
    postReg(e){
        if(this.state.passwordcommon==this.state.password&&!this.state.username==""){
            $.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
                status:this.state.status,
                userID:this.state.username,
                password:this.state.password
            },(data)=>{
                console.log(data)
                if(data==0){
                    alert("用户名已存在！")
                }if (data==1){
                    alert("注册成功！")
                    Tools.getUserID(this.state.username);
                    window.location.hash="#/login";
                }else {
                    alert("注册失败！")
                }})
        }else {
            alert("用户名或密码错误！")
        }
    }



    render (){
        return (
            <ul className="register-list">
                <li>
                    <input className="username" type="text" placeholder="账户名称" onChange={this.filterUsername.bind(this)} value={this.state.username} />

                </li>
                <li>
                    <input className="password" type="password" placeholder="登录密码" onChange={this.filterPassword.bind(this)} value={this.state.password}  />

                </li>
                <li>
                    <input className="password" type="password" placeholder="确认密码" onChange={this.filterPasswordCommon.bind(this)} value={this.state.passwordcommon}  />

                </li>
                <li>
                    <input className="register-btn" type="button" value="确定注册" onClick={this.postReg.bind(this)} />
                </li>

            </ul>

        )
    }
}



/*注册页面的顶层组件*/
class RegisterPage extends Component　{
    constructor(props){
        super(props)
    }

    render (){
        return (
            <div className="page" id="list-page">
                <Header title="用户注册" hasBack={true} />
                <Content>
                    <RegisterList />
                </Content>
            </div>
        )
    }
}
export  default  RegisterPage