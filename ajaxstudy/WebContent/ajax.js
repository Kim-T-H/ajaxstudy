//ajaxstudy/WebContent/ajax.js
var ajax = null;
function getAjaxObject(){		//리턴해주는 값이 ajax		ajax 객체 함수
	if(window.ActiveXObject){	//익스플로러 브라우저 니?
		try{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				return new ACtiveXObject("Microsoft.XMLHTTP");
					
				
			}catch(e2){
				return null;
			}
		}
	}else if(window.XMLHttpRequest){		//익스플로워 이외의 브라우저
		return new XMLHttpRequest();	//ajax 객체. 서버와 통신 가능 객체.
	}else{
		return null;
	}
}

/*
 * url: "hello.jsp",
 * params : "name=홍길동",
 * callback:helloFromServer,
 * method:"POST"
 * 
 */
function sendRequest(url,params,callback,method){
	//ajax : ajax 객체 저장. XMLHttpRequest객체.
	ajax=getAjaxObject();
	//httpMethod : GET or Post  요청방식을 가지고 있음.
	var httpMethod =method?method:"GET";
	if(httpMethod != "GET" && httpMethod != "POST"){
		httpMethod= "GET";
	}
	//httpParams : name= 홍길동.
	var httpParams =(params == null || params == '')?null:params;
	var httpUrl =url;
	if(httpMethod == "GET" && httpParams != null){
		httpUrl = httpUrl + "?" +httpParams;	//Get 방식인 경우 url 정보에 파라미터를 전송.
	}
	//true : 비동기 방식 전송.
	ajax.open(httpMethod, httpUrl, true);	//ajax 객체 준비
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//onreadystatechange : 콜백함수 등록 => ajax 객체의 상태가 변경될 때 마다 자동으로 변경되는 함수
	ajax.onreadystatechange =callback;	//HelloFromServer 가 들어가있음.
	ajax.send(httpMethod == "POST"?httpParams:null);	//서버로 전송. 
}