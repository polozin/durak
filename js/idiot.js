/**
 * @author Constantine Polozin 2009
 * nufnaf code
 */
function humanCheckDesk(obj){
    var pow = obj.getAttribute("pow");
    var mas = obj.getAttribute("mas");
    var flag = true;
    if (posIndex == 0) {
        for (var i = 0; i < desk.length; i++) {
            for (var j = 0; j < 2; j++) {
                if (desk[i][j]) {
                    flag = false;
                    if (desk[i][j].getAttribute("pow") == pow) 
                        return true;
                }
            }
        }
    }
    else {
		flag = false;
        var indPos = -1;
        for (var i = 0; i < desk.length; i++) {
            if (desk[i][0] != null && desk[i][1] == null) {
                indPos = i;
                break;
            }
        }
        if (indPos == -1) 
            return false;
        
        if (desk[indPos][0].getAttribute("mas") == mas && pow > parseInt(desk[indPos][0].getAttribute("pow"))) 
            return true;
        if (mas == dominant && desk[indPos][0].getAttribute("mas") != dominant) 
            return true;
    }
    return flag;
}

function compCheckDesk(obj){
    var pow = obj.getAttribute("pow");
    var flag = true;
    
    for (var i = 0; i < desk.length; i++) {
        for (var j = 0; j < 2; j++) {
            if (desk[i][j]) {
                flag = false;
                if (desk[i][j].getAttribute("pow") == pow) 
                    return true;
            }
        }
    }
    return flag;
}

function compAnswer(){

    var indPos = -1;
    
    deleteMessage();
    if (posIndex == 0) {
    
        for (var i = 0; i < desk.length; i++) {
            if (desk[i][0] != null && desk[i][1] == null) {
                indPos = i;
                break;
            }
        }
        if (indPos == -1) 
            return;
        var pow = parseInt(desk[indPos][0].getAttribute("pow"));
        var mas = desk[indPos][0].getAttribute("mas");
        var indFrom = -1;
        var temp = 10;
        for (var i = 0; i < comp.length; i++) {
            if (comp[i].getAttribute("mas") == mas && parseInt(comp[i].getAttribute("pow")) > pow) {
                if (temp > parseInt(comp[i].getAttribute("pow"))) {
                    temp = parseInt(comp[i].getAttribute("pow"));
                    indFrom = i;
                }
            }
        }
        if (indFrom == -1 && mas != dominant) {
            temp = 10;
            
            for (var i = 0; i < comp.length; i++) {
                if (comp[i].getAttribute("mas") == dominant) {
                    if (temp > parseInt(comp[i].getAttribute("pow"))) {
                        temp = parseInt(comp[i].getAttribute("pow"));
                        indFrom = i;
                    }
                }
            }
        }
        if (indFrom == -1) {
        
            hod = 0;
            setMessage("<span class=\"red\" >Computer cards will</span>", compTikeCards);
            return;
        }
        
        var obj = comp.splice(indFrom, 1);
        desk[indPos][1] = obj[0];
        hod = 0;
        
        setMessage("click if all", endHode);
   
    
    var tPos = (posIndex == 0 ? deskTop - 10 : deskTop + 10);
    var lPos = deskLeft - (indPos * stepVertikal) + (posIndex == 0 ? -10 : 10);
    obj[0].style.zIndex = 2 + (posIndex == 0 ? 1 : 0);
   obj[0].src = path + obj[0].getAttribute("nsrc");
     arr.push("moveCardTo('" + obj[0].id + "'," + tPos + "," + lPos + ")");
	 sendCards();
	 if( coloda.length ==0 && comp.length == 0)
	 {
	 	compScore+=1;
	 	endGameMessage("comp");
			saveHistory(compScore, humanScore, 1);

	 }
     }
}

function compTikeCards(){
    for (var i = 0; i < desk.length; i++) {
        for (var j = 0; j < 2; j++) {
            if (desk[i][j]) {
                var t = desk[i][j];
                comp.push(t);
				t.src= srcBack;
                desk[i][j] = null;
            }
        }
    }
    resetArrayHuman();
    resetArrayComp();
    hod = 0;
   sendCards();
    deleteMessage();
}

function endHode(){
    cardsToGarb();
   resetArrays_HC();
    deleteMessage();
    compSendToDesk();
   sendCards();
}

function compSendToDesk(){
    var countDom= sortCompArray();
    posIndex = 1;
    var flag = false;
    for (var i = comp.length - 1; i >= 0; i--) {
        if (compCheckDesk(comp[i]) == true) {
        
            var indPos = checkDesk();
            if (indPos != -1) {
               if( comp[i].getAttribute("mas") == dominant && countDom < 3 && comp.length > 3 )
			   {
			   	break;
			   }
			   flag = true;
                var o = comp.splice(i, 1);
                desk[indPos][0] = o[0];
                var tPos = deskTop + 10
                var lPos = deskLeft - (indPos * stepVertikal) + 10;
                o[0].style.zIndex = 2;
                o[0].src = path + o[0].getAttribute("nsrc");
                var str = "moveCardTo('" + o[0].id + "'," + tPos + "," + lPos + ")";
                arr.push(str);
				sendCards();
                if (document.getElementById("mess")) 
                    deleteMessage();
                setMessage("click if you cards will", userTikeCards)
                break;
            }
        }
    }
		 if( coloda.length ==0 && comp.length == 0)
	 {
	 	compScore+=1;
	 	endGameMessage("comp");
			
			saveHistory(compScore, humanScore, 1);
	 }

    if (flag == false) {
        posIndex = 0;
        hod = 0;
        setHumanNext();
    }
    
}

function setHumanNext(){
    cardsToGarb();
    resetArrays_CH();
    deleteMessage();
   sendCards();
}

function userTikeCards(){
	for( var i=0; i< comp.length; i++)
	{
		if( compCheckDesk(comp[i]) == true && comp[i].getAttribute("mas") != dominant)
		{
			var obj= comp.splice(i,1);
			obj[0].src= path + obj[0].getAttribute("nsrc");
			addEvent(obj[0], "click", sendCardToDesk);
			human.push(obj[0]);
		}
	}
    for (var i = 0; i < desk.length; i++) {
        for (var j = 0; j < 2; j++) {
            if (desk[i][j]) {
                var obj = desk[i][j];
				addEvent(obj, "click" , sendCardToDesk);
                human.push(obj);
                desk[i][j] = null;
            }
        }
    }

   resetArrays_HC();
    hod = 0;
    deleteMessage();
    compSendToDesk();
    sendCards();
}

function checkDesk(){
    var indPos = -1
    for (var i = 0; i < desk.length; i++) {
        if (desk[i][0] == null && desk[i][1] == null) {
            indPos = i;
            break;
        }
    }
    return indPos;
}
function resetArrays_CH()
{
	resetArrayComp();
	resetArrayHuman();
}
function resetArrays_HC()
{
	resetArrayHuman();
	resetArrayComp();
}
function resetArrayComp(){
    //comp
    while (comp.length < 6 && coloda.length > 0) {
        var obj = coloda.pop();
        comp.push(obj);
    }
    var toTop = compTop;
    var toLeft = compLeft;
    var step = (comp.length < 7 ? stepVertikal : 50);
    for (var i = 0; i < comp.length; i++) {
        toLeft = compLeft - (i * step);
        comp[i].style.zIndex = comp.length - i;
		if (parseInt(comp[i].style.top) != toTop || parseInt(comp[i].style.left) != toLeft) {
			var str = "moveCardTo('" + comp[i].id + "'," + toTop + "," + toLeft + ")";
			arr.push(str);
		}
        
    }
    
    
}

function resetArrayHuman(){
    //human
    while (human.length < 6 && coloda.length > 0) {
        var temp = coloda.pop();
		temp.src= path + temp.getAttribute("nsrc");
        addEvent(temp, "click", sendCardToDesk);
        human.push(temp);
    }
  sortHumanArray();
    var toTop = humanTop;
    var step = (human.length < 7 ? stepVertikal : 50);
    for (var i = 0; i < human.length; i++) {
        var toLeft = humanLeft - (i * step);
        human[i].style.zIndex = human.length - i;
		if (parseInt(human[i].style.top) != toTop || parseInt(human[i].style.left) != toLeft) {
			var str = "moveCardTo('" + human[i].id + "'," + toTop + "," + toLeft + ")";
			arr.push(str);
		}
    }
}

function sortHumanArray(){
    human.sort(sortByPow);
    var countDominants = 0;
    for (var i = human.length - 1; i >= countDominants; i--) {
        if (human[i].getAttribute("mas") == dominant) {
            var o = human.splice(i, 1);
            human.unshift(o[0]);
            countDominants++;
            i++;
        }
    }
    
    function sortByPow(a, b){
        return parseInt(b.getAttribute("pow")) - parseInt(a.getAttribute("pow"));
    }
    return countDominants;
}

function sortCompArray(){
    comp.sort(sortByPow);
    var countDominants = 0;
    for (var i = comp.length - 1; i >= countDominants; i--) {
        if (comp[i].getAttribute("mas") == dominant) {
            var o = comp.splice(i, 1);
            comp.unshift(o[0]);
            countDominants++;
            i++;
        }
    }
    
    function sortByPow(a, b){
        return parseInt(b.getAttribute("pow")) - parseInt(a.getAttribute("pow"));
    }
    return countDominants;
}

function cardsToGarb(){
    var toTop = 200;
    var toLeft = 950;
    for (var i = 0; i < desk.length; i++) {
        for (var j = 0; j < 2; j++) {
            if (desk[i][j]) {
                var t = desk[i][j]
                garb.push(t);
                t.src = srcBack;
                var str = "moveCardTo('" + garb[garb.length - 1].id + "'," + toTop + "," + toLeft + ")";
                arr.push(str);
                desk[i][j] = null;
            }
        }
    }
	
}
