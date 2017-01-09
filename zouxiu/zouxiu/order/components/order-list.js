/**
 * Created by Administrator on 2017/1/6.
 */

import React,{Component} from "react"
import "../styles/order-list.css"

//订单列表
class OrderProductInfo extends Component{
    constructor(props){
        super(props);
    }
    render(){
        //初始状态
        var data = this.props.productInfo||[];   //数组
        //console.log(data);   //数组，，调用父组件ConfirmPage的商品数据
        return (
            //this.props.produactInfo  接收数据
            <ul className="order-product-info">
                {
                    data.map((ele,i)=><li key={i}>
                        <img src={ele.goodsListImg} />
                        <div className="text-info">
                            <p>{ele.goodsName}</p>
                        </div>
                        <div className="num-info">
                            <p><em>￥{ele.price}</em></p>
                            <p>x{ele.number}</p>
                        </div>
                    </li>)
                }
            </ul>
        )
    }
}

export {OrderProductInfo}