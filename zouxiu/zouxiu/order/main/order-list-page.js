/**
 * Created by Administrator on 2017/1/5.
 */


import {Header,Content,SubHeader} from "../../common/components/common"
import React,{Component} from "react"
import {OrderProductInfo} from "../components/order-list"
import "../styles/order-list.css"

//订单状态栏（选项卡）
class StateList extends Component{
    constructor(props){
        super(props)
    }
    changeState(index){
        console.log(index)
        this.props.selectOrderState(index);
    }
    render(){
        var data= this.props.stateData||["全部","未支付","待发货","待收货","待评价"];
        return (
            <ul className="order-state-list">
                {
                    data.map((ele,i)=><li key={i} onClick={()=>this.changeState(i)}>{ele}</li>)
                }
            </ul>
        )
    }
}

//按钮
class OrderBtns extends Component{
    constructor(props){
        super(props)
    }
    cancelOrder(orderID){
        this.props.cancelOrder(orderID)
    }
    render(){
        var state= this.props.orderState;
        return (
            <div className="order-btns">
                {
                    state==1?<div>
                        <em>待付款</em>
                        <button>立即付款</button>
                        <button onClick={()=>this.cancelOrder(this.props.orderID)}>取消订单</button>
                    </div>:state==2?<div>
                        <em>待发货</em>
                        <button>提醒发货</button>
                    </div>:state==3?<diiv>
                        <em>待收货</em>
                        <button>确认收货</button>
                    </diiv>:<div>
                        <em>待评价</em>
                        <button>去评价</button>
                    </div>
                }
            </div>
        )
    }
}

//订单列表
class OrderList extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var data= this.props.orderData||[];
        console.log(data);//所有的订单
        return (
            <ul className="order-list">
                {
                    data.map((ele,i)=><li className="order-item" key={i}>
                        <OrderProductInfo productInfo={ele.orderProductInfo} />
                        <div className="total-info">
                            <span>共<em>{ele.totalNumber}</em>件</span>&nbsp;
                            <span>商品实付：<em>￥{ele.totalPrice}</em></span>
                        </div>

                        <OrderBtns orderState={ele.orderState} orderID={ele.orderID} cancelOrder={this.props.cancelOrder} />


                    </li>)
                }
            </ul>
        )
    }
}

//父组件
class OrderListPage extends Component{
    constructor(props){
        super(props)
        //从本地获取所有订单
        var data=JSON.parse(window.localStorage.getItem("orderData")||"[]");

       // [{state:1},{state:2},{state:3}]
        /*data = data.filter(function(ele,index){
            return ele.orderState==1
        });*/

        this.state={
            orderData:data
        };
        console.log(data);
        //当点击切换状态的时候，需要对所有的订单里面的内容进行过滤
        this.selectOrderState = this.selectOrderState.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    cancelOrder(orderID){
        //1,通过orderID找到对应的订单，在数组里删除
        //2,更新state(setState)
        //3,更新本地存储的数据
        console.log("取消订单");
        var state = this.state.orderData;

        state=state.filter(function(ele){
            return ele.orderID!=orderID;
        });
        this.setState({
            orderData:state
        });

        var data=JSON.parse(window.localStorage.getItem("orderData")||"[]");
        data = data.filter(function(ele){
            return ele.orderID!=orderID;
        });
        window.localStorage.setItem("orderData",JSON.stringify(data));

    }


    selectOrderState(index){
        //从本地获取所有订单
        var data=JSON.parse(window.localStorage.getItem("orderData")||"[]");
        //通过index过滤得到要显示的数据
        if(index!=0){
            data = data.filter(function(ele){
                return ele.orderState==index
            });
        }
        //改变组件的state,让组件重新渲染
        this.setState({
            orderData:data
        });
    }
    render(){
        return (
            <div className="page" id="order-page">
                <Header title="我的订单" />
                <SubHeader>
                    <StateList selectOrderState={this.selectOrderState} />
                </SubHeader>
                <Content hasSubHeader={true} hasIScroll={true}>
                    <OrderList orderData={this.state.orderData} cancelOrder={this.cancelOrder} />
                </Content>
            </div>
        )
    }
}

export  default  OrderListPage