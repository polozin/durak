/**
 * @author Constantine Polozin 2009
 * nufnaf code*
 */
var coloda;
var srcBack= "assets/cards/back.png";
var path = "assets/cards/";
var comp;
var human;
var desk;
var garb;
var stepVertikal =110;
var compTop = 40;
var compLeft = 800;
var humanTop = 450;
var humanLeft=800;
var dominant="";
var deskTop=250;
var deskLeft=800;
function initColoda()
{
	comp = new Array();
	human= new Array();
	desk = new Array();
	garb = new Array();
	coloda= new Array();
	var tArr =[{src: "6d.png", pow:0, mas:"d"}
	                ,{src: "7d.png", pow:1, mas:"d"}
	                ,{src: "8d.png", pow:2, mas:"d"}
					,{src: "9d.png", pow:3, mas:"d"}
					,{src: "10d.png", pow:4, mas:"d"}
					,{src: "11d.png", pow:5, mas:"d"}
					,{src: "12d.png", pow:6, mas:"d"}
					,{src: "13d.png", pow:7, mas:"d"}
					,{src: "1d.png", pow:8, mas:"d"}
					,{src: "6c.png", pow:0, mas:"c"}
	                ,{src: "7c.png", pow:1, mas:"c"}
	                ,{src: "8c.png", pow:2, mas:"c"}
					,{src: "9c.png", pow:3, mas:"c"}
					,{src: "10c.png", pow:4, mas:"c"}
					,{src: "11c.png", pow:5, mas:"c"}
					,{src: "12c.png", pow:6, mas:"c"}
					,{src: "13c.png", pow:7, mas:"c"}
					,{src: "1c.png", pow:8, mas:"c"}
					,{src: "6h.png", pow:0, mas:"h"}
	                ,{src: "7h.png", pow:1, mas:"h"}
	                ,{src: "8h.png", pow:2, mas:"h"}
					,{src: "9h.png", pow:3, mas:"h"}
					,{src: "10h.png", pow:4, mas:"h"}
					,{src: "11h.png", pow:5, mas:"h"}
					,{src: "12h.png", pow:6, mas:"h"}
					,{src: "13h.png", pow:7, mas:"h"}
					,{src: "1h.png", pow:8, mas:"h"}
					,{src: "6s.png", pow:0, mas:"s"}
	                ,{src: "7s.png", pow:1, mas:"s"}
	                ,{src: "8s.png", pow:2, mas:"s"}
					,{src: "9s.png", pow:3, mas:"s"}
					,{src: "10s.png", pow:4, mas:"s"}
					,{src: "11s.png", pow:5, mas:"s"}
					,{src: "12s.png", pow:6, mas:"s"}
					,{src: "13s.png", pow:7, mas:"s"}
					,{src: "1s.png", pow:8, mas:"s"}];
					
					while (tArr.length > 0 )
					{
						var iRand = Math.random();
						iRand*=100;
						iRand = parseInt(iRand);
						if( iRand > tArr.length-1)
						{
							iRand %=tArr.length;
						}
						var o = tArr.splice(iRand,1);
						var img = document.createElement("img");
						img.src= srcBack;
						//img.src= path + o[0].src;
						img.className="card";
						img.style.top="250px";
						img.style.left="-100px";
						img.style.zIndex=3;
						img.id="card" + coloda.length;
						img.setAttribute("nsrc", o[0].src);
						img.setAttribute("pow",o[0].pow);
						img.setAttribute("mas",o[0].mas);
						coloda.push(img);
					}
					for( var i=0; i < 6 ; i++)
					{
						desk.push( new Array(null,null));
					}
}
function ifThisGoodBrowser()
{
	var browser = window.navigator.appName.toUpperCase();
	if(browser.indexOf("MICROSOFT") != -1 )
	{
		return false;
	}
	return true;
}
