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
			aaa = this;// for test
			//for test
			db.setItem('users', Ext.encode({
				'1101301307':'1101301307',
				'1101301308':'1101301308'
			}));
			var more = this.bodyElement.createChild({
				cls: 'x-more-icon',
				html: 'ㄑ'
//				html: '〈﹤‹」〕ˇ︿﹀ㄑ'
			}).on('singletap', function(){
//				alert('ddd');
			});
			
			var list = this.bodyElement.createChild({
				cls: 'user-list',
			});
			
			var users = Ext.decode(db.getItem('users')),
				height = this.bodyElement.getHeight(),
				name,pwd;
			if(users){
				for(name in users){
					pwd = users[name];
					list.createChild({
						cls: 'user-item',
						html: name+'...'+pwd
					});
				}
			}
			
			this.bodyElement.addCls('more-able');// for test
		}
	});
})(localStorage);
