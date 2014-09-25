var ESL = window.ESL || {};

ESL.definedURL = {};
ESL.definedId = {};
ESL.setupCallbackAtLoad = {};


ESL.load = function(id, scriptSrc) {
	/* check if src URL is already defined, if so don't reload */
	if(ESL.definedURL[scriptSrc] === undefined) {
		var scriptTag = document.createElement('script');
		scriptTag.async = true;
		scriptTag.type = 'text/javascript';
		scriptTag.id = id;

		if(scriptSrc.indexOf('http') >= 0) {
			scriptTag.src = scriptSrc;
		} else {
			var useSSL = 'https:' == document.location.protocol;
			scriptTag.src = (useSSL ? 'https:' : 'http:') + scriptSrc;
		}

		/* Account for associated element id not yet created */
		if(ESL.setupCallbackAtLoad[id] !== undefined) {
			scriptTag.onload = ESL.setupCallbackAtLoad[id];
		} else {
			/* place holder to set state to loaded, for use in callback methods */
			scriptTag.onload = function() { ESL.definedId[id] = 'LOADED'; };
		}

		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(scriptTag, node);

		/* track that element's are created both the URL and the id */
		ESL.definedURL[scriptSrc] = true;
		ESL.definedId[id] = 'DEFINED';
		console.log(scriptSrc + " Looaded");

	} else {
		console.log(scriptSrc + " already defined");
	}
}

ESL.createCallback = function(id, callback) {
	/* Account for associated element id not yet created */
	if(ESL.definedId[id] !== undefined) {
		ESL.setupCallback(id, callback);
	} else {
		ESL.setupCallbackAtLoad[id] = callback;
	}
}

ESL.setupCallback = function(id, callback) {
	/* 
		If element onload already triggered, then execute callack, 
		else overwrite onload with new function 
	*/
	if(ESL.definedId[id] === 'LOADED') {
		callback;
	} else {
		var node = document.getElementById(id);
		node.onload = function() {
			ESL.definedId[id] = 'LOADED';
			callback;
		}
	}
}

