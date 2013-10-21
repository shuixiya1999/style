(function(){
	Ext.application({
	    launch: function() {
	    	var picker = Ext.widget('datepicker',{
	        	yearFrom: 1995,
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
	        	var view = btn.parent.parent;
	            view.push({
	                title: '钱到哪里去了?',
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
	            });
	        };
	        
	        var termPicker = Ext.widget('picker', {
	            doneButton: '完成',
	            cancelButton: '取消',
	            listeners: {
	            	change: termPickerFn
	            },
	            slots: [
	                {
	                    name : 'limit_speed',
	                    title: 'Speed',
	                    data : [
	                        {text: '2013-2014 第1学期', value: 50},
	                        {text: '2012-2013 第2学期', value: 100},
	                        {text: '2012-2013 第1学期', value: 200},
	                        {text: '2011-2012 第2学期', value: 200},
	                        {text: '2011-2012 第1学期', value: 200},
	                        {text: '2010-2011 第2学期', value: 200},
	                        {text: '2010-2011 第1学期', value: 200},
	                        {text: '2009-2010 第2学期', value: 200},
	                        {text: '2009-2010 第1学期', value: 300}
	                    ]
	                }
	            ]
	        });
	    	
	        //we send a config block into the Ext.Viewport.add method which will
	        //create our tabpanel
	        Ext.Viewport.add({
	            //first we define the xtype, which is tabpanel for the Tab Panel component
	            xtype: 'tabpanel',
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
	                iconCls: 'schedule',
	                cls: 'card1',
	                //event
	                listeners: {
	                	initialize: initSchedule
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
	                iconCls: 'card',
	                cls: 'card2',
	                items: [{
	                	xtype: 'navigationview',
	                	height: '100%',
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
	                iconCls: 'score',
	                cls: 'card3',
	                items: [{
	                	xtype: 'titlebar',
	                	docked: 'top',
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
	                	height: '100%',
	                	itemTpl: '{aa}',
	                	store: store
	                }]
	            },{
	            	title: '同学',
	            	html: '<h1>Settings Card</h1>',
	            	iconCls: 'team',
	            	cls: 'card4'
	            },{
	                title: '讨论区',
	                html: '<h1>Settings Card</h1>',
	                iconCls: 'talk',
	                cls: 'card4'
	            },{
	                title: 'User',
	                html: '<h1>User Card</h1>',
	                iconCls: 'user',
	                cls: 'card5'
	            },{
	                title: 'About',
	                html: 'about',
	                iconCls: 'info',
	                cls: 'card1'
	            }]
	        });
	    }//launch
	});
	
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
    	tpl.overwrite(scheduleBody, [1,2,3,4,5,6,7,8,9,10,11,12])
    	
		Ext.Ajax.request({
			url: 'data/queryStudentsCurriculum.js',
//			url: 'http://202.107.226.170/interface.do?json=[{%22skzs%22%3A%221%22%2C%22xh%22%3A%221101301307%22}]&m=queryStudentsCurriculum',
			params: {},
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
    },
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
        	url: 'data/myEasyCard.js',
        	params: {},
        	success: function(r){
        		var o = JSON.parse(r.responseText),
        			ye = o.easyCard.ye;
        		view.getAt(2).setHtml(ye);
        	}
        });
    },
	cardSearch = function(){
		// search
        Ext.Ajax.request({
        	url: 'data/listTransactionFlow.js',
        	params: {},
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
        	}
        });
	},
	termPickerFn = function(p, value){
		Ext.Ajax.request({
        	url: 'data/searchAchievement.js',
        	params: {},
        	success: function(r){
        		var o = JSON.parse(r.responseText),
        			list = o.achievementList;
        	}
        });
    },store = Ext.create('Ext.data.Store', {
		model: 'Score',
		
		data: [
		       { kcmc: 'Jason',   cj: 'Johnston'}
		]
    });
	
})()