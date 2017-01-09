/**
 * Created by Administrator on 2017/1/6.
 */

/*
import {Header,Content} from  "../../common/components/common"
import  "../styles/login.css"
import React, {Component} from  "react"


class LoginList extends  Component {
    constructor(props){
        super(props)

        this.state={
            showPassword:false,
            remmeber:false,
            password:"222222",
            username:"lining"
        }
    }
    changeShowPassword () {
        this.setState({
            showPassword:!this.state.showPassword
        })
    }
    filterPassword(ev) {
        this.setState({
            password:ev.target.value.replace(/sb/g,"")
        });

    }
    filterUsername(ev) {

        this.setState({
            username:ev.target.value.replace(/m/g,"*")
        });
    }
    loginIn () {

        //登录
        //console.log(this.state.username);
        //console.log(this.state.password);
        window.localStorage.setItem("userID",this.state.username)
        window.location.hash ="#/myShow"

    }

    render () {
        // console.log(this.state.password);
        var passwordType = this.state.showPassword?"text":"password";
        return (
            <ul className="login-list">
                <li>
                    <input type="text"  value={this.state.username} onChange={(e)=>this.filterUsername(e)} className="text-bar" />
                </li>
                <li>
                    <input type={passwordType} onChange={(e)=>this.filterPassword(e)} className="text-bar" value={this.state.password}  />
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        <span>记住密码</span>
                    </label>

                    <a className="go-forget">忘记密码？</a>
                </li>
                <li>
                    <label>
                        <input type="checkbox" onClick={(e)=>this.changeShowPassword(e)} />
                        <span>显示密码</span>
                    </label>
                </li>
                <li>
                    <button className="login-in" onClick={()=>this.loginIn()}>登录</button>
                </li>
                <li>
                    <a className="go-reg" href="#/register">注册</a>
                </li>

            </ul>
        )
    }
}

class LoginPage extends  Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className="page" id="login-page">
                <Header title="登录" hasBack={false} />
                <Content hasFooter={false}>
                    <LoginList/>
                </Content>

            </div>
        )
    }
}

export  default  LoginPage*/

import {Header,Content} from  "../../common/components/common"

import React, {Component} from  "react"
import ReactDOM from "react-dom"
import "../styles/login.css"
import {Tools} from "../../common/tools/tools"
/*登录内容列表*/
class LoginList extends Component　{
    constructor(props){
        super(props)
        this.state={
            showPassword:false,
            // rember:true,
            password:"",
            username:"",
            status:"login",
            checked:true
        }
    }
    changeCheck(e){
        this.setState({
            checked:!this.state.checked
        })
    }

    changeShowPassword() {
        this.setState({
            showPassword:!this.state.showPassword
        })
    }
    filterPassword(ev) {

        this.setState({
            //正则匹配过滤中文
            password:ev.target.value.replace(/[\u4e00-\u9fa5]/g,"")
        });
    }
    filterUsername(ev) {
        this.setState({
            //正则匹配过滤数字和中文
            username:ev.target.value.replace(/[(0-9\u4e00-\u9fa5)]/g,"")
        });

    }
    loginTest(e){
        if (!this.state.username==""&&!this.state.password==""){
            $.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
                status:this.state.status,
                userID:this.state.username,
                password:this.state.password
            },(data)=>{
                if(data==0){
                    alert("用户名不存在！")
                }if(data==2){
                    alert("用户名或密码错误！")
                }else {
                    console.log(data)
                    window.location.hash ="#/myShow";
                    if(this.state.checked==false){
                        Tools.setUsernameID(this.state.username)
                    }else {
                        Tools.setUserID(this.state.username)
                    }
                }
            })
        }else {
            alert("输入格式有误！")
        }
    }
    render (){
        var passwordType = this.state.showPassword?"text":"password";
        return (
            <ul className="login-list">
                <li className="padt1">
                    <input type="text" className="username" onChange={this.filterUsername.bind(this)} value={this.state.username} placeholder="请输入账户"/>
                </li>
                <li>

                    <input type={this.state.showPassword?"text":"password"} onChange={this.filterPassword.bind(this)} value={this.state.password} className="password" placeholder="请输入密码"/>
                </li>
                <li className="ch-item">
                    <label>
                        <input type="checkbox" onClick={this.changeShowPassword.bind(this)} />
                        <span>显示密码</span>
                    </label>

                    <a className="forget">忘记密码?</a>
                </li>
                <li className="ch-item">
                    <label>
                        <input type="checkbox" checked={this.state.checked?"checked":""} onChange={this.changeCheck.bind(this)} />
                        <span>记住密码</span>
                    </label>

                </li>
                <li>
                    <input type="button" className="login-btn" value="登录" onClick={this.loginTest.bind(this)}/>

                </li>
                <li>
                    <a href="/#register" className="to-reg">注册</a>
                </li>
            </ul>

        )
    }
}



/*登录页面的顶层组件*/
class LoginPage extends Component　{
    constructor(props){
        super(props)
    }

    render (){

        return (
            <div className="page" id="list-page">
                <Header title="用户登录" hasBack={false} />
                <Content>
                    <LoginList />
                </Content>
            </div>
        )
    }
}
export  default  LoginPage


