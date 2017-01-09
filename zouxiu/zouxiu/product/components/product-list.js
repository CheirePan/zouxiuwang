/**
 * Created by hasee on 2016/12/30.
 */

import "../styles/product-list.css"
import React,{Component} from "react"

/*写组件的时候，尽量 把组件名写完整，描述清晰*/
class  ProductList extends Component {
     constructor(props){
         super(props)
     }
     //历史记录
     toDetail(ele){
         var footmarkData = JSON.parse(window.localStorage.getItem("footmarkData")||"[]");

         for(var i=0;i<footmarkData.length;i++){
             //判断数组里有没有和列表里要点的的商品一样，一样的话就删除，，，历史记录里不能有重复的
             if(footmarkData[i].goodsID==ele.goodsID){
                 footmarkData.splice(i,1);  //删除第i个，，，就是之前的，
                 break
             }
         }
         footmarkData.unshift(ele); //头部添加一个
         window.localStorage.setItem("footmarkData",JSON.stringify(footmarkData));

         window.location.hash = "#/detail/"+ele.goodsID;

        //JSON.stringify()
     }
     render(){
         return (
             <ul className="product-list">
                 {
                     this.props.productData.map((ele,i)=><li key={i} onClick={()=>this.toDetail(ele)}>

                         	<img src={ele.goodsListImg}/>
                         	<p>{ele.goodsName}</p>
                         	<p>
                         		<em>￥{ele.price}</em>
                         		<del>￥999</del>
                         	</p>

                     </li>)
                 }
             </ul>
         )
     }

}
ProductList.defaultProps={
    productData:[]
};


export default ProductList