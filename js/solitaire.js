/**
 * @author Constantine Polozin 2009
 */
var arr;
var arrFly;
var indexArr=0;
var posIndex =0;
var hod=0;
var mhistory;
var humanScore=0 ;
var compScore=0;
function loadArr()
{

    arrFly= new Array();
	
	
	initColoda();
	var area = document.getElementById("playarea");
	for(var i=0; i< 6; i++)
	{
		var d = document.createElement("div");
		d.className="base";
		d.style.top="250px";
		d.style.left= deskLeft - (stepVertikal * i) + "px";
		area.appendChild(d);
	}
   for( var i=0; i< coloda.length; i++)
   {
   	area.appendChild(coloda[i]);
   }
    welcomeMessage();
	var loadTime = 2000;
	if( ifThisGoodBrowser() == false)
	{
		loadTime = 4000;
	}
	setTimeout("startMovie()" , loadTime);
   var cc= document.createElement("div");
   cc.id="card-count";
   addEvent(cc, "mouseover", showCount);
   addEvent(cc, "mouseout", hideCount);
   area.appendChild(cc);
}
function showCount(e)
{
	if( coloda.length == 0)
	{
		return;
	}
	 e = e|| window.event;
	 countMessage(e.clientY,e.clientX);
}
function hideCount()
{
	deleteMessage("mcounter");
}
function startNewGame()
{
	var area = document.getElementById("playarea");
	area.innerHTML="";
	indexArr=0;
	loadArr();
}
function startMovie()
{
	

	mCard(indexArr++);
	if (indexArr <  coloda.length)
	{
		setTimeout("startMovie()", 60);
	}
	else
	{
		deleteMessage("wellcome");
		setTimeout( "setStartCards()" , 80 );
	}
}
function mCard( ind)
{
	if (document.getElementById("card" + ind)) {
		var p = document.getElementById("card" + ind);
		var x = parseInt(p.style.left) + 20;
		
		if (x < 50) {
			p.style.left = x + "px";
			setTimeout("mCard(" + ind + ")", 10);
		}
	}
}
function setStartCards()
{
	var tPos =0, lPos=0;
	arr = new Array();

	for( var i=0; i< 12; i++)
	{
		var obj = coloda.splice(coloda.length-1,1);
		if( i %2 == 0 )//comp
		{
			tPos= compTop;
			lPos = compLeft - ( comp.length * stepVertikal);
			comp.push(obj[0]);
		}
		else//human
		{
			tPos = humanTop;
			lPos = humanLeft- (human.length* stepVertikal);
			human.push(obj[0]);
		}
	   arr.push( "moveCardTo('" + obj[0].id +"'," + tPos + "," + lPos +")");	
	}
	mhistory= loadHistory();
	if(mhistory == null)
	{
		debugMessage("new game");
	}
	sendCards();
	setTimeout("setDominant('" + coloda[0].id + "')" , 2000);
}
function sendCards()
{
	if( arr.length > 0)
	{
		var strId = arr[0];
		strId = strId.substr( strId.indexOf("card") , strId.indexOf(","));
		strId= strId.substr(0, strId.indexOf("'"));
		if (ifCardFly(strId)) {
			setTimeout("sendCards()" ,200);
		}
		else {
			arrFly.push(strId);
			setTimeout(arr.shift() + ";sendCards()", 200);
		}
	}
}

function setDominant( id )
{
	var img = document.getElementById(id);
	img.src =  path + img.getAttribute("nsrc");
	var t = parseInt(img.style.top)  -20;
	var l = parseInt(img.style.left)- 20;
	img.style.top = t+ "px";
	img.style.left = l + "px";
	dominant= img.getAttribute("mas");
	img.style.zIndex-=1;
	posIndex= checkFirstHod();
	if( isNaN( posIndex) )
	{
		posIndex=0;
		alert("Read stories interrupted \n to correct this should be wipe cookies");
	}
	
	if( posIndex == 1 ) // first comp
	{
		compSendToDesk();
	}
	for( var j=0 ; j < human.length; j++)
	{
		human[j].src = path + human[j].getAttribute("nsrc");
		var o = human[j];
		addEvent(o, "click", sendCardToDesk);
	}
}
function checkFirstHod()
{
	if ( mhistory == null)
	{
		//humanScore=0;
		//compScore=0;
		var cDom=-1;
		var hDom=-1;
		var temp =10;
		for(  var i =0; i < comp.length; i++)
		{
			if(comp[i].getAttribute("mas") == dominant)
			{
				if( temp >  parseInt(comp[i].getAttribute("pow")))
				{
					temp=parseInt(comp[i].getAttribute("pow"));
				}
				cDom ++;
			}
		}
		if(cDom > -1)
		{
			cDom=temp;
			temp=10;
		}
	 for( var i=0; i < human.length; i++)
	 {
	if(human[i].getAttribute("mas") == dominant)
			{
				if( temp >  parseInt(human[i].getAttribute("pow")))
				{
					temp=parseInt(human[i].getAttribute("pow"));
				}
				hDom ++;
			}
	 }
	 if( hDom > -1)
	 {
	 	hDom= temp;
	 }
	 return (hDom < cDom ? 0 :1);
	}
        if(parseInt( mhistory.cm))
	compScore = parseInt( mhistory.cm);
        if(parseInt(mhistory.hm))
	humanScore= parseInt(mhistory.hm);
	debugMessage("DURAK SCORE     Computer - " + compScore + " : " + humanScore + " - User" );
	return parseInt(mhistory.las);
}
function sendCardToDesk(e)
{
	
	 e = e|| window.event;
	 var tg = (window.event ? e.srcElement: e.target);
	 if( comp.length == 0 )
	 {
	 	return;
	 }
	 var indTo = -1;
 if (posIndex == 0) {
 	for (var i = 0; i < desk.length; i++) {
 		if (desk[i][posIndex] == null) {
 			indTo = i
 			break;
 		}
 	}
 	if (indTo == -1) 
 		return;
 	
 }
 else
 {
 	for (var i = 0; i < desk.length; i++) {
		if (desk[i][1] == null && desk[i][0] != null) {
			indTo = i
			break;
		}
	}
	if (indTo == -1) 
 		return;
 } 
 if (humanCheckDesk(tg) == false) 
 		return;
 	var indFrom = -1;
 	for (var i = 0; i < human.length; i++) {
 		if (human[i] == tg) {
 			indFrom = i;
 			break;
 		}
 	}
	 var o = human.splice(indFrom,1);
	 desk[indTo][posIndex] = o[0];
	 o[0].style.zIndex=2 + posIndex;
	 var tPos = (posIndex ==0 ? deskTop+10: deskTop-10);
	 var lPos = deskLeft - (indTo * stepVertikal) + (posIndex == 0? 10 : -10);
	 arr.unshift("moveCardTo('" + tg.id +"'," +  tPos +"," + lPos+ ")");
	 sendCards();
	 deleteEvent(tg,"click",sendCardToDesk );
	 hod=1;
	 if (posIndex == 0) {
	 	 	if (coloda.length == 0 && human.length == 0) {
				  humanScore+=1;
			endGameMessage("human");
			saveHistory(compScore, humanScore, 0);

			}
			else {
				compAnswer();
			}
	 }
	 else
	 {
	 	if (coloda.length == 0 && human.length == 0) {
			humanScore+=1;
			endGameMessage("human");
			saveHistory(compScore, humanScore, 0);
		}
		else {
			compSendToDesk();
		}
	 }
}
function moveCardTo( id , tPos, lPos)
{
	var img = document.getElementById(id);
	var l = parseInt(img.style.left);
	var t = parseInt(img.style.top);

	var flag =0;
	if( t != tPos)
	{
		flag =1;
		 if( t > tPos )
		 {
		 	t-=5;
		 }
		 else
		 {
		 	t+=5;
		 }
		 img.style.top = t + "px";
		 
	}
	if( l != lPos)
	{
		flag=1;
		if( l > lPos)
		{
			l-=10;
		}
		else
		{
			l+=10;
		}
		img.style.left = l + "px";
	}
	if( flag == 1)
	{
		setTimeout("moveCardTo('" + id  + "'," + tPos + "," + lPos +")" , 5 ); 
	}
	else
	{
		relaceCardId(id);
	}
}

function addEvent(obj, evType, fn){
    if (obj.addEventListener) 
        obj.addEventListener(evType, fn, true)
    if (obj.attachEvent) 
        obj.attachEvent("on" + evType, fn)
}
function deleteEvent(obj, evType, fn)
{
	if( obj.removeEventListener)
		obj.removeEventListener(evType, fn, true);
	if(obj.detachEvent)	
		obj.detachEvent("on" + evType, fn);	
}
function ifCardFly( cardId )
{
	for(var i=0; i< arrFly.length; i++)
	{
		if( arrFly[i] == cardId )
		return true;
	}
	return false;
}
function relaceCardId( cardId)
{
	for(var i=0; i < arrFly.length; i++)
	{
		if( arrFly[i] == cardId )
		{
			arrFly.splice(i,1);
			return;
		}
	}
}
