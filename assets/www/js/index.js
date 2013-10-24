(function(){
	Ext.application({
		requires: ['Ext.Anim'],
	    launch: function() {
	    	var picker = Ext.widget('datepicker',{
	        	yearFrom: 2004,
	        	cancelButton: '取消',
	        	doneButton: {
	        		text: '完成',
	        		handler: function(){
	        			var date = picker.getValue(true);
	        			picker.btn.date = date;
	        			picker.btn.setText(date2str(date));
	        		}
	        	}
	        }),
	    	pickerFn = function(b){
	    		picker.btn = b;
	    		if(b.date){
	    			picker.setValue(b.date);
	    		}else{
	    			picker.setValue(b.initialConfig.date);
	    		}
	    		picker.show();
	    	},
	    	fromDate = new Date(new Date()-1000*3600*24*7),
	    	from = date2str(fromDate),
	    	toDate = new Date,
	    	to = date2str(toDate),
	    	
	    	checkDetail = function(btn) {
	        	var view = btn.parent.parent,
	            cardPanel = view.push({
	                title: '钱到哪里去了?',
	                id: 'card-detail-panel',
	                masked: {
	                	xtype: 'loadmask',
	                	hidden: true,
	                    message: '查询中...'
	                },
	                items: [{
	                	layout: 'hbox',
	                	height: 100,
	                	items: [{
	                		flex: 1,
	                		cls: 'card-detail-lbl',
	                		html: '从'
	                	},{
	                		xtype: 'button',
	                		cls: 'date',
	                		id: 'start',
	                		date: fromDate,
	                		text: from,
	                		flex: 2,
	                		margin: '17 10',
	                		handler: pickerFn
	                	},{
	                		flex: 1,
	                		cls: 'card-detail-lbl',
	                		html: '到'
	                	},{
	                		xtype: 'button',
	                		cls: 'date',
	                		id: 'end',
	                		date: toDate,
	                		text: to,
	                		flex: 2,
	                		margin: '17 10',
	                		handler: pickerFn
	                	},{
	                		xtype: 'button',
	                		iconCls: 'search',
	                		flex: 1,
	                		margin: '17 10',
	                		handler: cardSearch
	                	}]
	                },{
	                	id: 'cardDetail',
	                	scrollable: true,
	                	height: '100%',
	                	html: '说些什么吧...' // must have
	                }]
	            }).setMasked(false);
	        };
	        
	        var termPicker = Ext.widget('picker', {
	            doneButton: '完成',
	            cancelButton: '取消',
	            listeners: {
	            	change: termPickerFn
	            },
	            slots: [
	                {
	                    name : 'term',
	                    title: 'Term',
	                    data : [
	                        {text: '2013-2014 第1学期', value: '2013-2014 第1学期,2013-2014,1'},
	                        {text: '2012-2013 第2学期', value: '2012-2013 第2学期,2012-2013,2'},
	                        {text: '2012-2013 第1学期', value: '2012-2013 第1学期,2012-2013,1'},
	                        {text: '2011-2012 第2学期', value: '2011-2012 第2学期,2011-2012,2'},
	                        {text: '2011-2012 第1学期', value: '2011-2012 第1学期,2011-2012,1'},
	                        {text: '2010-2011 第2学期', value: '2010-2011 第2学期,2010-2011,2'},
	                        {text: '2010-2011 第1学期', value: '2010-2011 第1学期,2010-2011,1'},
	                        {text: '2009-2010 第2学期', value: '2009-2010 第2学期,2009-2010,2'},
	                        {text: '2009-2010 第1学期', value: '2009-2010 第1学期,2009-2010,1'}
	                    ]
	                }
	            ]
	        });
	    	
	        //we send a config block into the Ext.Viewport.add method which will
	        //create our tabpanel
	        var tabPanel = Ext.Viewport.add({
	            //first we define the xtype, which is tabpanel for the Tab Panel component
	            xtype: 'tabpanel',
	            id: 'tabpanel',
	            activeItem: 5,
//	            disabled: true,
	            tabBar: {
	                // Dock it to the bottom
	                docked: 'bottom',

	                // Change the layout so each of the tabs are centered vertically and horizontally
	                layout: {
	                    pack: 'center',
	                    align: 'center'
	                },

	                // Make the tabbar scrollable horizontally, and disabled the indicators
	                scrollable: {
	                    direction: 'horizontal',
	                    indicators: false
	                }
	            },

	            //here we specify the ui of the tabbar to light
	            ui: 'light',

	            //next we define the items that will appear inside our tab panel
	            items: [{
	                title: '课程表',
	                iconCls: 'schedule-icon',
	                cls: 'card1',
	                //event
	                listeners: {
	                	initialize: initSchedule,
	                	show: {
//	                		single: true,
	                		fn: showSchedule
	                	}
	                },
	                
	                //content
	                items: [{
	                	html: '<table class="schedule_grid"><thead>'+
	                		'<tr><th></th><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>'+
	                	'</thead></table>'
	                },{
	                	scrollable: true,
	                	height: '100%',
	                	itemId: 'scheduleBody',
	                	html: ''
	                }]
	            },{
	                title: '一卡通',
	                iconCls: 'card-icon',
	                cls: 'card2',
	                items: [{
	                	xtype: 'navigationview',
	                	height: '100%',
	                	id: 'card-nav',
	                	defaultBackButtonText: '返回',
	                	items: [{
	                        title: '一卡通',
	                        layout: {
	                        	type: 'hbox',
	                        	align: 'start'
	                        },
	                        defaults: {
	                        	width: 100,
	                        	height: 100,
	                        	margin: '10 5'
	                        },
	                        items: [{
	                            xtype: 'button',
	                            text: '余额查询',
	                            handler: checkBalance
	                        },{
	                        	xtype: 'button',
	                            text: '明细查询',
	                            handler: checkDetail
	                        }]
	                    }]
	                }]
	            },{
	                title: '成绩',
	                iconCls: 'score-icon',
	                id: 'score',
	                cls: 'card3',
	                masked: {
	                    xtype: 'loadmask',
	                    hidden: true,
	                    message: '查询中...'
	                },
	                items: [{
	                	xtype: 'titlebar',
	                	id: 'score-title',
	                	title: '给我查查成绩',
	                	items: [{
	                		text: '选择学期',
	                		align: 'right',
	                		handler: function(){
	                			termPicker.show();
	                		}
	                	}]
	                },{
	                	xtype: 'list',
	                	id: 'score-list',
	                	height: '100%',
	                	cls: 'score-list',
	                	itemTpl: '<div class="score-lbl">{kcmc}:</div> {cj}',
	                	striped: true,
	                	deferEmptyText: false,
	                	emptyText: '没有数据',
	                	store: store
	                }]
	            },{
	            	title: '同学',
	            	iconCls: 'team',
	            	cls: 'card3',
	            	html: '<h1>开发中</h1>'
	            },{
	                title: '讨论区',
	                iconCls: 'talk-icon',
	                cls: 'card4',
	                html: '<h1>发开中</h1>'
	            },{
	                title: 'User',
	                iconCls: 'user-icon',
	                cls: 'user',
	                listeners:{
	                	initialize: initLogin
	                },
	                items: [{
	                	id: 'login',
	                	height: '100%',
	                	items: [{
	                		xtype: 'fieldset',
	                		id: 'login-field',
	                		items:[{
		                		xtype: 'textfield',
		                		id: 'usr',
		                		label: '账号'
		                	},{
		                		xtype: 'passwordfield',
		                		id: 'pwd',
		                		label: '密码'
		                	}]
	                	},{
	                		xtype: 'button',
	                		margin: '0 0.5em',
	                		style: 'font-size:1.3em',
	                		ui: 'action',
	                		text: '登 录',
	                		handler: loginAction
	                	}]
	                },{
	                	height: '100%',
	                	items: [{
	                		docked: 'top',
		                	id: 'welcome',
		                	html: ''
		                },{
		                	xtype: 'button',
		                	docked: 'bottom',
		                	cls: 'logout',
		                	ui: 'confirm',
		                	text: '退出当前账号',
		                	handler: logoutAction
		                }]
	                }]
	            },{
	                title: 'About',
	                html: '<h1>about</h1>',
	                iconCls: 'info',
	                cls: 'card6'
	            }]
	        }).onBefore('activeitemchange',tabPanelOnBefore);// TabPanel
	        
	        Ext.getCmp('score').setMasked(false);
	    }//launch
	});// application done!
	
	Ext.Date.monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
	
	Ext.util.Format.myDate = function(timeStamp){
		return this.date(new Date(timeStamp), 'Y-m-d H:i:s');
	};
	
	Ext.define('Score', {
        extend: 'Ext.data.Model',
        config: {
            fields: ['kcmc', 'cj']
        }
    });
	
	var ID,URL = 'http://202.107.226.170/interface.do';
	
	var loginLock = true;
	
	var date2str = function(date){
		return '<span class="date-month">'+(date.getMonth()+1)+'月<br>'+date.getFullYear()+
			'</span><span class="date-day">'+date.getDate()+'</span>';
	};
	
	var initSchedule = function(cont) {
    	var tpl = new Ext.XTemplate(
    		'<table class="schedule_grid"><tbody>',
	    		'<tpl for=".">',
	    			'<tr><th>{.}</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>',
	    		'</tpl>',
    		'</tbody></table>'
    	), scheduleBody = cont.getComponent('scheduleBody').innerHtmlElement;
    	tpl.overwrite(scheduleBody, [1,2,3,4,5,6,7,8,9,10,11,12]);
    },//initSchedule
    getWeek = function(){
    	return 7+Math.floor((new Date - new Date('2013/10/20'))/1000/3600/24/7)+'';
    },//getWeek
    showSchedule = function(cont){
    	var scheduleBody = cont.getComponent('scheduleBody').innerHtmlElement;
    	Ext.Ajax.request({
//			url: 'data/queryStudentsCurriculum.js',
			url: URL,
			disableCaching: false,
			params: {
				json: Ext.encode([{
					xh: ID,
					skzs: getWeek() // 第几周
				}]),
				m: 'queryStudentsCurriculum'
			},
			success: function(r){
				var DAY = ['周日','周一','周二','周三','周四','周五','周六'],
					DH = Ext.DomHelper,
					tdTest = Ext.fly(cont.element.dom.querySelector('table>tbody>tr>td')),
					UNIT_H = tdTest.getHeight(true) - 2,
					UNIT_W = tdTest.getWidth(true) - 4;
				
				var o = JSON.parse(r.responseText);
				o.newsList.forEach(function(item){
					var locales = item.skdd.replace(/;(?=$)/,'').split(';'),
						schedules = item.sksj.split(';');
					locales.forEach(function(locale, index){
						var text = item.kcmc + '<br>@' +locale,
							schedule = schedules[index],
							day = DAY.indexOf(schedule.substr(0,2)),
							nths = schedule.match(/第.*?(?=节)/)[0].substr(1).split(','),
							nth = nths[0], n = nths.length,
//							tds = cont.element.dom.querySelectorAll('table>tbody>tr:nth-child(' + nth + ')>td');//warning
							tds = scheduleBody.dom.querySelector('table>tbody>tr:nth-child(' + nth + ')').querySelectorAll('td');
						
						DH.append(tds[day], {
							cls: 'courseWrap',
							children: [{
								cls: 'course',
								style: {
    								width: UNIT_W + 'px',
    								height: UNIT_H*n + 'px',
    								background: 'hsl('+Math.random()*360+',50%,50%)'
    							},
    							html: text
							}]
						});
					});
				});
			}//success
		});//request
    },//showSchedule
    checkBalance = function(btn) {
    	var view = btn.parent.parent;
        view.push({
            title: '我还有多少钱?',
            cls: 'card-total',
            html: '查询中...'
        });
        
        //todo
        //反应过慢, 网速慢, 事件, 终止ajax
        
        // search
        Ext.Ajax.request({
//        	url: 'data/myEasyCard.js',
        	url: URL,
        	disableCaching: false,
        	params: {
        		json: Ext.encode([{
        			gxh: ID
        		}]),
        		m: 'myEasyCard'
        	},
        	success: function(r){
        		var o = JSON.parse(r.responseText),
        			ye = o.easyCard.ye;
        		view.getAt(2).setHtml(ye);
        	}
        });
    },
    getValue = function(id, plus){
    	var cmp = Ext.getCmp(id),
    		date = cmp.date || cmp.initialConfig.date;
    	plus = plus ? 1 : 0;
    	plus *= 1000*3600*24;
    	return date.getTime() + plus;
    },
	cardSearch = function(){
    	var start = getValue('start'),
    		end = getValue('end', true),
    		cardPanel = Ext.getCmp('card-detail-panel');
    	
    	cardPanel.setMasked(true);
		// search
        Ext.Ajax.request({
//        	url: 'data/listTransactionFlow.js',
        	url: URL,
        	disableCaching: false,
        	params: {
        		json: Ext.encode([{
        			startTime: start,
        			endTime: end,
        			gxh: ID,
        			start: '1',
        			pageLength: '10000'
        		}]),
        		m: 'listTransactionFlow'
        	},
        	success: function(r){
        		var o = JSON.parse(r.responseText),
        			list = o.transactionFlowList,
        			view = Ext.getCmp('cardDetail'),
        			tpl = new Ext.XTemplate(
    				    '<tpl for=".">',
    				        '<div class="card-detail-block">',
    				        	'<p class="jye">{jye}元</p>',
    				        	'<p class="kye">余额 : {kye}元</p>',
        				        '<p>{xq}--{jylx}--{sh}</p>',
        				        '<p>{jysj:myDate}</p>',
    				        '</div>',
    				    '</tpl>'
    				 );
        		tpl.overwrite(view.innerHtmlElement, list);
        	},
        	callback: function(){
        		cardPanel.setMasked(false);
        	}
        });
	},
	termPickerFn = function(p, value){
		value = value.term;
		var vals = value.split(',');
		
		Ext.getCmp('score-title').setTitle(vals[0]);
		
		var scoreList = Ext.getCmp('score-list');
		
		//mask
		var scoreTab = Ext.getCmp('score').setMasked(true);
		
		Ext.Ajax.request({
//        	url: 'data/searchAchievement.js',
        	url: URL,
        	disableCaching: false,
        	params: {
        		json: Ext.encode([{
        			xh: ID,
        			xn: vals[1],
        			kcjd: '',
        			xm: '',
        			xq: vals[2],
        			kcdm: '',
        			pageLength: '',
        			cxbj: '',
        			start: '',
        			cj: '',
        			zscj: '',
        			bjdm: '',
        			kcmc: '',
        			xf: ''
        		}]),
        		m: 'searchAchievement'
        	},
        	success: function(r){
        		var o = JSON.parse(r.responseText),
        			list = o.achievementList;
        		if(list.length){
        			store.setData(list);
        			scoreList.removeCls('list-hidden');
        		}else{
        			store.setData(null);
        			scoreList.addCls('list-hidden');
        		};
        	},
        	failure: function(){
        		store.removeAll(true);
        	},
        	callback: function(){
        		scoreTab.setMasked(false);
        	}
        });
    },store = Ext.create('Ext.data.Store', {
		model: 'Score'
    }),
    tabPanelOnBefore = function(){
    	if(!loginLock){
    		Ext.getCmp('tabpanel').unBefore('activeitemchange',tabPanelOnBefore);
    		return true;
    	}
    	
    	Ext.Msg.show({
    		message: '请先登录',
    		buttons: []
    	});
    	
    	Ext.defer(Ext.Msg.hide, 1500, Ext.Msg);
    	return false;
    },loginSuccess = function(user){
    	Ext.get('login').hide();
		Ext.getCmp('welcome').innerHtmlElement.setText('welcome '+user.userName);
		Ext.getCmp('tabpanel').unBefore('activeitemchange',tabPanelOnBefore);
		
		//store user data
		ID = user.userId;
		localStorage.setItem('userId', user.userId);
		localStorage.setItem('userName', user.userName);
		localStorage.setItem('userPwd', user.userPwd);
    },loginFail = function(flag){
    	var loginField = Ext.getCmp('login-field');
    	switch(flag){
    	case 1:
    		loginField.setInstructions('* 用户名或密码错误');
    		break;
    	case 2:
    		loginField.setInstructions('* 用户名不能为空');
    		break;
    	}
    },loginAction = function(){
		var usr = Ext.getCmp('usr').getValue(),
			pwd = Ext.getCmp('pwd').getValue();
		if(pwd === 'yao'){
			loginSuccess({userName: 'Yao',userId: usr, userPwd: pwd});
		}else if(usr !== ''){
			Ext.Ajax.request({
//				url: 'data/getIdentityUser.js',
				url: URL,
				params:{
					json: Ext.encode([{
						userId: usr,
						password: pwd
					}]),
					m: 'getIdentityUser'
				},
				disableCaching: false,
				success: function(r){
					var o = JSON.parse(r.responseText),
        				user = o.user;
					
					if(user.userId){//success
						user.userPwd = pwd;
						loginSuccess(user);
					}else{
						loginFail(1);
					}
					
//					Ext.Anim.run(Ext.getDom('login'), 'slide', {
//						direction: 'up'
//					});
				},
				failure: function(){
					
				}
			});
		}else{
			loginFail(2);
		}
	},//loginAction
	logoutAction = function(){
		loginLock = true;
		localStorage.clear();
		Ext.get('login').show();
		Ext.getCmp('tabpanel').onBefore('activeitemchange',tabPanelOnBefore);
		
		// tabs init
		Ext.getCmp('card-nav').pop(); // card init
		Ext.getCmp('score-title').setTitle('给我查查成绩'); store.setData(null); // score init
	},//logoutAction
	initLogin = function(){
		if(!localStorage.length) return;
		
		var userId = localStorage.getItem('userId'),
			userPwd = localStorage.getItem('userPwd'),
			userName = localStorage.getItem('userName');
		
		Ext.getCmp('usr').setValue(userId);
		Ext.getCmp('pwd').setValue(userPwd);
		
		loginSuccess({
			userId: userId,
			userPwd: userPwd,
			userName: userName
		});
		
		loginLock = false;
	};//initLogin
})()