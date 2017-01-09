
//引入css样式
import "../styles/common.css"
import React,{Component} from "react"
import "../styles/iconfont/iconfont.css"

//一些公共组件    头部   尾部   内容区域   分类等等
class Header extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return <div className="header">
            <ul className="header-list">
                <li className="header-btn">
                    {this.props.hasBack?<a href="javascript:;" onClick={()=>window.history.go(-1)}>{"<"}</a>:""}
                </li>
                <li className="header-tit">{this.props.title}</li>
                <li className="header-btn">
                    {this.props.rightBtn||(this.props.hasSearch?<a>搜索</a>:"")}
                </li>
            </ul>
        </div>
    }
}
Header.defaultProps={
    hasBack:true
};

//尾部
class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div className="footer">
                <ul className="footer-list">
                    {
                        this.props.footerData.map((ele,i)=><li key={i}>
                            <a href={ele.path} className={i==this.props.active?"active":""}><span><i className="iconfont">{ele.icon}</i></span><p>{ele.text}</p></a>
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}
Footer.defaultProps={
    footerData:[
        {text:"首页",icon:"\ue60a","path":"/"},
        {text:"列表",icon:"\ue606","path":"#/list"},
        {text:"购物车",icon:"\ue607","path":"#/cart"},
        {text:"我的秀",icon:"\ue602","path":"#/myShow"},
        {text:"更多",icon:"\ue601","path":"#/more"}
    ]
};


//内容区
class Content extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        //定义样式
        let contentStyle={
            "overflowY":this.props.hasIScroll?"hidden":"auto"
        };
        let contentClass = "content"+(this.props.hasFooter?" has-footer":"")+(this.props.hasSubHeader?" has-sub-header":"");

        //this.props.hasIScroll  如果需要iscroll就必须引入isscroll的结构

        return <div className={contentClass} style={contentStyle}>
            {
                this.props.hasIScroll?
                    <div className="scroll-wrap" ref="scrollWrap">
                        <div className="scroller">
                            {this.props.children}
                        </div>
                    </div>:this.props.children
            }
        </div>
    }
    componentDidMount(){
        //react-iscroll 插件

        //组件渲染完成以后，获取scroll-wrap，创建iscroll
        //如果需要iscroll再创建
        this.props.hasIScroll && (this.myScroll=new IScroll(this.refs.scrollWrap))
    }
    componentDidUpdate(){
        //组件更新的时候，也更新iscroll
        this.props.hasIScroll && this.myScroll.refresh()
    }
}

//分类组件
class SubHeader extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="sub-header">{this.props.children}</div>
        )
    }
}

export { Header,Footer,Content,SubHeader}