
var numCards=16; // The number of all the cards is 16.
var cardList=generateCardList(); // This cardList is used to store all the instances of the card objects.
var activeCardList=new Array(); // This array is used to store active cards. Active cards are cards being compared with another card.
var c=0; // This c is used to store the time the player spent playing the game.
var processedCards=0; // This is used to store the number of processed cards, which cannot be reversed again.
function countTime()
/**
*	@description:This function counts the time the player used and make the number displayed in the "time" textbox.
*/
{
	document.getElementById("time").value=c;
	c=c+1;
	t=setTimeout("countTime()",1000);
}
function stopCountTime()
/**
*	@description:This function stops counting time.
*/
{
	clearTimeout(t);
}
function showAnswer()
/**
*	@description:This function displays the answers in the grid.
*/
{
	stopCountTime();
	cards=document.getElementById("panel").getElementsByClassName("card");
	for(var i=0; i<numCards; i++)
	{
		cardList[i].reverse();
		cardList[i].inactivate();
		cards[i].innerHTML=cardList[i].num;
		cards[i].setAttribute("style","background-color:cyan");
	}
}
function prepareRestart()
/**
*	@description:This function makes the button "restart" work.
*/
{
	button=document.getElementById("restart");
	button.onclick=restart;
}
function prepareShowAnswer()
/**
*	@description:This function makes the button "showAnswer" work.
*/
{
	button=document.getElementById("showAnswer");
	button.onclick=showAnswer;
}
function restart()
/**
*	@description:This function starts a new game and clean up the previous game data.
*/
{
	cardList=generateCardList();
	activeCardList=new Array();
	processedCards=0;
	cards=document.getElementById("panel").getElementsByClassName("card");
	for(var i=0; i<numCards; i++)
	{
		cards[i].innerHTML="";
		cards[i].setAttribute("style","background-color:black");
	}
	document.getElementById("moves").innerHTML=0;
	document.getElementById("stars").innerHTML="★★★";
	prepareCards();
	c=0;
	countTime();
}
function reverseCard(ecard) //ecard is an element card, which is an element in the html file.
/**
*	@description:This function reverse an element card, makeing the card front facing up.
*/
{
	card=cardList[ecard.id];
	if(!card.isReversed)
	{
		card.activate();
		card.reverse();
		activeCardList.push(card);
		ecard.innerHTML=card.num;
		ecard.setAttribute("style","background-color:cyan");	
	}
}
function prepareCards()
/**
*	@description:This function add functions to the element cards.
*/
{
	cards=document.getElementById("panel").getElementsByClassName("card");
	for(var i=0; i<numCards; i++)
	{
		cards[i].onclick=function()
		{
			reverseCard(this);
		}
		cards[i].onmouseout=function()
		{
			if(activeCardList.length===2)
			{
				card1=activeCardList.pop();
				card2=activeCardList.pop();//Now activeCardList is empty.
				if(card1.num===card2.num)
				{
					processedCards+=2;
				}
				//When two active cards have different numbers on them, they are reversed(back facing up).
				if(card1.num!=card2.num)
				{
					card1.reverse();
					ecard1=document.getElementById(card1.id);
					ecard1.innerHTML="";
					ecard1.setAttribute("style","background-color:black");
					card2.reverse();
					ecard2=document.getElementById(card2.id);
					ecard2.innerHTML="";
					ecard2.setAttribute("style","background-color:black");
				}
				card1.inactivate();
				card2.inactivate();
				document.getElementById("moves").innerHTML=Number(document.getElementById("moves").innerHTML)+1;//This shows the number of moves.
				moves=Number(document.getElementById("moves").innerHTML);
				var star=3; //This is the number of stars.
				if(moves>=10&&moves<14)
				{
					document.getElementById("stars").innerHTML="★★☆";
					star=2;
				}
				if(moves>=14)
				{
					star=1;
					document.getElementById("stars").innerHTML="★☆☆";
				}
				if (processedCards===16)
				{
					stopCountTime();
					var wantNewGame=confirm("Congratulations! You won the game with "+moves+" moves and "+star+" stars! You spent "+c+" seconds! Do you want a new game?");
					if(wantNewGame==true)
					{
						restart();
					}
				}
			}
		};
	}
}

function shuffle(array) {
/**
*	@description:This function shuffles an array and genereate an random number list.
*	@param {array} array The array to be shuffled.
*   @returns array
*/
	var m = array.length, t, i;
  	// While there remain elements to shuffle…
  	while (m) 
  	{
    	// Pick a remaining element…
    	i = Math.floor(Math.random() * m--);
    	// And swap it with the current element.
    	t = array[m];
    	array[m] = array[i];
    	array[i] = t;
  	}

  return array;
}

function generateNumbers()
/**
*	@description:This function generate a random number list. from 1 to 8, each number will appear twice in the list.
*   @returns numList 
*/
{
	var numList=new Array(numCards);
	for(var i=0; i<numCards;i++)
	{
		numList[i]=i+1;
	}
	numList=shuffle(numList);
	for(var i=0;i<numCards;i++)
	{
		if(numList[i]>numCards/2)
		{
			numList[i]-=numCards/2;
		}
	}
	return numList;
}

function addLoadEvent(func)
/**
*	@description:This function add events to the browser.
*	@param{function} func 
*		The function needed to be added.
*/
	{
		var oldonload=window.onload;
		if(typeof window.onload!='function')
		{
			window.onload=func;
		}
		else{
			window.onload=function(){
				oldonload();
				func();
			}
		}
	}


function Card(num,id)
/**
*	@description:represent a card.
*	@constructor
*	@param {number} num The number on the card.
*	@param {number} id The id of the card.
*/
{
	this.num=num;
	this.isReversed=false;
	this.isActive=false;
	this.id=id;
    if (typeof this.reverse!="function")
    {
    	Card.prototype.reverse=function()
    	{
    		if(!(this.isActive==false&&this.isReversed==true))
    		this.isReversed=!this.isReversed;
    	};
    }
    if (typeof this.activate!="function")
    {
    	Card.prototype.activate=function()
    	{
    		if(!(this.isActive==false&&this.isReversed==true))
    		this.isActive=true;
    	};
    }
    if (typeof this.inactivate!="function")
    {
    	Card.prototype.inactivate=function()
    	{
    		if(!(this.isActive==false&&this.isReversed==true))
    		this.isActive=false;
    	};
    }
}

function generateCardList()
/**
*	@description: This fuction generates a card list.
*	@returns cardList
*/
{
	var numList = generateNumbers();
	var cardList = new Array(numCards);
	for(var i=0; i<numCards; i++)
	{
		card = new Card(numList[i],i);
		cardList[i]=card;
	}
	return cardList;
}

function init()
/**
*	@description: This function takes in four functions.
*/
{
	prepareCards();
	countTime();
	prepareRestart();
	prepareShowAnswer();
}

addLoadEvent(init);