
import {Header,Content} from  "../../common/components/common"
import React, {Component} from  "react"
import {Tools} from "../../common/tools/tools"
import "../styles/detail-page.css"


class DetailPage extends Component　{
    constructor(props){
        super(props);
        this.state={
            bannerList:[],
            goodsName:"",
            price:"",
            number:"",
            goodsID:""
        }
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
            goodsID:this.props.params.goodsID
        },(data)=>{
            console.log(data)
            this.setState({
                bannerList:JSON.parse(data[0].imgsUrl),
                goodsName:data[0].goodsName,
                price:data[0].price,
                number:data[0].discount,
                goodsID:data[0].goodsID
            });
        })
		//console.log(this.props.params.goodsID)  //路由参数  与app.js中的对应

    }
    addCart(){
        //判断用户是否登录
        var userID = Tools.getUserID();
        console.log(userID)
        userID && $.get("http://datainfo.duapp.com/shopdata/updatecar.php",
            {userID:userID,goodsID:this.state.goodsID,number:1},function(data){
                console.log(data)
                //console.log(this.goodsID)
                if(data==1){
                    alert("添加成功")
                }else{
                    alert("添加失败")
                }
            })
    }
    toCart(){
        //判断用户是否登录,登陆以后再跳转
        Tools.getUserID()&&(window.location.hash = "#/cart")
    }
    toProduct(id){
        //判断用户是否登录,登陆以后再跳转
        window.location.hash = "#/productInfo/"+id;
    }
    render (){
        return (
			<div className="page" id="detail-page">
				<Header title="商品详情" hasBack={true} rightBtn={<a href="javascript:;" onClick={()=>this.toCart()}>购物车</a>} />
				<Content>
					<div className="swiper-container" ref="swiper-container" style={{width:"180vw",marginLeft:"-40vw",position:"relative"}}>
						<div className="swiper-wrapper">
                            {
                                this.state.bannerList.map((ele,i)=><div key={i} className="swiper-slide">
									<img src={ele} />
								</div>)
                            }
						</div>
					</div>
					<div ref="pagination" className="swiper-self-pagination"></div>
					<div className="text-info">
						<div className="p-name">{this.state.goodsName}</div>
						<div className="p-price"><em>￥{this.state.price}.00</em>&nbsp;<del>999</del></div>
						<div className="p-number">购买人数:{this.state.number}</div>
					</div>
					<div className="proDetail"><a href="javascript:;" onClick={()=>this.toProduct(this.state.goodsID)}><em>查看商品详情</em><span>></span></a></div>
					<div className="addCart"><button onClick={()=>this.addCart()} className="add-cart">添加到购物车</button></div>
				</Content>
			</div>
        )
    }
    componentDidMount(){
        this.swiper = new Swiper(this.refs["swiper-container"],{
            pagination:this.refs.pagination,
            slidesPerView:'3',
            loop:true
        })
    }
    componentDidUpdate(){
        this.swiper.update();
        this.swiper.reLoop();
    }
}
export  default  DetailPage