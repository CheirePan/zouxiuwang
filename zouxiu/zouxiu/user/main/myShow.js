/**
 * Created by Administrator on 2017/1/6.
 */

import {Header,Content,Footer} from  "../../common/components/common"
import  "../styles/user-center.css"
import React, {Component} from  "react"
import {Tools} from "../../common/tools/tools"

/*class exitPage extends Component{
    constructor(props){
        super(props)
        this.props.hasShow=false

    }
    exitLogin(){

        window.localStorage.removeItem("userID");
        window.location.reload();
        this.props.hasShow=!this.props.hasShow;
    }
    render(){
        let contentStyle={
            "display":this.props.hasShow?"none":"block"
        };
        return (
            <div className="exit-page" style={contentStyle} hasShow={false}>
                <div className="zhezhao"></div>
                <div className="exit">
                    <p>退出登录</p>
                    <div className="no-ok">
                        <button onClick={()=>this.exitLogin()}>确定</button>
                        <button>取消</button>
                    </div>
                </div>
            </div>
        )
    }
}*/



class UserCenterPage extends  Component {
    constructor(props){
        super(props)
        this.state={
            src:"images/myPic.png"
        };
    }
    goto(){
        var id=Tools.getUserID();
        if(id==null||!id){
            window.location.hash="#/login"
        }else{

            /*alert("退出登录");
            window.localStorage.removeItem("userID");
            window.location.reload();*/
        }
    }
    exit(){
        window.localStorage.removeItem("userID");
        window.location.reload();
    }
    loginState(){
        var id=window.sessionStorage.getItem("userID")||window.localStorage.getItem("userID");
        if(id==null||!id){
            id="未知"
        }else{
            id=Tools.getUserID();
            this.state={
                src:"images/myPic2.png"
            };
        }
        return id;
    }
    render () {
        var id=this.loginState();
        return (
            <div className="page" id="user-center-page">
                <Header title="个人中心" hasBack={false} />
                <Content hasFooter={true}>
                    <div className="myInfo">
                        <a href="javascript:;" onClick={()=>this.goto()}><img src={this.state.src}/></a>
                        <div className="newsInfo">
                            <span>昵称：<em>{id}</em></span><br/>
                            <span>余额：<em>0</em></span>
                        </div>
                        <div className="clear"></div>

                    </div>

                    <ul className="center-list">
                        <li><a className="arrow-item" href="#/order-list">我的订单<i>></i></a></li>
                        <li><a className="arrow-item" href="javascript:;">我的优惠券<i>></i></a></li>
                        <li><a className="arrow-item" href="#/footmark">浏览记录<i>></i></a></li>
                        <li><a className="arrow-item" href="javascript:;">我的收藏<i>></i></a></li>
                        <li><a className="arrow-item no-bor" href="javascript:;" onClick={()=>this.exit()}>退出登录<i>></i></a></li>
                    </ul>
                </Content>

                <Footer active={3} />

            </div>
        )
    }
}

export  default UserCenterPage