var items = [];

function checkCookie() {
	if (document.cookie != "") {
		window.alert("Cookie is: "+document.cookie);
		items = document.cookie;  // TODO: select correct cookie
		drawList(items);
	}
}

function addItem() {

	// take input string, if input not blank
	if (document.getElementById("inputItem").value != "") {
	
		var item = document.getElementById("inputItem").value;
		
		// add to array of items
		items.push(item);
	
		// set cookie
		//setCookie(items);
	
		//draw list of items
		drawList(items);
	
		//clear input field, and put cursor back in
		document.getElementById("inputItem").value = "";
		document.getElementById("inputItem").focus();
	
	}

}

function drawList(input) {
	
	// for each element in the array, create a new p element
	for (i=0; i<input.length; i++) {
		var para = document.createElement("p");
		para.setAttribute("id","item")
		var node = document.createTextNode(input[i]);
		para.appendChild(node);
		var element = document.getElementById("list-area");
	}
	
	// TODO: create delete item link for each item
	
	// add elements to list area
	element.appendChild(para);
	
}

function removeItem() {

	//TODO: create this

}

function deleteAll() {

	// clear the list area
	var list = document.getElementById("list-area");
	for (i=0; i<list.childElementCount; i++) {
		list.removeChild(list.childNodes[i]);
	}
	
	// clear array
	items = [];
	
	// delete cookie
	//deleteCookie();

}

function setCookie(input) {
	
	// set cookie expiry date to maximum future date (32 bit)
	document.cookie = "items="+input+";expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/";

}

function deleteCookie() {

	// set cookie expiry to past date
	document.cookie = "items=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	
}