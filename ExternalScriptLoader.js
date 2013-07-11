
ESL = window.ESL || {};

ESL.load = function(id, scriptSrc, protocolIncluded) {
	var scriptTag = document.createElement('script');
	scriptTag.async = true;
	scriptTag.type = 'text/javascript';
	scriptTag.id = id;
	if(!protocolIncluded) {
		var useSSL = 'https:' == document.location.protocol;
		scriptTag.src = (useSSL ? 'https:' : 'http:') + scriptSrc;
	} else {
		scriptTag.src = scriptSrc;
	}
	var node = document.getElementsByTagName('script')[0];
	node.parentNode.insertBefore(scriptTag, node);
}

ESL.createCallback = function(id, callback) {
	var node = document.getElementById(id);
	node.onload = callback;
}


