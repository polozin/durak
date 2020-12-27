/**
 * @author Constantine Polozin 2009
 * nufnaf code
 */
function setMessage( txt, fnc)
{
	if( document.getElementById("mess") )
	 return;
	var area = document.getElementById("playarea");
	var d = document.createElement("div");
	d.className="mess";
	d.id="mess";
	d.innerHTML=txt;
	d.style.top="410px";
	d.style.left="-200px";
	area.appendChild(d)
	addEvent(d, "click" , fnc);
	moveCardTo("mess", 410, 40);
}
function deleteMessage(messId)
{
	if(!messId)
	messId="mess";
	var area = document.getElementById("playarea");
	if (document.getElementById(messId)) {
		var d = document.getElementById(messId);
		area.removeChild(d);
	}
}
function debugMessage( txt)
{
	 document.getElementById("debug").innerHTML = txt;
}
function countMessage(t , l)
{
	var area = document.getElementById("playarea");
	
	var d = document.createElement("div");
	d.id="mcounter";
	d.style.top="250px";
	d.style.left="-55px";
	t= t - (t%10);
	t-=40;
	l=l-(l%10);
	l+=5;
	d.innerHTML=  coloda.length +  " cards";
	area.appendChild(d);
	moveCardTo("mcounter", t, l);
}
function welcomeMessage()
{

	var area = document.getElementById("playarea");
	var d = document.createElement("div"); 
	d.id="wellcome";
	d.style.top="-60px";
	d.style.left="240px";
	area.appendChild(d);
	var well = document.createElement("div");
	well.className="well-title";
	well.appendChild(document.createTextNode("Solitaire Game DURAK JavaScript Program")); 
	d.appendChild(well);
	var ld = document.createElement("div");
	ld.className="loading";
	ld.appendChild( document.createTextNode("Loading..."));
	var pic = document.createElement("img")
    pic.className="loader";
	pic.src="assets/ajax-loader.gif";
	ld.appendChild(pic);
	d.appendChild(ld);
	if( ifThisGoodBrowser() == false)
	{
		var recom = document.createElement("div");
		recom.className="recom";
		var t1 = document.createElement("span");
		t1.className="recom-t";
		t1.appendChild(document.createTextNode("recommended to use "));
		recom.appendChild(t1);
		var a1 = document.createElement("a");
		a1.href="http://www.mozilla.com/en-US/";
		a1.target="_blank";
		var p1 = document.createElement("img");
		p1.src="assets/feature-logo.png";
		p1.className="mozilla";
		a1.appendChild(p1);
		recom.appendChild(a1);
		var t2 = document.createElement("span");
		t2.className="recom-t";
		t2.appendChild(document.createTextNode(" or "));
		recom.appendChild(t2);
		var a2 = document.createElement("a");
		a2.href="http://www.google.com/chrome";
		a2.target="_blank";
		var p2 = document.createElement("img");
		p2.src="assets/logo_sm.jpg";
		p2.className="chrome";
		a2.appendChild(p2);
		recom.appendChild(a2);
		var t3 = document.createElement("span");
		t3.className="recom-t";
		t3.appendChild(document.createTextNode(" :) ..."));
		recom.appendChild(t3);
		
		d.appendChild(recom);
		
		
	}
	var author = document.createElement("div");
	author.className="center";
	author.appendChild( document.createTextNode("author - Constantine Polozin create in JavaScript  05/2009"));
	d.appendChild(author);
	moveCardTo("wellcome",200, 240);
}
function endGameMessage(hy)
{
	deleteMessage();
	var area = document.getElementById("playarea");
	var d = document.createElement("div"); 
	d.id="wellcome";
	d.style.top="-60px";
	d.style.left="240px";
	area.appendChild(d);
	var tit= document.createElement("div");
	tit.className="win-title";
	if(hy == "comp")
	{
		tit.className += " redik";
		tit.appendChild(document.createTextNode("Computer WON !!! " + compScore + " : " + humanScore));
	}
	else
	{
	    tit.appendChild(document.createTextNode("Congratulations you have WON !!! " + compScore + " : " + humanScore));
	}
	d.appendChild(tit);
	var sn = document.createElement("div");
	sn.className="ngame center";
	var btn = document.createElement("input");
	btn.value="start new game";
	btn.type="button";
	addEvent(btn , "click" , startNewGame);
	sn.appendChild(btn);
	d.appendChild(sn);
	var author = document.createElement("div");
	author.className="center";
	author.appendChild( document.createTextNode("author - Constantine Polozin create in JavaScript  05/2009"));
	d.appendChild(author);
	moveCardTo("wellcome",200, 240);
}

