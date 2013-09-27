/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
;function $(id){
	return document.getElementById(id);
}
function ajax(url, callback){
	var request = new XMLHttpRequest;
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200)
            callback(request.responseText);
    }
    request.open("GET", url);
    request.send(null);
}

var app = {
	isTest: navigator.platform === 'Win32',
		
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	if(app.isTest) { // just for test
    		window.addEventListener('load', this.onDeviceReady, false);
    		document.querySelector('.online').className = "online def";
    	}
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('online', this.onLine, false);
        document.addEventListener('offline', this.offLine, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	Array.prototype.forEach.call(document.querySelectorAll('.btn.large'),function(dom){
    		dom.onclick = function(){
    			if(!app.isOnLine()){
    				app.setError("未连上网,稍后再试.");
    				return;
    			}
    			var id = this.dataset['no'],
    				url = 'http://wap.busditu.com/2/bike/details-'+id+'.html?_t='+(new Date).getTime(),
				callback = function(data){
        			var ret,info,
        				str = data.match(/(可借|名称|地点|服务时间).*/g);
        			if(!str){
        				app.setError("没有找到相关自行车服务点数据.");
        				return;
        			}
        			ret = str[0].replace(/<.*?>/g,'').replace(/辆/g,'');
        			
        			info = ret + '<br><br>' + str[1].replace(/<.*?>/g,'') +"<br><br>"+ str[2].replace(/<.*?>/g,'');
        			app.setInfo(info);
        			
        			alert(ret);
        		};
        		
        		app.setError("");
    			
//        		app.isTest && (url = 'json.html'); // just for test
    			if(id){
    				ajax(url, callback);
    			}else{
    				app.setError("请输入正确的查询编号");
    			}
    		}
    	});
    	
    	$('no').addEventListener('input', app.numberField, false);
    	
    	$('no').onblur = function(){
    		var dom = document.querySelector('.btn.large.getno');
    		if(!/^\d{4}$/.test(this.value)) {
    			dom.dataset.no = "";
    			return;
    		}
    			
    		dom.dataset.no = this.value;
    	};
    },
    
    numberField: function(){
    	this.value = this.value.replace(/[^\d]/ig,'');
    },
    
    getError: function(){
    	this.error = this.error || document.querySelector('.error');
    	return this.error;
    },
    
    setError: function(err){
    	this.getError().className = "error clear";
    	this.getError().innerHTML = err;
    },
    
    setInfo: function(info){
    	this.setError(info);
    	this.getError().className = "error clear info";
    },
    
    onLine: function(){
    	document.querySelector('.online').className = "online def";
    },
    
    offLine: function(){
    	document.querySelector('.online').className = "online";
    },
    
    isOnLine: function(){
    	return document.querySelector('.online').className.indexOf('def') > -1;
    }
};

app.initialize();
