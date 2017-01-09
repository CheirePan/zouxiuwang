
/*import React, {Component} from  "react"
import ReactDOM from "react-dom"*/
/*import {Router,Route,hashHistory} from "react-router"
 import IndexPage from "./main/indexPage"
 import ListPage from "./main/list-page"
 import DetailPage from "./main/detail-page"
 import CartPage from "./main/cart-page"
 import {Header,Footer,Content,SubHeader} from  "./components/common"
 import ProductList from "./components/product-list"*/

import React from  "react"
import ReactDOM from "react-dom"

import IndexPage from "./product/main/index-page"
import ListPage from "./product/main/list-page"
import DetailPage from "./product/main/detail-page"
import ProInformation from "./product/main/productInfo"
import FootmarkPage from "./product/main/footmark-page"

import CartPage from "./order/main/cart-page"
import ConfirmPage from "./order/main/confirm-page"
import OrderListPage from "./order/main/order-list-page"

import LoginPage from "./user/main/login-page"
import RegisterPage from "./user/main/register-page"
import UserCenterPage from "./user/main/myShow"
import MorePage from "./user/main/more"
import ChangePasswordPage from "./user/main/changePassword"
import FeedBackPage from "./user/main/feedBack"


/*一旦出现页面跳转时，就要用到路由*/
import {Router,Route,hashHistory} from "react-router"



ReactDOM.render(<Router history={hashHistory}>

    <Route path="/" component={IndexPage} />
    <Route path="/list" component={ListPage} />
    <Route path="/detail/:goodsID" component={DetailPage} />
    <Route path="/productInfo/:goodsID" component={ProInformation} />
    <Route path="/footmark" component={FootmarkPage} />

    <Route path="/cart" component={CartPage} />
    <Route path="/confirm" component={ConfirmPage} />
    <Route path="/order-list" component={OrderListPage} />

    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/myShow" component={UserCenterPage} />
    <Route path="/more" component={MorePage} />
    <Route path="/changePassword" component={ChangePasswordPage} />
    <Route path="/feedback" component={FeedBackPage} />
</Router>,document.getElementById("root"));





if(module.hot){
    module.hot.accept();
}