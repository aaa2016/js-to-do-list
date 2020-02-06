// array to contain list of items
var items = [];

/**
*	Sets up listener for Enter key when in text field (runs via onLoad)
*/
function keyListener() {

	// Get the input field
	var input = document.getElementById("inputItem");

	// This is borrowed from:
	//		https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
	
	// Execute a function when the user releases a key on the keyboard
	input.addEventListener("keyup", function(event) {
  		// Number 13 is the "Enter" key on the keyboard
  		if (event.keyCode === 13) {
    		// Cancel the default action, if needed
    		event.preventDefault();
    		// Trigger the button element with a click
    		document.getElementById("addButton").click();
  		}
	}); 
	
}

/**
*	Checks for existing cookie and draws list of items (runs via onLoad)
*/
function checkCookie() {
	if (getCookie("items") != "") {
		//window.alert("Cookie is: "+document.cookie);
		itemsString = getCookie("items");
		//window.alert("Items in cookie are: "+itemsString);
		items = itemsString.split(",");
		drawList(items);
	}

}

/**
*	Adds new item to the cookie
*/
function addItem() {

	// take input string, if input not blank
	if (document.getElementById("inputItem").value != "") {
	
		var item = document.getElementById("inputItem").value;
		
		// add to array of items
		items.push(item);
	
		// set cookie
		setCookie(items);
	
		//draw list of items
		drawList(items);
	
		//clear input field, and put cursor back in
		document.getElementById("inputItem").value = "";
	
	}
	
	document.getElementById("inputItem").focus();

}

/**
*	Draws the list of items (either when new item added or from cookie)
*/
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
		delLink.setAttribute("onclick", "removeItem("+i+"); return false");
		delLink.appendChild(linkText);
		p.appendChild(delLink);
		
		// TODO: fix - when using cookie, only draws last item
		
	}
	
	// add elements to list area
	var listArea = document.getElementById("list-area");
	listArea.appendChild(p); 
	
}

/**
*	Deletes specific item via the deletion link (from list and cookie)
*/
function removeItem(n) {

	// list items have ids in format "item0"
	var itemToDelete = document.getElementById("item"+n);
	
	// delete all child nodes - TODO: doesn't seem to delete actual p element
	while (itemToDelete.firstChild) {
    	itemToDelete.removeChild(itemToDelete.firstChild);
  	}
  	
  	// extract cookie contents again
  	if (getCookie("items") != "") {
		//window.alert("Cookie is: "+document.cookie);
		itemsString = getCookie("items");
		//window.alert("Items in cookie are: "+itemsString);
		var itemsPreDel = itemsString.split(",");
		
		var itemsPostDel = [];
		
		// copy each array element to new array, except the one being deleted
		for (i=0; i<itemsPreDel.length; i++){
			if (i != n) {
				itemsPostDel.push(itemsPreDel[i]);
			}
		}
		
		// re-set cookie with the new array
		setCookie(itemsPostDel);
	}

}

/**
*	Deletes all items and clear cookie
*/
function deleteAll() {

	// clear the list area and chil nodes
	var listArea = document.getElementById("list-area");
  	while (listArea.firstChild) {
    	listArea.removeChild(listArea.firstChild);
  	}
	
	// clear input field
	document.getElementById("inputItem").value = "";
	
	// clear array
	items = [];
	
	// delete cookie
	deleteCookie();

}

/**
*	Creates new cookie
*/
function setCookie(input) {
	
	// set cookie expiry date to maximum future date (32 bit)
	document.cookie = "items="+input+";expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/";

}

/**
*	Obtain cookie contents
*/
function getCookie(cname) {
	// This is borrowed from: https://www.w3schools.com/js/js_cookies.asp
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

/**
*	Deletes cookie completely
*/
function deleteCookie() {

	// set cookie expiry to past date
	document.cookie = "items=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	
}