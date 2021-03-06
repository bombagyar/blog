// ------------------------ GENERAL ROUTINES ------------------------

//  CHECKNUMBER function
//  Checks the validity of a number.
//  Value:		the number itself.
//  Min:		minimum valid value, 0 if no limit
//  Max:		maximum valid value, 0 if no limit
//  Msgcode:	message to display if the number is invalid

function checknumber(value,min,max,errormsg) {
  if ((value<min && min>0) || (value>max && max>0) || value == '' || String(Number(value)) == 'NaN' || String(Number(value)) == 'undefined') {
     alert(errormsg);
     return false;
  }
  
  return true;
}

//  -------------------------------------------------------------------------

//  CHECKSTRING function
//  Checks the validity of a string.
//  Value: 		the string itself.
//  Minlength: 		the minimum length of the string.
//  Maxlength:		the maximum length of the string.
//  Emptystring:	message to display if the string is empty.
//  Tooshort:		message to display if the string is too short.
//  Toolong:		message to display if the string is too long.

function checkstring(value,minlength,maxlength,emptystring,tooshort,toolong) {

   if (value =='') {
	alert(emptystring);
	return false;
   }

   if (value.length < minlength) {
	alert(tooshort);
	return false;
   }

   if (value.length > maxlength && maxlength > 0) {
	alert(toolong);
	return false;
   }


   return true;
}

//  -------------------------------------------------------------------------

//  GETDATEMAX function
//  Returns the number of days in a given month.

function getdatemax(mnth) {

switch (mnth) {
	case 1:		return(31);
	case 2:		return(29);
	case 3:		return(31);
	case 4:		return(30);
	case 5:		return(31);
	case 6:		return(30);
	case 7:		return(31);
	case 8:		return(31);
	case 9:		return(30);
	case 10:	return(31);
	case 11:	return(30);
	case 12:	return(31);
}

return false;

}

//  -------------------------------------------------------------------------

//  GETPASSWORD function
//  Pops up a browser window asking for a password, and redirecting to the specified URL if it's valid.

function getpassword(phpURL) {
   window.open('password.html?phpurl='+phpURL,'password','status=no,scrollbars=no,noresize,width=210,height=100');
}

//  -------------------------------------------------------------------------


//  GETUSERPASSWORD function
//  Pops up a browser window asking for username and password, and redirecting to the specified URL if it's valid.

function getuserpassword(phpURL) {
   window.open('userpassword.php?url='+phpURL, 'userpassword', 'status=no,scrollbars=no,noresize,width=210,height=150');
}

//  -------------------------------------------------------------------------

//  CHECKRADIO function
//  Checks if any values have been selected of the radio group, and returns the value. If none was selected, it 
//  returns the specified error message.

function checkradio(radiogroup,errormsg) {

for (i=0, n=radiogroup.length; i<n; i++) {
   if (radiogroup[i].checked) {
      var checkvalue = radiogroup[i].value;
      break;
   }
}

if (checkvalue == undefined) { 
	alert(errormsg);
	return false;
}

return checkvalue;

}


//  -------------------------------------------------------------------------

//  GETPARAM function
//  Returns the value of a HTTP parameter

function getparam(param) {

s = '';
t = 0;

while (document.location.search.substring(t, t+param.length) != param && t<=document.location.search.length) {
    t++;
}

while (document.location.search.substring(t, t+1) != '=' && t<=document.location.search.length) {
    t++;
}

t++;

while (document.location.search.substring(t, t+1) != '&' && t<=document.location.search.length) {
    s = s + document.location.search.substring(t, t+1);
    t++;
}

return s;

}

//  -------------------------------------------------------------------------

//  FORMATMESSAGE function
//  Parses a string and formats it to HTML standards

function formatmessage(input) {

   msg = String(input);
   newmsg = '';
   s = '';

   for (t=0; t<=msg.length; t++) {

	added = false;

//  Remove HTML tags: replace tag markings with HTML entities

       	if (msg.substr(t, 1) == '<') {
		newmsg = newmsg+'&lsaquo;';
		added = true;
   	}

       	if (msg.substr(t, 1) == '>') {
		newmsg = newmsg+'&rsaquo;';
		added = true;
   	}


//  Convert links beginning with "http://" or "www."

       	if ((t<=msg.length - 7 & msg.substring(t, t+7) == 'http://') || (t<=msg.length - 4 & msg.substring(t, t+4) == 'www.')) {
          	a = t;
          	while(a < msg.length && msg.substr(a, 1) != ' ' && msg.substr(a,1) != '\n') { a++; }
		if (msg.substring(t, t+7) == 'http://') { s = '<A HREF="'+msg.substring(t, a)+'" TARGET="_new">'+msg.substring(t, a)+'</A>'; }
		if (msg.substring(t, t+4) == 'www.') { s = '<A HREF="http://'+msg.substring(t, a)+'" TARGET="_new">'+msg.substring(t, a)+'</A>'; }
		newmsg = newmsg+s;
		t = a-1;
		added = true;
   	}


//  Convert e-mail addresses to mailto links

       	if (msg.substr(t, 1) == '@' && t>2 && t<msg.length-1) {
          	a = t;
	        b = 0;

          	while(a>0 && msg.substr(a-1,1) != ' ' && msg.substr(a-1,1) != '\n') { a--; b++; }
		newmsg = newmsg.substr(0, newmsg.length - b);
		s = msg.substring(a, t);
          	a = t;

          	while(a < msg.length && msg.substr(a, 1) != ' ' && msg.substr(a,1) != '\n') { a++; }
		s = s + msg.substring(t, a);
		s = '<A HREF="mailto:'+s+'">'+s+'</A>';
		newmsg = newmsg+s;
		t = a-1;
		added = true;
   	}

//  Replace multiple spaces with &nbsp; entities

       	if (t<=msg.length - 1 && msg.substr(t, 2) == '  ') {
          	a = t;
		s = '';
          	while(a <= msg.length && msg.substr(a, 1) == ' ') { a++; s = s+'&nbsp;'; }
		newmsg = newmsg+s;
		t = a-1;
		added = true;
   	}


//  Replace page breaks with <BR> tags

       	if (msg.substr(t, 1) == '\n') {
		newmsg = newmsg + '<BR>\n';
		added = true;
   	}

   	if (added == false) { newmsg = newmsg + msg.substr(t, 1); }
   }

   return newmsg;

}


//  -------------------------------------------------------------------------
//  UNACCENT
//  Removes Hungarian accented characters from a string and replaces them with others

function unaccent(source) {
	output = '';
	for (a=0; a<source.length; a++) {
	added = false;
	if (source[a] == 'ő') { output += 'ô'; added = true; }
	if (source[a] == 'ű') { output += 'û'; added = true; }
	if (added == false) { output = output+(source[a]); }
	}

	return(output);
}

//  -------------------------------------------------------------------------
//  GETCOOKIE
//  Gets a cookie of a given name

function getcookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//  -------------------------------------------------------------------------
//  SETCOOKIE
//  Creates a cookie

function setcookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

//  -------------------------------------------------------------------------
//  DELETECOOKIE
//  Deletes a cookie

function deletecookie(name)
{
	setcookie(name,"",-1);
}

//  -------------------------------------------------------------------------
//  SAVEFORMTOCOOKIES
//  Saves a given form's fields and values to client-side cookies

function saveformtocookies(theform) {
	for (t=0; t<theform.length; t++) {
		setcookie(theform[t].name, unaccent(theform[t].value), 1);
	}
}

//  -------------------------------------------------------------------------
//  GETFORMFROMCOOKIES
//  Retrieves a given form's values from cookies, and deletes the cookies

function getformfromcookies(theform) {

	for (t=0; t<theform.length; t++) {
		theform[t].value = getcookie(theform[t].name);
	}
}

//  -------------------------------------------------------------------------
//  DELETEFORMCOOKIES
//  Deletes all cookies related to the given form

function deleteformcookies(theform) {

	for (t=0; t<theform.length; t++) {
		deletecookie(theform[t].name);
	}
}

//  -------------------------------------------------------------------------
//  FORMSAVED
//  Checks if a form was saved as cookies or not

function formsaved(theform) {

	foundform = true;
	for (t=0; t<theform.length; t++) {
		foundform = (getcookie(theform[t].name) != null);
	}
	return foundform;
}

//  -------------------------------------------------------------------------
//  OPENBIGWINDOW
//  Opens the specified picture in a big popup window

function openbigwindow(bigpic, width, height) {

   scrollbars = 'no';
   
   if (width > 800 || height > 800) {
      width += 20;
      height += 20;
      scrollbars = 'yes';
   }

   window.open('nagykep.html?filename='+bigpic, 'nagykep', 'status=no,scrollbars='+scrollbars+',noresize,width='+width+',height='+height);
}


//  -------------------------------------------------------------------------
//  STRIPSLASHES
//  Strips slashes

function stripslashes(str) {
  str=str.replace(/\\'/g,'\'');
  str=str.replace(/\\"/g,'"');
  str=str.replace(/\\\\/g,'\\');
  str=str.replace(/\\0/g,'\0');
return str;
}
