/**
 * @author Constantine Polozin 2009
 * nufnaf code
 */
var compscore = "cmpsr";
var humanscore = "hmnsr";
var lastvinner = "lvin";
var score = "score=";
function saveHistory( c , h , vinner)
{
	var str = compscore + "=" + c +"," + humanscore + "=" + h +"," + lastvinner + "=" + vinner 
	str = encodeURIComponent(str);
	document.cookie = score + str + "; max-age=" + (60*60*24*365);
}
function loadHistory()
{
  
	var doc = document.cookie;
	doc = doc.substr(doc.indexOf(score) + score.length);
	if(doc)
	{
	
	doc = decodeURIComponent(doc);
	var c = doc.substr(compscore.length+1);
	c=c.substr( 0, c.indexOf(","));
	if(parseInt(c) * 0 != 0 )
	{
		eraseCookie("score");
		return null;
	}
	var h = doc.substr( doc.indexOf(humanscore) + humanscore.length+1);
	h= h.substr(0, h.indexOf(",") );
	if(parseInt(h) * 0 != 0 )
	{
		eraseCookie("score");
		return null;
	}
	var last = doc.substr( doc.indexOf(lastvinner) + lastvinner.length+1);
	last=last.substr(0,1);
	return { cm: c, hm: h, las: last }; 
	}
	return null;
}
function eraseCookie (key) {


   
   var cookieDate = new Date(2000,11,10,19,30,30);
    if( ! key)
	{
		document.cookie= "; expires="+cookieDate.toGMTString(  )+"; path=/";
	}
	else
	{
   document.cookie=key + "= ; expires="+cookieDate.toGMTString(  )+"; path=/";
   }
}

