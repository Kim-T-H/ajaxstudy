//WebContent/ajax2.js
var ajax = {}	//객체
ajax.xhr ={}	//또다른 객체.
/*
 * ajax.xhr.Request 객체의 생성자.
 * 	-멤버변수:url , params, callback, method, req
 * 	-멤버메서드: send, getXmlHttpRequest, onStatsChange
 */
ajax.xhr.Request = function(url, params, callback, method){	//생성자
	this.url=url;
	this.params=params;
	this.callback=callback;
	this.method= method;
	this.send();
}
//prototype : 멤버 메서드 구현
ajax.xhr.Request.prototype={
		//XMLHttpRequest 객체 생성 기능을가진 메서드
		getXmlHttpRequest :function(){
			if(window.ActiveXObject){
				try{
					return new ActiveXObject("Msxml2.XMLHTTP");
				}catch(e){
					try{
						return new ActiveXObject("Microsoft.XMLHTTP");
					}catch(e2){return null;}
				}
			}else if(window.XMLHttpRequest){
				return new XMLHttpRequest();
			}else{
				return null;
			}
		},
		send : function(){
			//this.req : ajax 객체 저장. XMLHttpRequest 객체 저장.
			this.req = this.getXmlHttpRequest();
			var httpMethod = this.method?this.method:"GET";
			if(httpMethod != "GET" && httpMethod != "POST"){
				httpMethod = "GET";
			}
			var httpParams =
				(this.params == null || this.params == '')?null:this.params;
			var httpUrl=this.url;
			if(httpMethod == 'GET' && httpParams != null){
				httpUrl = httpUrl + "?" +httpParams;
			}
			this.req.open(httpMethod,httpUrl,true);		//open : ajax 을 보낼수 있는 준비를 함
			this.req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			var request =this;	//this => ajax.xhr.Requset 객체.
			this.req.onreadystatechange = function(){	//콜백 함수 등록:onreadystatschange
				request.onStateChange.call(request);
			}
			this.req.send(httpMethod =="POST"?httpParams:null);
		},
			onStateChange : function(){
			this.callback(this.req);	//현재 가지고 있는 callback 함수를 호출. ajax 객체 전달.
		}
}