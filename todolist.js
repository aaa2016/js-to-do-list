var items = [];

function checkCookie() {
	if (getCookie("items") != "") {
		//window.alert("Cookie is: "+document.cookie);
		itemsString = getCookie("items");
		//window.alert("Items in cookie are: "+itemsString);
		items = itemsString.split(",");
		drawList(items);
	}
}

function addItem() {

	// take input string, if input not blank
	if (document.getElementById("inputItem").value != "") {
	
		var item = document.getElementById("inputItem").value;
		
		// add to array of items
		items.push(item);
	
		// set cookie - TODO properly
		//setCookie(items);
	
		//draw list of items
		drawList(items);
	
		//clear input field, and put cursor back in
		document.getElementById("inputItem").value = "";
	
	}
	
	document.getElementById("inputItem").focus();

}

function drawList(input) {
	
	//window.alert("Drawing list from: "+input);
	
	// for each element in the array, create a new p element
	for (i=0; i<input.length; i++) {
		//window.alert("Input i: "+i+" is "+input[i]);
		var p = document.createElement("p");
		p.setAttribute("id","item"+i);
		p.setAttribute("class","list-item");
		var node = document.createTextNode(input[i]);
		p.appendChild(node);
		
		var delLink = document.createElement("a");
		var linkText = document.createTextNode("X");
		delLink.setAttribute("href","#");
		delLink.setAttribute("onclick", "removeItem('item"+i+"'); return false");
		delLink.appendChild(linkText);
		p.appendChild(delLink);
		
		// TODO: fix - when using cookie, only draws last item
		
	}
	
	// add elements to list area
	var listArea = document.getElementById("list-area");
	listArea.appendChild(p); 
	
}

function removeItem(n) {

	var itemToDelete = document.getElementById(n);
	
	while (itemToDelete.firstChild) {
    	itemToDelete.removeChild(itemToDelete.firstChild);
  	}
  	
  	// TODO: delete entry in cookie

}

function deleteAll() {

	// clear the list area
	var listArea = document.getElementById("list-area");
  	while (listArea.firstChild) {
    	listArea.removeChild(listArea.firstChild);
  	}
	
	// clear array
	items = [];
	
	// delete cookie
	deleteCookie();

}

function setCookie(input) {
	
	// set cookie expiry date to maximum future date (32 bit)
	document.cookie = "items="+input+";expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/";

}

function getCookie(cname) {
	// This is borrowed from W3C Schools: https://www.w3schools.com/js/js_cookies.asp
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
    	var c = ca[i];
    	while (c.charAt(0) == ' ') {
    	c = c.substring(1);
    	}
    	if (c.indexOf(name) == 0) {
      		return c.substring(name.length, c.length);
    	}
  	}
  return "";
}

function deleteCookie() {

	// set cookie expiry to past date
	document.cookie = "items=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	
}