Ext.application({
    /**
     * The launch function is called when the browser and the framework is ready
     * for the application to launch.
     *
     * All we are going to do is create a simple tabpanel with some items, and add
     * it to the global Ext.Viewport instance.
     */
    launch: function() {
    	/////////// for test ///////////////////
    	document.addEventListener('click',function(){
//    		aa=getComputedStyle(document.querySelector('table td')).fontSize
//    		alert(aa);
//    		alert('ddd');
    	},false);
    	
    	Ext.Date.monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    	
    	var fmt = 'm/d/Y',
    	picker = Ext.widget('datepicker',{
        	hidden: true,
        	cancelButton: '取消',
        	doneButton: {
        		text: '完成',
        		handler: function(){
        			var date = picker.getValue(true);
        			picker.btn.setText(Ext.Date.format(date, fmt));
        		}
        	}
//        	slotOrder: ['year','month','day']
        }),
    	pickerFn = function(b){
			picker.btn = b;
			picker.setValue(Ext.Date.parse(b.getText(), fmt));
			picker.show();
		},from = Ext.Date.format(new Date(new Date()-1000*3600*24*7), fmt),
		to = Ext.Date.format(new Date, fmt);
    	
    	
        //we send a config block into the Ext.Viewport.add method which will
        //create our tabpanel
        Ext.Viewport.add({
            //first we define the xtype, which is tabpanel for the Tab Panel component
            xtype: 'tabpanel',

            //now we specify the tabBar configuration and give it a docked property of bottom
            //this will dock the tabbar of this tabpanel to the bottom

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

            //defaults allow us to add default configuratons for each of the items added into
            //this container. adding scrollable true means that all items in this tabpanel will
            //be scrollable unless otherwise specified in the item configuration
            defaults: {
//                scrollable: true
            },

            layout: {
//                animation: false
            },

            //next we define the items that will appear inside our tab panel
            items: [{
                title: '课程表',
                iconCls: 'schedule',
                cls: 'card1',
//                scrollable: true,
                //event
                listeners: {
                	show: function(cont) {
                		Ext.Ajax.request({
                			url: 'data/queryStudentsCurriculum.js',
//                			url: 'http://202.107.226.170/interface.do?json=[{%22skzs%22%3A%221%22%2C%22xh%22%3A%221101301307%22}]&m=queryStudentsCurriculum',
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
//                							tds = cont.element.dom.querySelectorAll('table>tbody>tr:nth-child(' + nth + ')>td');//warning
                							tds = document.querySelector('table>tbody>tr:nth-child(' + nth + ')').querySelectorAll('td');
                						
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
                				
                			}
                		});
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
                	html: '<table class="schedule_grid"><tbody>'+
	                	'<tr><th>1</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>2</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>3</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>4</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>5</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>6</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>7</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>8</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>9</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>10</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>11</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
	                	'<tr><th>12</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
                	'</tbody></table>'
                }]
            },{
                title: '一卡通',
//                html: '<h1>Favorites Card</h1>',
                items: [{
                	xtype: 'navigationview',
                	height: '100%',
                	defaultBackButtonText: '返回',
                	navigationBar: {
//                	    ui: 'sencha'
                	},
                	items: [{
                        title: '一卡通',
                        items: [{
                            xtype: 'button',
                            text: '余额查询',
                            handler: function(btn) {
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
                            }
                        },{
                        	xtype: 'button',
                            text: '明细查询',
                            handler: function(btn) {
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
                                    		text: to,
                                    		flex: 2,
                                    		margin: '17 10',
                                    		handler: pickerFn
                                    	},{
                                    		xtype: 'button',
                                    		text: 'search',
                                    		flex: 1,
                                    		margin: '17 10',
                                    		handler: function(b){
                                    		}
                                    	}]
                                    },{
                                    	scrollable: true,
                                    	height: '100%',
                                    	listeners: {
                                    		initialize: function(c){
                                    			ccc = c;
                                    			c.element.on('tap', function(){
                                    				alert('ddd');
                                    			});
                                    		}
                                    	},
                                    	html: 'content'
                                    },picker]
                                });
                            }
                        }]
                    }]
                }],
                iconCls: 'card',
                cls: 'card2',
                badgeText: '4'
            },{
                title: '成绩',
                html: '<h1>Downloads Card</h1>',
                iconCls: 'score',
                cls: 'card3',
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
    }
});
