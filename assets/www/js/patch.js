Ext.viewport.Default.prototype.doBlurInput = function(e) {
    var target = e.target,
    	focusedElement = this.focusedElement;
	if (focusedElement && focusedElement.nodeName.toUpperCase() != 'BODY' && !this.isInputRegex.test(target.tagName)) {
		if(typeof focusedElement.blur != 'function') return;
	    delete this.focusedElement;
	    focusedElement.blur();
	}
}