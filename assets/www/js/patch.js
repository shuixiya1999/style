Ext.viewport.Default.prototype.doBlurInput = function(e) {
    var target = e.target,
    	focusedElement = this.focusedElement;
	if (focusedElement && focusedElement.nodeName.toUpperCase() != 'BODY' && !this.isInputRegex.test(target.tagName)) {
		if(typeof focusedElement.blur != 'function') return;
	    delete this.focusedElement;
	    focusedElement.blur();
	}
};

(function(db){
	Ext.define('Yao.field.User', {
		extend: 'Ext.field.Text',
		xtype: 'userfield',
		initialize: function(){
			this.callParent(arguments);
			
			var more = this.bodyElement.createChild({
				cls: 'x-more-icon',
				html: 'ㄑ'
//				html: '〈﹤‹」〕ˇ︿﹀ㄑ'
			}).on('tap', function(e){
				e.stopEvent();
				list.removeCls('hide');
				Ext.getDoc().on({
					single: true,
					tap: function(){
						list.addCls('hide');
					}
				})
			});
			
			// todo
			// set list max height
			var list = this.list = this.bodyElement.createChild({
				cls: 'user-list hide',
			}).on({
				delegate: '.user-item',
				scope: this,
				tap: function(evt, dom){
					var cls = dom.className,
						name, pwd;
					if(cls === 'user-item'){// choose user
						name = dom.textContent;
						pwd = dom.getAttribute('pwd');
						
						this.setValue(name);
						Ext.getCmp('pwd').setValue(pwd);
					}else if(cls === 'clear-icon'){// delete user
						// part1 clear dom
						dom = dom.parentNode;
						name = dom.textContent;
						dom.parentNode.removeChild(dom);
						
						// part2 clear db
						delete users[name];
						db.setItem('users', Ext.encode(users));
						
						// part3 more
						if(!this.list.getHtml()) this.hideMore();
					}
				}
			});
			
			var users = this.refreshUsers();
			
			if(users && Ext.encode(users) !== '{}'){
				this.showMore();
			}
		},//initialize
		hideMore: function(){
			this.bodyElement.removeCls('more-able');
		},//hideMore
		showMore: function(){
			this.bodyElement.addCls('more-able');
		},//showMore
		refreshUsers: function(){
			// todo
			// 共同维护一个users
			var users = Ext.decode(db.getItem('users')),
				name,pwd;
			
			this.list.setHtml('');
			if(users){
				for(name in users){
					pwd = users[name];
					this.list.createChild({
						cls: 'user-item',
						html: name,
						pwd: pwd,
						children: [{
							cls: 'clear-icon'
						}]
					});
				}
			}
			return users;
		}//refreshUsers
	});
})(localStorage);
