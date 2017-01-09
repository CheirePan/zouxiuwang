/**
 * Created by Administrator on 2017/1/5.
 */

import {Header,Content} from "../../common/components/common"
import React,{Component} from "react"
import {OrderProductInfo} from "../components/order-list"
import "../styles/confirm.css"

//console.log(OrderProductInfo)

//尾部 组件（提交订单）
class ConfirmFooter extends Component{
    constructor(props){
        super(props);
    }
    orderSubmit(){
        console.log("提交订单");
        console.log(this.props.orderData);
        console.log(this.props.totalNumber);
        console.log(this.props.totalPrice);

        //定义一个订单数据模型
        //状态   1 未付款  2 未发货 3 待发货  4 待评价
        var orderItem={
            orderID:new Date().getTime(),//通过时间戳来生成订单Id,本应该是后台生成的
            orderState:1,
            totalNumber:this.props.totalNumber,
            totalPrice:this.props.totalPrice,
            orderProductInfo:this.props.orderData.productInfo
        };
        //window.localStorage.getItem("orderData") ==null  没有订单的情况
        //之前没有订单的话，让订单的数组等于空数组
        var orderArray=JSON.parse(window.localStorage.getItem("orderData")||"[]");  //数组对象
        //console.log(orderArray);
        //在订单列表里添加当前订单
        orderArray.push(orderItem);
        console.log(orderArray);
        //保存到localStorage里
        window.localStorage.setItem("orderData",JSON.stringify(orderArray));
        //console.log(window.localStorage.getItem("orderData"))
        window.location.hash="#/myShow";
    }
    render(){
        //console.log(this.props);//Object {totalNumber: 1960, totalPrice: 487110, orderData: Object}
        return (
            <div className="confirm-footer">
                <p className="num-info">
                    <span>共<em>{this.props.totalNumber}</em>件 ,</span>
                    <span>总金额 <em>￥{this.props.totalPrice}</em></span>
                </p>
                <button onClick={()=>this.orderSubmit()}>提交订单</button>
            </div>
        )
    }
}
//主体  父组件
class ConfirmPage extends Component{
    constructor(props){
        super(props);
        //先从 本地存储里面 获取
        var data=window.localStorage.getItem("cartData"); //字符串
        //console.log(data);
        //格式转换
        data = JSON.parse(data);
        //console.log(data);  //Object {totalNumber: 1960, totalPrice: 487100, productInfo: Array[4]}
        //追加一个状态属性对象
        this.state={
            orderData:data,
            yunFei:10
        };
    }
    render(){ //渲染页面
        var data = this.state.orderData;
        console.log(data)
        var allPrice=this.state.yunFei+data.totalPrice;
        //console.log(this.state.orderData.productInfo);
        return(
            <div className="page" id="confirm-page">
                <Header title="确认订单" hasBack={false} />
                <Content hasFooter={true}>
                    <div className="ads-info">lan 13111111111 北京市</div>
                    <div className="order-info">
                        <OrderProductInfo productInfo={data.productInfo} />
                        <div className="order-price">
                            <p>运费:<em>￥{this.state.yunFei}</em></p>
                            <p>实付(含运费)：<em className="orange">{allPrice}</em></p>
                        </div>
                        <textarea className="user-info" placeholder="信息备注">{}</textarea>
                    </div>
                </Content>
                <ConfirmFooter totalNumber={data.totalNumber} totalPrice={allPrice} orderData={data} />
            </div>
        )
    }
}

export default ConfirmPage