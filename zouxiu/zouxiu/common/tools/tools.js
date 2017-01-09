/**
 * Created by Administrator on 2017/1/4.
 */


let Tools={
    getUserID:function(){
        let id = window.sessionStorage.getItem("userID")||window.localStorage.getItem("userID");
        console.log(id)
        if(!id||id==null){
            window.location.hash="#/login";
        }
        return id;
    },
    setUserID:function(id){
        window.localStorage.setItem("userID",id);
    },
    setUsernameID:function(id){
        window.sessionStorage.setItem("userID",id);
    }
};




export {Tools}
