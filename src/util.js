/** 
* @author Wang, Hui (huiwang@qlike.com) 
* @repo https://github.com/hui-w/js-calendar
* @licence MIT 
*/ 
function $() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}

Element.prototype.createChild = function (tag, param, innerHTML) {
	var element = document.createElement(tag);
	this.appendChild(element);
	if (param) {
		for (key in param) {
			element.setAttribute(key, param[key]);
		}
	}
	if (innerHTML) {
		element.innerHTML = innerHTML;
	}

	return element;
};

Element.prototype.insertChild = function (tag, param, innerHTML) {
	var element = document.createElement(tag);
	this.insertBefore(element, this.childNodes[0]);
	if (param) {
		for (key in param) {
			element.setAttribute(key, param[key]);
		}
	}
	if (innerHTML) {
		element.innerHTML = innerHTML;
	}

	return element;
};

Element.prototype.hasClassName = function (a) {
	return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function (a) {
	if (!this.hasClassName(a)) {
		this.className = [this.className, a].join(" ");
	}
};

Element.prototype.removeClassName = function (b) {
	if (this.hasClassName(b)) {
		var a = this.className;
		this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
	}
};

Element.prototype.toggleClassName = function (a) {
	this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};

function checkhHtml5() {
	try {
		document.createElement("canvas").getContext("2d");
		return true;
	} catch (e) {
		return false;
	}
}

function Ajax() {
	this.getHttpRequest = function () {
		////Create instance of XMLHttpRequest
		var httpRequest = false;

		if (window.XMLHttpRequest) { //Mozilla
			httpRequest = new XMLHttpRequest();
			if (httpRequest.overrideMimeType) { //Set MiME Type
				httpRequest.overrideMimeType("text/xml");
			}
		} else if (window.ActiveXObject) { //Internet Explorer
			try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!httpRequest) {
			window.alert("Can not create ths instance of XMLHttpRequest");
			return false;
		}

		return httpRequest;
	}
} //end class

Ajax.prototype.getResponse = function () {
	var urlRequest = arguments[0];
	var eventHandler = arguments[1];
	var domSend = arguments[2];

	//Get the instance of httpRequest
	var httpRequest = this.getHttpRequest();

	httpRequest.open("GET", urlRequest, true);
	//httpRequest.setRequestHeader("User-Agent", "XMLHTTP/1.0");

	//Set the http header
	//httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

	//Send the request
	httpRequest.send(domSend);

	httpRequest.onreadystatechange = function () {
		//Process the response message
		if (httpRequest.readyState == 4) { //The status of object
			if (httpRequest.status == 200 || httpRequest.status == 0) { //The message is responsed
				eventHandler(httpRequest.responseText);
			} else { //Error
				alert("ERROR " + httpRequest.status + "!\nLoad File Failed.");
			}
		}
	};
}

/*
Sample:
var objAjax = new Ajax();
objAjax.getResponse("http://69.195.123.161/app/headers.php", onTextGot, null)

function onTextGot(txt) {
document.write(txt);
}
*/
