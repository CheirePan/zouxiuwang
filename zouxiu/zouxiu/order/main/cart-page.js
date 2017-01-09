/**
 * Created by Administrator on 2017/1/4.
 */

import {Header,Content,SubHeader,Footer} from "../../common/components/common"
import {Tools} from "../../common/tools/tools"
import React,{Component} from "react"
import "../styles/cart.css"

//购物车列表  组件
class CartList extends Component{
    constructor(props){     //通过constructor设置初始状态
        super(props)
    }
    render(){
        /*console.log(this.props.cartData);
        console.log(this.props.changeData);*/
        return (
            <ul className="cart-list">
                {
                    this.props.cartData.map((ele,i)=><li key={i} className="cart-item">
                        <a href="###" className="pic"><img src={ele.goodsListImg} /></a>
                        <div className="info">
                            <p className="p-name">{ele.goodsName}</p>
                            <p className="price"><em>￥{ele.price}</em></p>
                            <div className="num-wrap">
                                <span onClick={()=> this.props.changeData(-1,i)} className="minus">-</span>
                                <input type="text" value={ele.number} />
                                <span onClick={()=>this.props.changeData(1,i)} className="plus">+</span>
                            </div>
                        </div>
                        <a className="delete" onClick={()=>this.props.changeData(0,i)} href="javascript:void(0);">删除</a>
                    </li>)
                }
            </ul>
        )
    }
}

//父组件
class CartPage extends Component{
    constructor(props){

        super(props);
        //添加一个状态属性
        this.state={
            cartData:[],
            totalNumber:0,
            totalPrice:0
        };
        let id=Tools.getUserID();   //获取用户名ID
        //若用户 id 存在，则获取json数据
        id && $.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:id},(data)=>{
            /*console.log(data);*/
            //设置状态
            this.setState({
                cartData:data
            });
            //调用总额函数
            this.getTotal(data);
        });
        this.changeData=this.changeData.bind(this);
    }
    changeData(type,index){
        /*console.log(this);
        console.log(type);
        console.log(index);*/

        let id=Tools.getUserID();

        let data=this.state.cartData; //获取当前状态下的数据
        let pid=data[index].goodsID;
        let number=data[index].number;
        if(type){ //1  -1
            //加减
            number=type+number*1;  //*1,,转化为  Number
            data[index].number=number
        }else{ // 0
            //删除
            number=0;
            data.splice(index,1);
        }
        this.setState({
            cartData:data
        });

        this.getTotal(data);

        //数据请求
        //后台数据请求       更新购物车
        let sendData = {"userID":id,"goodsID":pid,"number":number};
        $.get("http://datainfo.duapp.com/shopdata/updatecar.php",sendData,function (data) {
            //console.log(data)
        },"json");
    }

    getTotal(data){
        let number=0;
        let price=0;
        for(let i=0;i<data.length;i++){
            number += data[i].number*1;   //*1,,转化为  Number
            price += data[i].number*data[i].price;
        }
        //重新设置状态
        this.setState({
            totalNumber:number,
            totalPrice:price
        });
    }
    toConfirm(){
        window.localStorage.setItem("cartData",JSON.stringify({
            totalNumber:this.state.totalNumber,
            totalPrice:this.state.totalPrice,
            productInfo:this.state.cartData
        }));
        window.location.hash="#/confirm";
    }

    render(){
        //两种做法 获取总数量和总额  一：封装一个函数getTotal,调用；二：直接在这写计算方法
        /*var number=0;
        var price=0;
        var data=this.state.cartData;
        for(var i=0;i<data.length;i++){
           number+=data[i].number*1;
           price+=data[i].number*data[i].price;
        }*/
        return (
            <div className="page" id="cart-page">
                <Header title="购物车" hasBack={false} rightBtn={<a href="javascript:;" onClick={()=>this.toConfirm()}>结算</a>}  />
                <SubHeader>
                    <div className="cart-bar">
                        <span>商品数量：{this.state.totalNumber}</span>
                        <span>应付总额(不含运费)：￥{this.state.totalPrice}</span>
                    </div>
                </SubHeader>
                <Content hasFooter={true} hasSubHeader={true}>
                    <CartList changeData={this.changeData} cartData={this.state.cartData}/>
                </Content>
                <Footer active="2"/>
            </div>
        )
    }
}

export default CartPage