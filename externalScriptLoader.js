var ESL = window.ESL || {};

ESL.loaded = {};

ESL.load = function(id, scriptSrc) {
	if(ESL.loaded[scriptSrc] === undefined) {
		var scriptTag = document.createElement('script');
		scriptTag.async = true;
		scriptTag.type = 'text/javascript';
		scriptTag.id = id;
		// The "file" protocol is included for testing purposes only
		if(scriptSrc.indexOf('http') >= 0 || scriptSrc.indexOf('file') >=0) {
			scriptTag.src = scriptSrc;
		} else {
			var useSSL = 'https:' == document.location.protocol;
			scriptTag.src = (useSSL ? 'https:' : 'http:') + scriptSrc;
		}
		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(scriptTag, node);
		ESL.loaded[scriptSrc] = true;
	} else {
		console.log(scriptSrc + " already loaded");
	}
}

ESL.createCallback = function(id, callback) {
	var node = document.getElementById(id);
	node.onload = callback;
}

